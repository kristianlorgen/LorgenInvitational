'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Leaderboard() {
  const [teams,setTeams] = useState([])

  const load = async () => {
    const { data } = await supabase
      .from('teams')
      .select(`
        id,
        name,
        team_players(players(name,hcp)),
        hole_scores(strokes)
      `)

    if(!data) return

    const ranked = data.map(team=>{
      if(team.team_players.length < 2) return null

      const h1 = team.team_players[0].players.hcp
      const h2 = team.team_players[1].players.hcp

      const low = Math.min(h1,h2)
      const high = Math.max(h1,h2)

      const teamHcp = (low*0.35)+(high*0.15)

      const gross = team.hole_scores.reduce((sum,h)=>sum+h.strokes,0)
      const net = gross - teamHcp

      return {name:team.name,gross,net}
    }).filter(Boolean)

    ranked.sort((a,b)=>a.net-b.net)

    setTeams(ranked)
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div>
      <h1>Live Leaderboard</h1>
      {teams.map((t,i)=>(
        <div key={i} style={{padding:"10px",borderBottom:"1px solid #eee"}}>
          #{i+1} {t.name} | Net {t.net?.toFixed(1)} | Gross {t.gross}
        </div>
      ))}
    </div>
  )
}
