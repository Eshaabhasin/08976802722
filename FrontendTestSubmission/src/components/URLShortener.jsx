import { useState } from 'react'
import { Container, Paper, Typography, TextField, Button, Alert } from '@mui/material'
import { createShortUrl, isValidUrl } from '../utils/urlManager'
import { FrontendLogger } from '../utils/logger'

function URLShortener() {
  const [urls, setUrls] = useState([{ id: 1, url: '', mins: '', code: '' }])
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const update = (id, field, value) => {
    setUrls(urls.map(u => u.id === id ? { ...u, [field]: value } : u))
    setError('')
  }

  const add = () => urls.length < 5 && setUrls([...urls, { id: Date.now(), url: '', mins: '', code: '' }])
  const remove = (id) => urls.length > 1 && setUrls(urls.filter(u => u.id !== id))

  const submit = () => {
    try {
      const newResults = []
      for (const u of urls) {
        if (!u.url.trim()) continue
        if (!isValidUrl(u.url)) throw new Error('Invalid URL')
        if (u.mins && (!Number.isInteger(+u.mins) || +u.mins <= 0)) throw new Error('Invalid minutes')
        const result = createShortUrl(u.url, +u.mins || 30, u.code || null)
        newResults.push({ original: u.url, ...result })
      }
      setResults(newResults)
      FrontendLogger.component.info(`${newResults.length} URLs created`)
    } catch (e) {
      setError(e.message)
      FrontendLogger.component.error(`URL creation failed: ${e.message}`)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 40px rgba(59,130,246,0.15)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1e293b', fontWeight: '700', mb: 3 }}>URL Shortener</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {urls.map((u, i) => (
          <div key={u.id} style={{ marginBottom: 20, padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <Typography variant="h6" sx={{ color: '#475569', fontWeight: '600' }}>URL #{i + 1}</Typography>
              {urls.length > 1 && <Button onClick={() => remove(u.id)} color="error" sx={{ ml: 'auto' }}>Remove</Button>}
            </div>
            <TextField fullWidth label="URL" value={u.url} onChange={(e) => update(u.id, 'url', e.target.value)} sx={{ mb: 1 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <TextField label="Minutes" type="number" value={u.mins} onChange={(e) => update(u.id, 'mins', e.target.value)} />
              <TextField label="Custom Code" value={u.code} onChange={(e) => update(u.id, 'code', e.target.value)} />
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {urls.length < 5 && <Button variant="outlined" onClick={add}>Add URL</Button>}
          <Button variant="contained" onClick={submit} sx={{ ml: 'auto' }}>Shorten</Button>
        </div>

        {results.length > 0 && (
          <div style={{ padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '1px solid #93c5fd', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#0f172a', fontWeight: '700' }}>Results</Typography>
            {results.map((r, i) => (
              <div key={i} style={{ marginBottom: 16, padding: 20, backgroundColor: '#ffffff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                <Typography variant="body2" color="text.secondary">Original: {r.original}</Typography>
                <Typography variant="h6" color="primary" onClick={() => navigator.clipboard.writeText(r.shortUrl)} style={{ cursor: 'pointer' }}>
                  {r.shortUrl}
                </Typography>
                <Typography variant="caption">Expires: {new Date(r.expires).toLocaleString()}</Typography>
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Container>
  )
}

export default URLShortener