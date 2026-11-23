// The three case studies as cards that jump to each project.
import styled from 'styled-components'
import { ArrowDown } from 'lucide-react'
import { asset } from '../../portfolio-shared/content/index.js'
import { useContent, useT } from '../i18n.js'
import { pub, stripTags, brandVars } from '../../portfolio-shared/lib/publication.js'
import { Container, Label, media } from '../theme.js'
import Reveal from '../components/Reveal.jsx'
import { projectId } from '../hooks/ids.js'

const Wrap = styled(Container)`
  display: grid; gap: 24px; padding-bottom: clamp(40px, 6vw, 72px);
`
const Cards = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;
  ${media.tablet} { grid-template-columns: 1fr; }
`
const Card = styled.a`
  display: grid; grid-template-rows: auto 1fr; border: 1px solid var(--line); background: #fff; height: 100%;
  transition: border-color 0.25s;
  .img { aspect-ratio: 4 / 3; overflow: hidden; display: grid; place-items: center; }
  .img img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
  .txt { display: grid; gap: 10px; padding: 20px 22px 22px; border-top: 3px solid var(--c); align-content: start; }
  .top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  h3 { font-size: 24px; font-weight: 700; }
  .go { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--line); transition: background 0.25s, color 0.25s, border-color 0.25s; }
  .go svg { width: 16px; height: 16px; }
  p { font-size: 15px; line-height: 1.55; color: var(--muted); }
  .venue { font-size: 13px; color: var(--c-deep); font-weight: 500; }
  &:hover { border-color: var(--c); }
  &:hover .img img { transform: scale(1.04); }
  &:hover .go { background: var(--c); border-color: var(--c); color: #fff; }
`

export default function WorkIndex() {
  const { projects } = useContent()
  const t = useT()
  return (
    <Wrap>
      <Label>{t('Selected work')}</Label>
      <Cards>
        {projects.map((project, i) => {
          const p = pub(project.pubId)
          return (
            <Reveal key={project.key} delay={i * 0.08} style={{ height: '100%' }}>
              <Card href={`#${projectId(project)}`} style={brandVars(project)}>
                <div className="img" style={{ background: project.opener.bg || 'var(--alt)' }}><img src={asset(project.opener.image)} alt="" /></div>
                <div className="txt">
                  <div className="top"><h3>{project.name}</h3><span className="go"><ArrowDown /></span></div>
                  <p>{project.opener.intro}</p>
                  <span className="venue">{stripTags(p.venueHtml)}{p.award ? ` · ${t(p.award)}` : ''}</span>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </Cards>
    </Wrap>
  )
}
