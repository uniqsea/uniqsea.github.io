// Introduction: name, role, statement and contact, beside the portrait.
import styled from 'styled-components'
import { Mail, Globe, Github, Linkedin } from 'lucide-react'
import { site } from '../../data/site.js'
import { asset, contact } from '../../portfolio-shared/content/index.js'
import { useContent } from '../i18n.js'
import { Container, media } from '../theme.js'
import Reveal from '../components/Reveal.jsx'

const Wrap = styled.section`
  padding: clamp(56px, 9vw, 112px) 0 clamp(56px, 8vw, 96px);
`
const Grid = styled(Container)`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(32px, 6vw, 96px); align-items: end;
  ${media.tablet} { grid-template-columns: 1fr; }
`
const Text = styled.div`
  display: grid; gap: 28px;
  h1 { font-size: clamp(52px, 8vw, 104px); font-weight: 700; line-height: 0.98; letter-spacing: -0.045em; }
  .role { font: 600 clamp(17px, 1.6vw, 20px)/1.45 var(--heading-font); color: var(--muted); letter-spacing: -0.01em; }
  .statement { font-size: 19px; line-height: 1.55; max-width: 620px; }
`
const Contact = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; padding-top: 8px;
  a {
    display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid var(--line); border-radius: 999px;
    font-size: 14px; transition: border-color 0.2s, background 0.2s;
  }
  a:hover { border-color: var(--fg); }
  svg { width: 16px; height: 16px; color: var(--muted); }
`
const Portrait = styled.div`
  aspect-ratio: 4 / 5; overflow: hidden; background: var(--alt);
  img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; display: block; }
  ${media.tablet} { max-width: 360px; }
`
const ICONS = { Email: Mail, Website: Globe, GitHub: Github, LinkedIn: Linkedin }

export default function Hero() {
  const { cover } = useContent()
  const rows = [{ label: 'Email', text: contact.email, href: `mailto:${contact.email}` }, ...contact.links]
  return (
    <Wrap id="top">
      <Grid>
        <Text>
          <Reveal as="h1">{site.fullName}</Reveal>
          <Reveal delay={0.08}><p className="role">{cover.role[0]}<br />{cover.role[1]}</p></Reveal>
          <Reveal delay={0.16}><p className="statement">{cover.statement}</p></Reveal>
          <Reveal delay={0.24}>
            <Contact>
              {rows.map((r) => {
                const Icon = ICONS[r.label]
                return <a key={r.label} href={r.href} target={r.label === 'Email' ? undefined : '_blank'} rel="noreferrer"><Icon aria-hidden />{r.text}</a>
              })}
            </Contact>
          </Reveal>
        </Text>
        <Reveal delay={0.1}><Portrait><img src={asset(cover.portrait)} alt={site.fullName} /></Portrait></Reveal>
      </Grid>
    </Wrap>
  )
}
