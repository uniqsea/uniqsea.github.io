// Further papers and smaller projects, then the sign-off.
import styled from 'styled-components'
import { ArrowUpRight } from 'lucide-react'
import { asset, contact } from '../../portfolio-shared/content/index.js'
import { useContent, useT } from '../i18n.js'
import { SITE, moreWorkRows } from '../../portfolio-shared/lib/publication.js'
import { Container, media } from '../theme.js'
import Reveal from '../components/Reveal.jsx'
import { MORE_ID } from '../hooks/ids.js'

const Wrap = styled.section`
  background: var(--alt); padding: clamp(72px, 10vw, 128px) 0 48px; scroll-margin-top: var(--bar);
`
const Grid = styled(Container)`
  display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 32px;
  ${media.tablet} { grid-template-columns: 1fr; }
  h2 { font-size: clamp(28px, 3.2vw, 42px); font-weight: 700; line-height: 1.1; }
  .sub { margin-top: 12px; color: var(--muted); }
`
const List = styled.div`
  border-top: 1px solid var(--line);
`
const Item = styled.a`
  display: grid; grid-template-columns: 168px 1fr auto; gap: 24px; padding: 22px 0; border-bottom: 1px solid var(--line); align-items: start;
  .thumb { aspect-ratio: 16 / 10; border-radius: 10px; overflow: hidden; background: #fff; border: 1px solid var(--line); }
  .thumb img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .thumb.contain img { object-fit: contain; padding: 18%; }
  .y { display: block; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; margin-bottom: 4px; }
  strong { display: block; font: 600 18px/1.35 var(--heading-font); letter-spacing: -0.01em; margin-bottom: 6px; }
  strong u, strong strong { font-weight: inherit; }
  .d { font-size: 14px; line-height: 1.55; color: var(--muted); }
  u { text-underline-offset: 2px; }
  .go { display: flex; gap: 6px; }
  .go span { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--line); font-size: 13px; font-weight: 500; background: #fff; }
  .go span:hover { border-color: var(--fg); }
  .go svg { width: 13px; height: 13px; }
  ${media.phone} { grid-template-columns: 1fr; gap: 12px; .thumb { max-width: 320px; } }
`
const Sign = styled(Container)`
  margin-top: clamp(64px, 8vw, 104px); padding-top: 24px; display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap;
  > span:first-child { font: 700 clamp(24px, 2.6vw, 32px)/1.2 var(--heading-font); letter-spacing: -0.02em; }
  > span:last-child { display: flex; gap: 24px; }
  a { border-bottom: 1px solid var(--line); transition: border-color 0.2s; }
  a:hover { border-color: var(--fg); }
`

export default function MoreWork() {
  const { moreWork } = useContent()
  const t = useT()
  return (
    <Wrap id={MORE_ID}>
      <Grid>
        <Reveal><h2>{t('More work')}</h2><p className="sub">{t('Further publications and course projects.')}</p></Reveal>
        <List>
          {moreWorkRows(moreWork).map((r, i) => (
            <Reveal key={r.title} delay={i * 0.04}>
              <Item as="div">
                <a className={`thumb${r.fit === 'contain' ? ' contain' : ''}`} href={r.links[0]?.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden>
                  {r.image && <img src={asset(r.image)} alt="" loading="lazy" />}
                </a>
                <div><span className="y">{r.year}</span><strong>{r.title}</strong>{r.html ? <span className="d" dangerouslySetInnerHTML={{ __html: r.html }} /> : <span className="d">{r.text}</span>}</div>
                <span className="go">{r.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer"><span>{l.label}<ArrowUpRight aria-hidden /></span></a>)}</span>
              </Item>
            </Reveal>
          ))}
        </List>
      </Grid>
      <Sign>
        <span>{t('Thank you.')}</span>
        <span><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={SITE} target="_blank" rel="noreferrer">haiyangxu.me</a></span>
      </Sign>
    </Wrap>
  )
}
