import styled from 'styled-components'
import { publications } from '../data.js'
import { PublicationCard } from './PublicationCard.jsx'

const Section = styled.section`
  padding: 64px 0;
  position: relative;
`

const SectionHeader = styled.div`
  margin-bottom: 32px;
  text-align: left;
  
  h2 { 
    font-family: var(--heading-font);
    margin: 0; 
    font-size: clamp(2rem, 4vw, 3rem);
  }
`

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 36px;
`

const Row = styled.li`
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 3fr; /* thumbnail >= 1/4 */
  gap: 24px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: minmax(200px, 1fr) 2fr; }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  overflow: hidden;
  background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Content = styled.div`
  display: grid;
  gap: 6px;
`

const TopLine = styled.div`
  display: flex; align-items: center; gap: 10px;
`

const Dot = styled.span`
  width: 10px; height: 10px; border-radius: 50%; display: inline-block;
  background: #f59e0b; /* warm orange like example */
  flex: 0 0 10px;
`

const Award = styled.div`
  font-size: 12px; font-weight: 600; color: var(--fg);
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 8px; border: 1px solid var(--border); border-radius: 999px;
  background: transparent;
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

const Badge = styled.a`
  font-size: 11px; font-weight: 600; line-height: 1;
  padding: 6px 10px; border-radius: 999px; text-decoration: none;
  color: #111; background: #eee; border: 1px solid var(--border);
`

function badgeStyle(label) {
  const map = {
    DOI: { color: '#fff', bg: '#3b82f6' },
    PDF: { color: '#fff', bg: '#ef4444' },
    BibTeX: { color: '#fff', bg: '#22c55e' },
    Web: { color: '#111', bg: '#fde68a' },
    Demo: { color: '#111', bg: '#fde68a' },
    arXiv: { color: '#111', bg: '#fde68a' },
    GitHub: { color: '#111', bg: '#fbbf24' },
    Link: { color: '#111', bg: '#e5e7eb' },
  }
  return map[label] || map['Link']
}

export function PublicationsSection({ maxWidth: Max }) {
  if (!publications?.length) return null

  return (
    <Section id="publications">
      <Max>
        <SectionHeader>
          <h2>Publications</h2>
        </SectionHeader>
        <List>
          {publications.map(p => (
            <PublicationCard key={p.id || p.title} pub={p} />
          ))}
        </List>
      </Max>
    </Section>
  )
}
