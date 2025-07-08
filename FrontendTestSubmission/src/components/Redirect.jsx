import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Paper, Typography, Button } from '@mui/material'
import { getUrl, addClick } from '../utils/urlManager'

function Redirect() {
  const { shortcode } = useParams()
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const originalUrl = getUrl(shortcode)
    if (originalUrl) {
      addClick(shortcode)
      setUrl(originalUrl)
      setTimeout(() => window.location.href = originalUrl, 2000)
    }
    setLoading(false)
  }, [shortcode])

  return (
    <Container maxWidth="sm" sx={{ mt: 8, pb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, boxShadow: '0 10px 40px rgba(59,130,246,0.15)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0' }}>
        {loading ? (
          <Typography variant="h5" sx={{ color: '#64748b' }}>Loading...</Typography>
        ) : url ? (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: '#059669', fontWeight: '700' }}>Redirecting...</Typography>
            <Typography>You will be redirected to:</Typography>
            <Typography variant="body2" sx={{ my: 2, wordBreak: 'break-all' }}>{url}</Typography>
            <Button variant="contained" href={url}>Go Now</Button>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: '#dc2626', fontWeight: '700' }}>Link Not Found</Typography>
            <Typography sx={{ mb: 3 }}>The link doesn't exist or has expired.</Typography>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Button variant="contained" component={Link} to="/shortener">Create New</Button>
              <Button variant="outlined" component={Link} to="/statistics">Statistics</Button>
            </div>
          </>
        )}
      </Paper>
    </Container>
  )
}

export default Redirect