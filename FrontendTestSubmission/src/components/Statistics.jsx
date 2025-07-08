import { useState, useEffect } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { getAll } from '../utils/urlManager'
import { FrontendLogger } from '../utils/logger'

function Statistics() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    FrontendLogger.component.info('Statistics component mounted')
    const load = () => setUrls(getAll())
    load()
    const interval = setInterval(load, 1000)
    return () => clearInterval(interval)
  }, [])

  const fmt = (d) => new Date(d).toLocaleString()

  if (!urls.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, boxShadow: '0 10px 40px rgba(59,130,246,0.15)',background: 'linear-gradient(to right, #add8e6, #bfefff)', border: '1px solid #e2e8f0' }}>
          <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: '700' }}>URL Statistics</Typography>
          <Typography>No URLs found. Create some first!</Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 40px rgba(59,130,246,0.15)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1e293b', fontWeight: '700', mb: 3 }}>URL Statistics</Typography>
        <Typography sx={{ mb: 3 }}>Total URLs: {urls.length}</Typography>

        {urls.map(u => (
          <div key={u.shortcode} style={{ marginBottom: 20, padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Typography variant="h6" color="primary" onClick={() => {
                navigator.clipboard.writeText(u.shortUrl)
                FrontendLogger.component.info('URL copied to clipboard')
              }} style={{ cursor: 'pointer' }}>
                {u.shortUrl}
              </Typography>
              {u.expired && <span style={{ color: 'red', fontSize: 12 }}>EXPIRED</span>}
            </div>
            
            <Typography variant="body2" color="text.secondary">Original: {u.url}</Typography>
            
            <div style={{ display: 'flex', gap: 16, margin: '8px 0', fontSize: 12 }}>
              <span>Created: {fmt(u.created)}</span>
              <span>Expires: {fmt(u.expires)}</span>
              <span>Clicks: {u.clicks.length}</span>
            </div>

            {u.clicks.length > 0 && (
              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: 'pointer' }}>Click Details ({u.clicks.length})</summary>
                <div style={{ marginTop: 8, fontSize: 12, background: '#ffffff', borderRadius: 8, padding: 12, border: '1px solid #cbd5e1' }}>
                  {u.clicks.map((c, i) => (
                    <div key={i} style={{ padding: 4, borderBottom: '1px solid #eee' }}>
                      {fmt(c.time)} | {c.source} | {c.loc}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </Paper>
    </Container>
  )
}

export default Statistics