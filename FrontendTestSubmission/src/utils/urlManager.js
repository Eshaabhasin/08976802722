import { FrontendLogger } from './logger.js'

let urlData = JSON.parse(localStorage.getItem('urls') || '{}')

const save = () => localStorage.setItem('urls', JSON.stringify(urlData))

const genCode = () => Math.random().toString(36).substr(2, 6)

export const isValidUrl = (url) => {
  try { new URL(url); return true } catch { return false }
}

export const createShortUrl = (url, mins = 30, code = null) => {
  if (!isValidUrl(url)) throw new Error('Invalid URL')
  
  const shortcode = code && /^[a-zA-Z0-9]{1,10}$/.test(code) ? 
    (urlData[code] ? (() => { throw new Error('Code exists') })() : code) :
    (() => { let c; do c = genCode(); while (urlData[c]); return c })()
  
  const expires = new Date(Date.now() + mins * 60000)
  urlData[shortcode] = {
    url, shortcode,
    created: new Date().toISOString(),
    expires: expires.toISOString(),
    clicks: []
  }
  save()
  FrontendLogger.utils.info(`Short URL created: ${shortcode}`)
  return { shortUrl: `http://localhost:3000/${shortcode}`, expires: expires.toISOString() }
}

export const getUrl = (code) => {
  const data = urlData[code]
  return data && new Date() <= new Date(data.expires) ? data.url : null
}

export const addClick = (code) => {
  if (urlData[code]) {
    urlData[code].clicks.push({ time: new Date().toISOString(), source: 'direct', loc: 'Unknown' })
    save()
    FrontendLogger.utils.info(`Click recorded: ${code}`)
  }
}

export const getAll = () => Object.values(urlData).map(d => ({
  ...d, shortUrl: `http://localhost:3000/${d.shortcode}`,
  expired: new Date() > new Date(d.expires)
}))