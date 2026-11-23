// Renders one content block for the screen (schema: portfolio-shared/content/index.js).
import styled from 'styled-components'
import { rich, pair } from '../../portfolio-shared/lib/rich.jsx'
import CountUp from '../components/CountUp.jsx'
import Figure, { Caption } from './Figure.jsx'
import { Label, media } from '../theme.js'
import { useT } from '../i18n.js'

const Display = styled.h2`
  font-size: clamp(36px, 5vw, 64px); font-weight: 700; line-height: 1.04; letter-spacing: -0.035em;
`
const H2 = styled.h2`
  font-size: clamp(28px, 3.2vw, 42px); font-weight: 700; line-height: 1.1;
`
const H3 = styled.h3`
  font-size: 19px; font-weight: 700; line-height: 1.3;
`
const Paras = styled.div`
  display: grid; gap: 16px;
  b { font-weight: 700; }
  ${(p) => p.$lead && 'font-size: 19px; line-height: 1.55;'}
  ${(p) => p.$columns && `@media (min-width: 901px) { display: block; column-count: ${p.$columns}; column-gap: 32px; p + p { margin-top: 16px; } }`}
`
const Bullets = styled.ul`
  margin: 0; padding: 0; list-style: none; display: grid; gap: 12px;
  li { display: grid; grid-template-columns: 7px 1fr; gap: 12px; }
  li::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--c); margin-top: 9px; }
  b { font-weight: 500; }
`
const Ordered = styled.ol`
  margin: 0; padding: 0; list-style: none; counter-reset: n; display: grid; gap: 14px;
  ${(p) => p.$columns && `grid-template-columns: repeat(${p.$columns}, minmax(0, 1fr)); column-gap: 32px; ${media.tablet} { grid-template-columns: 1fr; }`}
  li { counter-increment: n; display: grid; grid-template-columns: 22px 1fr; }
  li::before { content: counter(n); font: 700 16px/1.65 var(--heading-font); color: var(--c-deep); }
  b { font-weight: 500; }
`
const Foot = styled.div`
  border-top: 1px solid var(--line); padding-top: 18px; display: grid; gap: 14px;
`
const Small = styled.p`
  font-size: 14px; line-height: 1.55; color: var(--muted);
`
const Stats = styled.div`
  display: grid; border-top: 1px solid var(--line);
  > div { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--line); }
  span { font-size: 14px; color: var(--muted); }
  strong { font: 700 24px/1 var(--heading-font); font-variant-numeric: tabular-nums; color: var(--c-deep); letter-spacing: -0.01em; }
`
const Quote = styled.blockquote`
  margin: 0; display: grid; gap: 10px; padding-left: 20px; border-left: 3px solid var(--c);
  > p:first-child { font: 600 clamp(19px, 1.9vw, 24px)/1.4 var(--heading-font); letter-spacing: -0.01em; color: var(--c-deep); text-wrap: balance; }
`
const Ask = styled.p`
  font: 600 clamp(22px, 2.4vw, 30px)/1.3 var(--heading-font); letter-spacing: -0.015em; color: var(--c-deep); text-wrap: balance;
`
const Step = styled.div`
  display: grid; gap: 8px;
  h3 { display: flex; align-items: center; gap: 12px; font-size: 19px; font-weight: 700; line-height: 1.3; }
  h3 span { flex: none; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: var(--c); color: #fff; font-size: 14px; font-variant-numeric: tabular-nums; }
`
const Checks = styled.div`
  display: grid; grid-template-columns: repeat(${(p) => p.$n}, minmax(0, 1fr)); gap: 32px;
  ${media.tablet} { grid-template-columns: 1fr; gap: 20px; }
  > div { border-top: 3px solid var(--line); padding-top: 16px; display: grid; grid-template-columns: 1fr auto; column-gap: 16px; row-gap: 6px; transition: border-color 0.3s; }
  > div.ok { border-top-color: var(--c); }
  h3 { font-size: 19px; font-weight: 700; line-height: 1.3; }
  em { font: 700 24px/1 var(--heading-font); font-style: normal; color: var(--c-deep); grid-row: span 2; }
  > div:not(.ok) em { color: rgba(17, 17, 17, 0.3); }
  p { grid-column: 1; color: var(--muted); }
`

export default function Block({ b }) {
  const t = useT()
  if (b.display) return <Display>{b.display}</Display>
  if (b.h) return <H2>{b.h}</H2>
  if (b.h3) return <H3>{b.h3}</H3>
  if (b.lead) return <Paras $lead $columns={b.columns}><p>{rich(b.lead)}</p></Paras>
  if (b.p) return <Paras $columns={b.columns}>{[].concat(b.p).map((t) => <p key={t.slice(0, 24)}>{rich(t)}</p>)}</Paras>
  if (b.checks) return <Checks $n={b.checks.length}>{b.checks.map(([t, x, ok]) => <div key={t} className={ok ? 'ok' : undefined}><h3>{t}</h3><em>{ok ? '✓' : '?'}</em><p>{x}</p></div>)}</Checks>
  if (b.label) return <Label>{b.label}</Label>
  if (b.bullets) return <Bullets>{b.bullets.map(pair)}</Bullets>
  if (b.ordered) return <Ordered $columns={b.columns}>{b.ordered.map(pair)}</Ordered>
  if (b.findings) return <Foot><Label>{t('Findings')}</Label><Bullets>{b.findings.map(pair)}</Bullets></Foot>
  if (b.stats) return <Stats>{b.stats.map(([k, v]) => <div key={k}><span>{k}</span><strong><CountUp text={v} /></strong></div>)}</Stats>
  if (b.note) return <Foot><Small>{b.note}</Small></Foot>
  if (b.step) return <Step><h3><span>{b.step.n}</span>{b.step.title}</h3><Small>{b.step.text}</Small></Step>
  if (b.ask) return <Ask>{b.ask}</Ask>
  if (b.quote) return <Quote><p>“{b.quote}”</p><Small>{b.by}</Small></Quote>
  if (b.fig) return <Figure b={b} />
  if (b.cap) return <Caption c={b.cap} />
  return null
}
