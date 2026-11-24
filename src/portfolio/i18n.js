// Language switch (English / 中文) for the interactive portfolio.
// The content files stay in English; in Chinese every string found in content/zh.js is swapped in.
// The provider (components/LangProvider.jsx) picks the language; these hooks read it.
import { createContext, useCallback, useContext, useMemo } from 'react'
import zh from '../portfolio-shared/content/zh.js'
import { projects, cover, moreWork } from '../portfolio-shared/content/index.js'

export const LANGS = ['en', 'zh']
export const LANG_KEY = 'portfolio-lang'

/* Interface strings that are not part of the content files. */
const UI = {
  zh: {
    'More work': '更多作品',
    'Further publications and course projects.': '更多论文与课程项目。',
    'Thank you.': '感谢阅读。',
    'Selected work': '精选作品',
    Venue: '发表',
    Authors: '作者',
    Role: '我的角色',
    Findings: '主要发现',
    Projects: '项目',
    'Hover to see the heartbeat': '移到小人上，看看它如何随心跳动',
    'Preview heartbeat': '预览心跳',
    'Enlarge figure': '放大图片',
    Close: '关闭',
    Previous: '上一张',
    Next: '下一张',
    '(* equal contribution)': '（* 共同第一作者）',
  },
}

const translate = (lang, s) => (lang === 'zh' ? zh[s] ?? UI.zh[s] ?? s : s)

/* Deep copy of a content object with every known string translated. */
export const localize = (value, lang) => {
  if (lang === 'en') return value
  if (typeof value === 'string') return translate(lang, value)
  if (Array.isArray(value)) return value.map((v) => localize(v, lang))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)]))
  return value
}

export const LangContext = createContext({ lang: 'en', setLang: () => {} })

export const useLang = () => useContext(LangContext)

/* t('English string') → the string in the current language. */
export function useT() {
  const { lang } = useLang()
  return useCallback((s) => translate(lang, s), [lang])
}

/* The portfolio content in the current language. */
export function useContent() {
  const { lang } = useLang()
  return useMemo(() => ({
    projects: localize(projects, lang),
    cover: localize(cover, lang),
    moreWork: localize(moreWork, lang),
  }), [lang])
}
