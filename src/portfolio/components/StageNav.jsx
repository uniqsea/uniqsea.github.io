// Sticky process bar for one project: its stages in order, the one being read marked.
// Clicking a stage jumps to the first page of that stage.
import styled from 'styled-components'
import { Container, media } from '../theme.js'

const Bar = styled.div`
  position: sticky; top: var(--bar); z-index: 40;
  background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
`
const Inner = styled(Container)`
  display: flex; align-items: center; gap: 20px; height: 48px; overflow-x: auto; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  .name { flex: none; font: 700 13px/1 var(--heading-font); color: var(--c-deep); }
  ol { display: flex; gap: 4px; margin: 0; padding: 0; list-style: none; }
  a {
    display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; padding: 7px 10px; border-radius: 999px;
    font: 500 13px/1 var(--body-font); color: var(--muted); transition: color 0.2s, background 0.2s;
  }
  a span { font-variant-numeric: tabular-nums; opacity: 0.6; }
  a:hover { color: var(--fg); }
  a.on { color: #fff; background: var(--c-deep); }
  a.on span { opacity: 0.8; }
  ${media.phone} { .name { display: none; } }
`

export default function StageNav({ project, targets, activeStage }) {
  return (
    <Bar>
      <Inner>
        <span className="name">{project.name}</span>
        <ol>
          {project.stages.map((s, i) => (
            <li key={s}>
              <a href={`#${targets[s]}`} className={s === activeStage ? 'on' : undefined}><span>{i + 1}</span>{s}</a>
            </li>
          ))}
        </ol>
      </Inner>
    </Bar>
  )
}
