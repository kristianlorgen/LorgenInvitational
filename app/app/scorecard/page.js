'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Scorecard(){
  const [teamId,setTeamId] = useState('')
  const [scores,setScores] = useState(Array(18).fill(''))

  const save = async ()=>{
    for(let i=0;i<18;i++){
      if(scores[i]){
        await supabase.from('hole_scores').insert([
          { team_id:teamId, hole:i+1, strokes:Number(scores[i]) }
        ])
      }
    }
    alert("Lagret")
  }

  return(
    <div>
      <h1>Hull 1–18</h1>

      <input
        placeholder="Team ID"
        onChange={e=>setTeamId(e.target.value)}
      />

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"8px",
        marginTop:"10px"
      }}>
        {scores.map((_,i)=>(
          <input
            key={i}
            placeholder={`Hull ${i+1}`}
            onChange={e=>{
              const copy=[...scores]
              copy[i]=e.target.value
              setScores(copy)
            }}
          />
        ))}
      </div>

      <button onClick={save} style={{marginTop:"15px"}}>
        Lagre scorekort
      </button>
    </div>
  )
}
