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
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  
  h2 { 
    font-family: var(--heading-font);
    margin: 0; 
    font-size: clamp(2rem, 4vw, 3rem);
  }

`

const HeaderNote = styled.div`
  font-family: var(--heading-font);
  color: var(--muted);
  font-size: 0.85rem;
  line-height: 1.4;
  white-space: nowrap;
`

const List = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
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
