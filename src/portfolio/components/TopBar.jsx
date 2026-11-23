// Sticky bar, styled like the site's NavBar (src/components/NavBar.jsx): name on the left;
// on the right, jump links to each project (the one in view underlined in its brand colour)
// and the EN | 中 switch; a reading-progress line along the bottom edge.
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useSpring } from 'motion/react'
import { site } from '../../data/site.js'
import { useLang, useT } from '../i18n.js'

const Bar = styled.header`
  position: sticky; top: 0; z-index: 50; view-transition-name: portfolio-bar;
  background: #f8f8f8; border-bottom: 1px solid var(--line);
`
const Inner = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  max-width: 1200px; margin: 0 auto; padding: 12px 32px;
  .name { font: 700 clamp(16px, 4vw, 20px)/1.1 var(--heading-font); letter-spacing: -0.02em; white-space: nowrap; }
  @media (max-width: 640px) { padding: 8px 20px; gap: 12px; }
  @media (max-width: 720px) { .name { display: none; } }
`
const Right = styled.div`
  display: flex; align-items: center; gap: clamp(12px, 2vw, 22px); min-width: 0;
`
const Links = styled.ul`
  display: flex; align-items: center; gap: clamp(12px, 2.2vw, 24px); margin: 0; padding: 0; list-style: none;
  @media (max-width: 420px) { gap: 10px; }
  a {
    position: relative; display: inline-block; padding: 8px 0; white-space: nowrap;
    font: 500 clamp(12px, 3vw, 14px)/1.7 var(--heading-font); color: var(--muted); transition: color 0.2s ease;
  }
  a:hover, a[aria-current='true'] { color: var(--fg); }
  a[aria-current='true']::after { content: ''; position: absolute; left: 0; right: 0; bottom: 2px; height: 1px; background: currentColor; }
`
/* Both languages always visible; the current one sits on a white chip, so it reads as a switch. */
const Switch = styled.div`
  display: inline-flex; align-items: center; padding: 3px; gap: 2px;
  border-radius: 999px; background: rgba(17, 17, 17, 0.06);
  button {
    min-width: 36px; height: 28px; padding: 0 10px; border: 0; border-radius: 999px; background: transparent; cursor: pointer;
    font: 600 13px/1 var(--heading-font); color: var(--muted);
    transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  }
  button:hover { color: var(--fg); }
  button[aria-pressed='true'] { background: #fff; color: var(--fg); box-shadow: 0 1px 2px rgba(17, 17, 17, 0.12), 0 0 0 1px rgba(17, 17, 17, 0.06); cursor: default; }
  @media (max-width: 420px) { button { min-width: 32px; height: 26px; padding: 0 8px; font-size: 12px; } }
`
const Progress = styled(motion.div)`
  position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; transform-origin: 0 50%;
`

/* Publishes the bar's height as --bar on the page, so the sticky project bar sits right below it. */
function useBarHeight(ref) {
  useEffect(() => {
    const bar = ref.current
    const page = bar?.closest('main')
    if (!bar || !page) return undefined
    const ro = new ResizeObserver(() => page.style.setProperty('--bar', `${bar.offsetHeight}px`))
    ro.observe(bar)
    return () => ro.disconnect()
  }, [ref])
}

export default function TopBar({ items, active }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const { lang, setLang } = useLang()
  const t = useT()
  const ref = useRef(null)
  useBarHeight(ref)
  const current = items.find((it) => it.id === active)
  return (
    <Bar ref={ref}>
      <Inner>
        <a className="name" href="#top">{site.fullName}</a>
        <Right>
          <nav aria-label={t('Projects')}>
            <Links>
              {items.map((it) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} aria-current={it.id === active ? 'true' : undefined}
                    style={it.id === active && it.color ? { color: it.color } : undefined}>{it.label}</a>
                </li>
              ))}
            </Links>
          </nav>
          <Switch role="group" aria-label="Language / 语言">
            <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" lang="zh-CN" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中</button>
          </Switch>
        </Right>
      </Inner>
      <Progress style={{ scaleX, background: current?.color || 'var(--fg)' }} />
    </Bar>
  )
}
