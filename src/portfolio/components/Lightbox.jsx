// Full-screen viewer for figures (with prev/next inside one page) and for the project video.
// Usage: wrap the page in <LightboxProvider>, then call useLightbox().open(items, index) (lightboxContext.js).
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { captionParts, gap } from '../../portfolio-shared/lib/rich.jsx'
import { media } from '../theme.js'
import { LightboxContext } from './lightboxContext.js'
import { useT } from '../i18n.js'


const Overlay = styled(motion.div)`
  position: fixed; inset: 0; z-index: 1000; background: rgba(255, 255, 255, 0.97);
  display: grid; grid-template-rows: 1fr auto; padding: 64px clamp(16px, 6vw, 96px) 28px;
`
const Stage = styled.div`
  min-height: 0; display: flex; align-items: center; justify-content: center;
  img, video { max-width: 100%; max-height: 100%; object-fit: contain; display: block; }
  video { width: min(100%, 1200px); background: #000; }
`
const Caption = styled.p`
  max-width: 820px; margin: 18px auto 0; text-align: center; font-size: 14px; line-height: 1.55; color: var(--muted);
  b { color: var(--fg); font-weight: 500; }
`
const Btn = styled.button`
  position: absolute; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%;
  border: 1px solid var(--line); background: #fff; color: var(--fg); cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  &:hover { border-color: var(--fg); }
  svg { width: 20px; height: 20px; }
  ${media.phone} { width: 38px; height: 38px; }
`
const Count = styled.span`
  position: absolute; top: 26px; left: 50%; transform: translateX(-50%);
  font: 500 12px/1 var(--body-font); letter-spacing: 0.1em; color: var(--muted); font-variant-numeric: tabular-nums;
`

export function LightboxProvider({ children }) {
  const t = useT()
  const [state, setState] = useState(null) // { items: [{ src, cap } | { video }], index }
  const open = useCallback((items, index = 0) => setState({ items, index }), [])
  const close = useCallback(() => setState(null), [])
  const go = useCallback((d) => setState((s) => s && { ...s, index: (s.index + d + s.items.length) % s.items.length }), [])

  useEffect(() => {
    if (!state) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [state, close, go])

  const item = state && state.items[state.index]
  const many = state && state.items.length > 1
  const [title, text] = item?.cap ? captionParts(item.cap) : [null, null]

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state && (
          <Overlay key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={close} role="dialog" aria-modal="true">
            {many && <Count>{state.index + 1} / {state.items.length}</Count>}
            <Btn style={{ top: 16, right: 16 }} onClick={close} aria-label={t('Close')}><X /></Btn>
            {many && <Btn style={{ left: 16, top: '50%' }} onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label={t('Previous')}><ChevronLeft /></Btn>}
            {many && <Btn style={{ right: 16, top: '50%' }} onClick={(e) => { e.stopPropagation(); go(1) }} aria-label={t('Next')}><ChevronRight /></Btn>}
            <Stage>
              <motion.div key={state.index} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
                style={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', height: '100%', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                {item.video ? <video src={item.video} controls autoPlay playsInline /> : <img src={item.src} alt="" />}
              </motion.div>
            </Stage>
            {text && <Caption onClick={(e) => e.stopPropagation()}>{title && <><b>{title}</b>{gap(title)}</>}{text}</Caption>}
          </Overlay>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}
