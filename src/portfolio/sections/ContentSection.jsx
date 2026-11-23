// One content page of a project, laid out on the 12-column grid on wide screens and stacked on narrow ones.
import styled from 'styled-components'
import { Container, Label, media } from '../theme.js'
import Reveal from '../components/Reveal.jsx'
import Block from '../blocks/Block.jsx'
import { FigureGroup } from '../blocks/figureGroup.js'

const Section = styled.section`
  padding: clamp(72px, 10vw, 128px) 0 0; scroll-margin-top: calc(var(--bar) + 48px);
`
const Head = styled.div`
  display: flex; align-items: baseline; gap: 14px; margin-bottom: clamp(28px, 4vw, 48px);
  padding-top: 14px; border-top: 1px solid var(--line);
  .n { font: 700 12px/1.5 var(--body-font); color: var(--c-deep); font-variant-numeric: tabular-nums; letter-spacing: 0.1em; }
`
const Rows = styled.div`
  display: grid; gap: clamp(40px, 5vw, 64px);
  ${(p) => p.$center && 'align-content: center;'}
`
const Group = styled.div`
  display: grid; gap: 24px;
`
const Row = styled(Reveal)`
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 32px; row-gap: 32px;
  ${media.tablet} { grid-template-columns: 1fr !important; align-items: start !important; }
`
const Cell = styled.div`
  min-width: 0; display: flex; flex-direction: column; gap: 22px;
  > .bottom { margin-top: auto; padding-top: 16px; display: grid; gap: 22px; }
  ${media.tablet} { grid-column: 1 / -1 !important; > .bottom { margin-top: 0; } }
`

const blocksOf = (page) => page.rows.flatMap((r) => r.cells.flatMap((c) => [...c.stack, ...(c.bottom || [])]))

function PageRow({ row }) {
  return (
    <Row style={{ gridTemplateColumns: row.template, alignItems: row.align || 'start' }}>
      {row.cells.map((cell, j) => (
        <Cell key={j} style={{ gridColumn: cell.cols && `${cell.cols[0]} / ${cell.cols[1] + 1}` }}>
          {cell.stack.map((b, k) => <Block key={k} b={b} />)}
          {cell.bottom && <div className="bottom">{cell.bottom.map((b, k) => <Block key={k} b={b} />)}</div>}
        </Cell>
      ))}
    </Row>
  )
}

export default function ContentSection({ id, page, index }) {
  const groups = []
  page.rows.forEach((row) => (row.tight ? groups[groups.length - 1].push(row) : groups.push([row])))
  const figs = blocksOf(page).filter((b) => b.fig).map((b) => ({ fig: b.fig, cap: b.cap }))
  return (
    <Section id={id}>
      <Container>
        <Head><span className="n">{String(index + 1).padStart(2, '0')}</span><Label>{page.section}</Label></Head>
        <FigureGroup.Provider value={figs}>
          <Rows $center={page.center}>
            {groups.map((rows, i) => (rows.length === 1
              ? <PageRow key={i} row={rows[0]} />
              : <Group key={i}>{rows.map((row, j) => <PageRow key={j} row={row} />)}</Group>))}
          </Rows>
        </FigureGroup.Provider>
      </Container>
    </Section>
  )
}
