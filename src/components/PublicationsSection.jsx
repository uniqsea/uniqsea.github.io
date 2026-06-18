import styled from 'styled-components'
import { publications, publicationsHeaderNoteHtml } from '../data.js'
import { PublicationCard } from './PublicationCard.jsx'

const Section = styled.section`
  padding: 64px 0;
  position: relative;
`

const SectionHeader = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  
  h2 { 
    font-family: var(--heading-font);
    margin: 0; 
    font-size: clamp(2rem, 4vw, 3rem);
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`

const HeaderNote = styled.div`
  font-family: var(--heading-font);
  color: var(--muted);
  font-size: 0.9rem;
  white-space: nowrap;
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
  border-radius: 12px;
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


export function PublicationsSection({ maxWidth: Max }) {
  if (!publications?.length) return null

  return (
    <Section id="publications">
      <Max>
        <SectionHeader>
          <h2>Publications</h2>
          {publicationsHeaderNoteHtml ? (
            <HeaderNote dangerouslySetInnerHTML={{ __html: publicationsHeaderNoteHtml }} />
          ) : null}
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
