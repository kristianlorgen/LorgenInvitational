export const metadata = {
  title: "Lorgen Invitational"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{fontFamily:"Arial, sans-serif", margin:0}}>
        <nav style={{
          padding:"15px",
          borderBottom:"1px solid #ddd",
          display:"flex",
          gap:"15px"
        }}>
          <a href="/">Forside</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/scorecard">Scorekort</a>
          <a href="/admin">Admin</a>
        </nav>
        <div style={{padding:"20px"}}>
          {children}
        </div>
      </body>
    </html>
  )
}
