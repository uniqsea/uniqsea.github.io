import styled from 'styled-components'
import { Badge, Dot } from './Badge.jsx'

const Row = styled.li`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 3fr; /* make thumbnail ≈ 1/4 */
  gap: 24px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: minmax(200px, 1fr) 2fr; }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 0;
  overflow: hidden;
  background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Content = styled.div`
  display: grid;
  gap: 6px;
`

const TopLine = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
`

const Title = styled.h3`
  margin: 0; font-size: clamp(1.1rem, 2vw, 1.35rem); color: var(--fg);
  font-weight: 700;
`

const Authors = styled.div`
  color: var(--muted); font-size: 0.95rem;
`

const Meta = styled.div`
  color: var(--muted); font-size: 0.95rem;
`

const Badges = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;
`

const Award = styled.div`
  font-size: 12px; font-weight: 600; color: var(--fg);
  display: inline-flex; align-items: center; gap: 6px;
`

export function PublicationCard({ pub }) {
  const thumb = pub.thumb || '/sea.PNG'
  const links = Array.isArray(pub.links) ? pub.links : []

  return (
    <Row>
      <Thumb>{thumb ? <img src={thumb} alt={pub.title} /> : null}</Thumb>
      <Content>
        {pub.award && (
          <Award>🏆 {pub.award}</Award>
        )}
        <TopLine>
          <Title>{pub.title}</Title>
        </TopLine>
        {pub.authors && <Authors>{pub.authors}</Authors>}
        <Meta>{pub.venue}{pub.year ? ` ${pub.year}` : ''}{pub.volume ? `, ${pub.volume}` : ''}</Meta>
        {links.length > 0 && (
          <Badges>
            {links.map(l => (
              <Badge key={l.label} as="a" href={l.href} tone={l.tone} variant={l.variant} target="_blank" rel="noreferrer">
                {l.label}
              </Badge>
            ))}
          </Badges>
        )}
      </Content>
    </Row>
  )
}
