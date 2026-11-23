// Sticky bar: name, jump links to each project (the one in view takes its brand colour), the EN / 中文 switch,
// and a reading-progress line.
import styled from 'styled-components'
import { motion, useScroll, useSpring } from 'motion/react'
import { site } from '../../data/site.js'
import { Container, media } from '../theme.js'
import { useLang, useT } from '../i18n.js'

const Bar = styled.header`
  position: sticky; top: 0; z-index: 50; height: var(--bar);
  background: rgba(255, 255, 255, 0.86); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid var(--line);
`
const Inner = styled(Container)`
  height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px;
  .name { font: 700 15px/1 var(--heading-font); letter-spacing: -0.01em; }
`
const Nav = styled.nav`
  display: flex; align-items: center; gap: 4px;
  a {
    display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px;
    font: 500 14px/1 var(--body-font); color: var(--muted); transition: color 0.2s, background 0.2s;
  }
  a:hover { color: var(--fg); background: var(--alt); }
  a i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: 0.35; transition: opacity 0.2s; }
  a.on { color: var(--fg); }
  a.on i { opacity: 1; }
  .lang { margin-left: 8px; display: inline-flex; padding: 3px; border: 1px solid var(--line); border-radius: 999px; }
  .lang button { padding: 5px 10px; border: 0; border-radius: 999px; background: none; cursor: pointer; font: 500 13px/1 var(--body-font); color: var(--muted); transition: color 0.2s, background 0.2s; }
  .lang button:hover { color: var(--fg); }
  .lang button[aria-pressed='true'] { background: var(--fg); color: #fff; }
  ${media.tablet} { .work { display: none; } }
`
const Progress = styled(motion.div)`
  position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; transform-origin: 0 50%;
`

export default function TopBar({ items, active }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const { lang, setLang } = useLang()
  const t = useT()
  const current = items.find((it) => it.id === active)
  return (
    <Bar>
      <Inner>
        <a className="name" href="#top">{site.fullName}</a>
        <Nav aria-label={t('Projects')}>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} className={`work${it.id === active ? ' on' : ''}`} style={it.id === active && it.color ? { color: it.color } : undefined}>
              <i aria-hidden />{it.label}
            </a>
          ))}
          <span className="lang" role="group" aria-label="Language / 语言">
            <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" lang="zh-CN" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中文</button>
          </span>
        </Nav>
      </Inner>
      <Progress style={{ scaleX, background: current?.color || 'var(--fg)' }} />
    </Bar>
  )
}
