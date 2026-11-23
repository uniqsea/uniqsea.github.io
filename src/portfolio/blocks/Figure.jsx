// A figure at its own ratio; click to open it, with the page's other figures, in the lightbox.
import { useContext } from 'react'
import styled from 'styled-components'
import { Maximize2 } from 'lucide-react'
import { asset } from '../../portfolio-shared/content/index.js'
import { captionParts, gap } from '../../portfolio-shared/lib/rich.jsx'
import { useLightbox } from '../components/lightboxContext.js'
import { FigureGroup } from './figureGroup.js'
import { useT } from '../i18n.js'

const Fig = styled.figure`
  margin: 0; display: grid; gap: 10px; min-width: 0;
  button { position: relative; display: block; padding: 0; border: 0; background: none; cursor: zoom-in; overflow: hidden; }
  img { display: block; width: 100%; height: auto; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
  button:hover img { transform: scale(1.015); }
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

export default function Figure({ b }) {
  const group = useContext(FigureGroup)
  const { open } = useLightbox()
  const t = useT()
  const items = group.map((g) => ({ src: asset(g.fig), cap: g.cap }))
  const index = Math.max(0, group.findIndex((g) => g.fig === b.fig))
  return (
    <Fig style={b.w ? { width: b.w, justifySelf: 'start' } : undefined}>
      <button type="button" onClick={() => open(items.length ? items : [{ src: asset(b.fig), cap: b.cap }], index)} aria-label={t('Enlarge figure')}>
        <img src={asset(b.fig)} alt="" decoding="async" />
        <span className="zoom" aria-hidden><Maximize2 /></span>
      </button>
      <Caption c={b.cap} />
    </Fig>
  )
}
