// A project's opening screen: logo, title, one-line intro and paper details beside its key image.
import styled, { keyframes } from 'styled-components'
import { ArrowUpRight } from 'lucide-react'
import { asset } from '../../portfolio-shared/content/index.js'
import { pub, stripTags, subtitle, projectLinks, authorsHtml } from '../../portfolio-shared/lib/publication.js'
import { Label, media } from '../theme.js'
import Reveal from '../components/Reveal.jsx'
import { useT } from '../i18n.js'

/* MagHeart's logo beats at a resting heart rate (~75 bpm). */
const beat = keyframes`
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.12); }
  28% { transform: scale(1); }
  42% { transform: scale(1.07); }
  70% { transform: scale(1); }
`
const LOGO_MOTION = { magheart: beat }

const Wrap = styled.section`
  display: grid; min-height: min(92vh, 860px);
  /* The left column carries the page-gutter offset on wide screens, so it grows by that offset
     instead of squeezing the text (otherwise the title runs under the image). */
  grid-template-columns: max(41.667%, calc((100% - 1240px) / 2 + 64px + 560px)) minmax(0, 1fr);
  scroll-margin-top: var(--bar);
  ${media.tablet} { grid-template-columns: 1fr; min-height: 0; }
`
const Left = styled.div`
  background: var(--c-tint); padding: clamp(40px, 5vw, 72px) clamp(24px, 4vw, 56px) clamp(36px, 4vw, 56px) max(clamp(20px, 5vw, 64px), calc((100vw - 1240px) / 2 + 64px));
  display: flex; flex-direction: column; gap: 28px;
  ${media.tablet} { padding: 48px clamp(20px, 5vw, 64px); order: 2; }
  .logo { transform-origin: 30% 50%; }
  .title { margin-top: auto; display: grid; gap: 14px; }
  h2 { font-size: clamp(48px, 5.6vw, 76px); font-weight: 700; line-height: 1; letter-spacing: -0.035em; }
  .sub { font: 600 clamp(16px, 1.4vw, 19px)/1.4 var(--heading-font); color: var(--c-deep); letter-spacing: -0.01em; }
  .intro { font-size: 19px; line-height: 1.55; }
`
const Right = styled.div`
  /* The image fills the column but never sets its height: the opener's height comes from
     min-height and the text, not from a tall photo stretched to the column width. */
  position: relative; overflow: hidden;
  img { position: absolute; inset: 0; width: 100%; height: 100%; display: block; box-sizing: border-box; padding: inherit; }
  ${media.tablet} { order: 1; aspect-ratio: 4 / 3; }
`
const Meta = styled.dl`
  margin: 0; display: grid; gap: 10px; border-top: 1px solid rgba(17, 17, 17, 0.14); padding-top: 20px;
  > div { display: grid; grid-template-columns: 112px 1fr; gap: 12px; font-size: 14px; line-height: 1.55; align-items: baseline; }
  dd { margin: 0; }
  dd ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 2px; }
  strong { font-weight: 500; }
  u { text-underline-offset: 2px; }
  sup { font-size: 0.7em; }
  ${media.phone} { > div { grid-template-columns: 1fr; gap: 2px; } }
`
const Links = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  a, button {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px; border-radius: 999px; cursor: pointer;
    font: 500 14px/1 var(--body-font); color: var(--c-deep); background: #fff; border: 1px solid transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  a:hover, button:hover { border-color: var(--c-deep); }
  .primary { background: var(--c-deep); color: #fff; }
  .primary:hover { background: #fff; color: var(--c-deep); }
  svg { width: 15px; height: 15px; }
`

export default function ProjectOpener({ id, project }) {
  const t = useT()
  const p = pub(project.pubId)
  const { opener } = project
  const links = projectLinks(project)
  const motionKf = LOGO_MOTION[project.key]
  return (
    <Wrap id={id}>
      <Left>
        <Reveal>
          <img className="logo" src={asset(project.logo.src)} alt={`${project.name} logo`}
            style={{ height: 'clamp(80px, 7.5vw, 100px)', width: 'auto', animation: motionKf ? `${motionKf.getName()} 0.8s ease-in-out infinite` : undefined }} />
        </Reveal>
        <Reveal className="title" delay={0.06}>
          <h2>{project.name}</h2>
          <p className="sub">{t(subtitle(p))}</p>
        </Reveal>
        <Reveal delay={0.12}><p className="intro">{opener.intro}</p></Reveal>
        <Reveal delay={0.18}>
          <Meta>
            <div><dt><Label>{t('Venue')}</Label></dt><dd>{stripTags(p.venueHtml)} · {project.place}</dd></div>
            {p.award && <div><dt><Label>{t('Recognition')}</Label></dt><dd style={{ fontWeight: 500 }}>{t(p.award)}</dd></div>}
            <div><dt><Label>{t('Authors')}</Label></dt><dd dangerouslySetInnerHTML={{ __html: authorsHtml(p).replace('(* equal contribution)', t('(* equal contribution)')) }} /></div>
            {project.role && <div><dt><Label>{t('Role')}</Label></dt><dd>{Array.isArray(project.role) ? <ul>{project.role.map((r) => <li key={r}>{r}</li>)}</ul> : project.role}</dd></div>}
          </Meta>
        </Reveal>
        <Reveal delay={0.22}>
          <Links>
            {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}<ArrowUpRight aria-hidden /></a>)}
          </Links>
        </Reveal>
      </Left>
      <Right style={{ background: opener.bg || 'var(--alt)', padding: opener.fit === 'contain' ? (opener.pad === '0' ? 0 : 'clamp(24px, 5vw, 72px)') : 0 }}>
        <img src={asset(opener.image)} alt="" style={{ objectFit: opener.fit || 'cover' }} />
      </Right>
    </Wrap>
  )
}
