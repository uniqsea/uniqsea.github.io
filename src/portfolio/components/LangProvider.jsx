// Holds the portfolio language. The choice comes from ?lang=zh|en, then the last choice
// on this browser, then English; switching updates the URL and <html lang>.
import { useCallback, useEffect, useState } from 'react'
import { LANGS, LANG_KEY, LangContext } from '../i18n.js'

const initial = () => {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (LANGS.includes(q)) return q
    const saved = window.localStorage.getItem(LANG_KEY)
    if (LANGS.includes(saved)) return saved
  } catch { /* storage blocked: fall through */ }
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initial)
  const setLang = useCallback((next) => {
    setLangState(next)
    try { window.localStorage.setItem(LANG_KEY, next) } catch { /* ignore */ }
    const url = new URL(window.location.href)
    if (next === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', next)
    window.history.replaceState(window.history.state, '', url)
  }, [])
  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    return () => { document.documentElement.lang = prev }
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

