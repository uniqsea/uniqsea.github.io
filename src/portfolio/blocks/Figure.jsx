// A figure at its own ratio; click to open it, with the page's other figures, in the lightbox.
import { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { HeartPulse, Maximize2, MousePointer2 } from 'lucide-react'
import { asset } from '../../portfolio-shared/content/index.js'
import { captionParts, gap } from '../../portfolio-shared/lib/rich.jsx'
import { useLightbox } from '../components/lightboxContext.js'
import { FigureGroup } from './figureGroup.js'
import MagHeartMeasurement from '../components/MagHeartMeasurement.jsx'
import { MagHeartContext } from '../components/magHeartContext.js'
import MagHeartAvatar from '../components/MagHeartAvatar.jsx'
import { useT } from '../i18n.js'

const Fig = styled.figure`
  margin: 0; display: grid; gap: 10px; min-width: 0;
  button { position: relative; display: block; padding: 0; border: 0; background: none; cursor: zoom-in; overflow: hidden; }
  img { display: block; width: 100%; height: auto; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
  button:hover img { transform: scale(1.015); }
  .avatar-button { overflow: visible; }
  .measurement { display: block; width: 100%; height: auto; }
  .avatar-photo { display: block; width: 100%; height: auto; overflow: visible; }
  .heart-rate {
    position: absolute; bottom: calc(100% + 6px); right: 0; display: inline-flex; align-items: center;
    gap: 3px; color: #c54250; background: transparent; font-variant-numeric: tabular-nums;
    font: 700 16px/1 var(--body-font); pointer-events: none; visibility: hidden;
  }
  .heart-rate small { font-size: 9px; color: var(--muted); align-self: end; }
  .avatar-button[data-measuring] .heart-rate { visibility: visible; }
  .hover-hint, button.touch-preview {
    justify-self: start; display: inline-flex; align-items: center; gap: 6px;
    font: 500 13px/1.4 var(--body-font); color: var(--muted);
  }
  button.touch-preview { display: none; cursor: pointer; padding: 7px 0; color: var(--c-deep); }
  @media (hover: none) {
    .hover-hint { display: none; }
    button.touch-preview { display: inline-flex; }
  }
  @media (prefers-reduced-motion: no-preference) {
    [data-measuring] .measurement-dimmer { animation: magheart-measure 3.6s ease-in-out infinite; }
  }
  @media (prefers-reduced-motion: no-preference) {
    .avatar-button[data-measuring] .avatar-and-disc { animation: magheart-pulse var(--beat-period) infinite; }
    .avatar-button[data-measuring] .heart-rate svg { animation: magheart-icon var(--beat-period) infinite; }
  }
  @keyframes magheart-measure {
    0%, 100% { opacity: 0; }
    50% { opacity: .42; }
  }
  @keyframes magheart-icon {
    0%, 72%, 100% { transform: scale(1); }
    24% { transform: scale(1.16); }
  }
  @keyframes magheart-pulse {
    0%, 72%, 100% { transform: translateY(0); }
    24% { transform: translateY(-32px); }
  }
  .zoom {
    position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%;
    display: grid; place-items: center; background: rgba(255, 255, 255, 0.92); color: var(--fg);
    border: 1px solid var(--line); opacity: 0; transform: translateY(-4px); transition: opacity 0.2s, transform 0.2s;
  }
  .zoom svg { width: 15px; height: 15px; }
  button:hover .zoom, button:focus-visible .zoom { opacity: 1; transform: none; }
`
const Cap = styled.figcaption`
  font-size: 13.5px; line-height: 1.55; color: var(--muted);
  b { color: var(--fg); font-weight: 500; }
`

export function Caption({ c }) {
  if (!c) return null
  const [title, text] = captionParts(c)
  return <Cap>{title && <><b>{title}</b>{gap(title)}</>}{text}</Cap>
}

function MagHeartButton({ figure, children, ...props }) {
  const { measurementVisible, setMeasurementVisible, avatarHovered, setAvatarHovered, bpm } = useContext(MagHeartContext)
  const t = useT()
  const previewTimer = useRef(null)
  useEffect(() => () => window.clearTimeout(previewTimer.current), [])
  const avatar = figure === 'mh-figure-cut.jpg'
  const buttonRef = useRef(null)
  const active = avatar ? avatarHovered : measurementVisible

  useEffect(() => {
    if (avatar) return
    const observer = new IntersectionObserver(([entry]) => setMeasurementVisible(entry.isIntersecting))
    observer.observe(buttonRef.current)
    return () => {
      observer.disconnect()
      setMeasurementVisible(false)
    }
  }, [avatar, setMeasurementVisible])

  return (
    <>
    <button {...props} ref={buttonRef} className={avatar ? 'avatar-button' : undefined} data-measuring={active || undefined}
      style={{ '--beat-period': `${60 / bpm}s` }}
      onPointerEnter={avatar ? e => setAvatarHovered(e.pointerType === 'mouse' || e.pointerType === 'pen') : undefined}
      onPointerLeave={avatar ? e => { if (e.pointerType !== 'touch') setAvatarHovered(false) } : undefined}>
      {avatar ? <MagHeartAvatar figure={figure} /> : <MagHeartMeasurement figure={figure} bpm={bpm} />}
      {avatar && <span className="heart-rate" aria-hidden><HeartPulse size={15} />{bpm} <small>BPM</small></span>}
      {children}
    </button>
    {avatar && <>
      <span className="hover-hint"><MousePointer2 size={14} aria-hidden />{t('Hover to see the heartbeat')}</span>
      <button type="button" className="touch-preview" onClick={() => {
        window.clearTimeout(previewTimer.current)
        setAvatarHovered(true)
        previewTimer.current = window.setTimeout(() => setAvatarHovered(false), 3000)
      }}><HeartPulse size={15} aria-hidden />{t('Preview heartbeat')}</button>
    </>}
    </>
  )
}

export default function Figure({ b }) {
  const group = useContext(FigureGroup)
  const { open } = useLightbox()
  const t = useT()
  const linked = b.fig === 'mh-figure-cut.jpg' || b.fig === 'mh-heartrate.jpg'
  const Button = linked ? MagHeartButton : 'button'
  const items = group.map((g) => ({ src: asset(g.fig), cap: g.cap }))
  const index = Math.max(0, group.findIndex((g) => g.fig === b.fig))
  return (
    <Fig style={b.w ? { width: b.w, justifySelf: 'start' } : undefined}>
      <Button {...(linked && { figure: b.fig })} type="button" onClick={() => open(items.length ? items : [{ src: asset(b.fig), cap: b.cap }], index)} aria-label={t('Enlarge figure')}>
        {!linked && <img src={asset(b.fig)} alt="" decoding="async" />}
        <span className="zoom" aria-hidden><Maximize2 /></span>
      </Button>
      <Caption c={b.cap} />
    </Fig>
  )
}
