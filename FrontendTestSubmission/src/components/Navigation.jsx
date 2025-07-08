import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', boxShadow: '0 4px 20px rgba(59,130,246,0.15)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>URL Shortener</Typography>
        <Button color="inherit" component={Link} to="/shortener">Shortener</Button>
        <Button color="inherit" component={Link} to="/statistics">Statistics</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation