/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { messages, translate } from '../i18n.js'
import { sitePreferencesEnabled } from '../config/features.js'

const PreferencesContext = createContext(null)

function getInitialLanguage() {
  if (!sitePreferencesEnabled) return 'en'
  const saved = localStorage.getItem('site-language')
  if (saved === 'en' || saved === 'zh') return saved
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function getInitialTheme() {
  if (!sitePreferencesEnabled) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const saved = localStorage.getItem('site-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function SitePreferencesProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    if (sitePreferencesEnabled) localStorage.setItem('site-language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#0b0b0c' : '#f8f8f8',
    )
    if (sitePreferencesEnabled) localStorage.setItem('site-theme', theme)
  }, [theme])

  const value = useMemo(() => ({
    language,
    theme,
    setLanguage,
    setTheme,
    toggleLanguage: () => setLanguage(current => current === 'en' ? 'zh' : 'en'),
    toggleTheme: () => setTheme(current => current === 'dark' ? 'light' : 'dark'),
    t: (key, values) => translate(messages[language], key, values),
  }), [language, theme])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function useSitePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('useSitePreferences must be used inside SitePreferencesProvider')
  return context
}
