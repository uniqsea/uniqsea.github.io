import { useEffect, useState } from 'react'

// Resolve the visitor's country from their IP using free, key-less,
// CORS-enabled geo services. Country-level only; nothing is stored.
// Returns { status, code, name } where status is 'loading' | 'ready' | 'error'.
//
// Privacy: this sends the visitor's IP to a third party. It is used transiently
// to pick which country's dot map to render and is never persisted.
//
// Multiple providers are tried in order for resilience (rate limits / outages).

const TIMEOUT_MS = 4000

const PROVIDERS = [
  {
    url: 'https://get.geojs.io/v1/ip/country.json',
    parse: (d) => (d && d.country ? { code: d.country, name: d.name || d.country } : null),
  },
  {
    url: 'https://ipapi.co/json/',
    parse: (d) =>
      d && d.country_code ? { code: d.country_code, name: d.country_name || d.country_code } : null,
  },
  {
    url: 'https://ipwho.is/',
    parse: (d) =>
      d && d.success !== false && d.country_code
        ? { code: d.country_code, name: d.country || d.country_code }
        : null,
  },
]

async function fetchCountry(signal) {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(provider.url, { signal })
      if (!res.ok) continue
      const data = await res.json()
      const parsed = provider.parse(data)
      if (parsed) return parsed
    } catch {
      // try the next provider
    }
  }
  return null
}

export function useVisitorCountry() {
  const [state, setState] = useState({ status: 'loading', code: null, name: null })

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    fetchCountry(controller.signal)
      .then((result) => {
        if (cancelled) return
        if (result) {
          setState({ status: 'ready', code: result.code, name: result.name })
        } else {
          setState({ status: 'error', code: null, name: null })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', code: null, name: null })
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  return state
}
