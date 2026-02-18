export const metadata = {
  title: "Lorgen Invitational"
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{fontFamily:"sans-serif"}}>
        <nav style={{padding:"10px",borderBottom:"1px solid #ccc"}}>
          <a href="/">Forside</a> | 
          <a href="/leaderboard">Leaderboard</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
