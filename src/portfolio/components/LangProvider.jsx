// Holds the portfolio language. The choice comes from ?lang=zh|en, then the last choice
// on this browser, then English; switching updates the URL and <html lang>.
//
// Switching keeps the reader's place: Chinese and English copy differ in length, so the same
// scroll offset would land on different content. Both languages render the same DOM structure,
// so the element being read is remembered by its position in the tree and, before the new
// language paints, the page is scrolled to keep that element where it was on screen.
//
// The swap itself runs inside a view transition, so lines that rewrap (two English lines
// becoming one Chinese line) crossfade instead of snapping. Browsers without view
// transitions, and readers who prefer reduced motion, get the instant swap.
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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

/* Child-index path from <body> to an element, and back. */
const pathTo = (el) => {
  const path = []
  for (let n = el; n && n !== document.body; n = n.parentElement) path.unshift([...n.parentElement.children].indexOf(n))
  return path
}
const resolve = (path) => path.reduce((n, i) => n?.children[i], document.body)

/* The element under the reading line (a third of the way down the screen) and where it sits. */
const readingAnchor = () => {
  const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 3)
  return el && el !== document.body && el !== document.documentElement
    ? { path: pathTo(el), top: el.getBoundingClientRect().top }
    : null
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initial)
  const anchor = useRef(null)

  const setLang = useCallback((next) => {
    anchor.current = readingAnchor()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduce) {
      document.startViewTransition(() => flushSync(() => setLangState(next)))
    } else {
      setLangState(next)
    }
    try { window.localStorage.setItem(LANG_KEY, next) } catch { /* ignore */ }
    const url = new URL(window.location.href)
    if (next === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', next)
    window.history.replaceState(window.history.state, '', url)
  }, [])

  useLayoutEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'

    const a = anchor.current
    anchor.current = null
    const el = a && resolve(a.path)
    if (el) {
      const shift = el.getBoundingClientRect().top - a.top
      if (Math.abs(shift) >= 1) window.scrollTo({ top: window.scrollY + shift, behavior: 'instant' })
    }
    return () => { document.documentElement.lang = prev }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
