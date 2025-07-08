import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/material'
import URLShortener from './components/URLShortener'
import Statistics from './components/Statistics'
import Redirect from './components/Redirect'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: '#ffffff' }}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/shortener" replace />} />
            <Route path="/shortener" element={<URLShortener />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/:shortcode" element={<Redirect />} />
          </Routes>
        </Router>
      </Box>
    </>
  )
}

export default App