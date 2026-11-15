import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { CoverPlaceholder } from './CoverPlaceholder.jsx'

const Row = styled.li`
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 2.2fr);
  gap: 28px;
  align-items: center;

  & + & {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
  border-radius: 0;
  overflow: hidden;
  background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* hairline edge so light screenshots don't dissolve into the page */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(17, 17, 17, 0.1);
    pointer-events: none;
  }
`

const Content = styled.div`
  display: grid;
  gap: 6px;
  width: calc(100% - clamp(24px, 4vw, 56px));

  @media (max-width: 700px) {
    width: 100%;
  }
`

const TopLine = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
`

const Title = styled.h3`
  margin: 0; font-size: clamp(1.1rem, 2vw, 1.35rem); color: var(--fg);
  font-weight: 700;
  line-height: 1.2;
`

const Authors = styled.div`
  color: var(--muted); font-size: 0.95rem;
`

const Meta = styled.div`
  color: var(--muted);
  font-size: 1rem;
  font-weight: 600;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 16px;
`

const Badges = styled.div`
  display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px;
`

const PublicationLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid var(--fg);
  border-radius: 5px;
  color: var(--fg);
  font-family: var(--heading-font);
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: background-color 0.18s ease-out, color 0.18s ease-out;

  &:hover {
    background: var(--fg);
    color: var(--bg);
    text-decoration: none;
  }
`

const Award = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #886114;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  svg { flex-shrink: 0; }

  :root[data-theme='dark'] & {
    color: #d9b66f;
  }
`

export function PublicationCard({ pub }) {
  const thumb = pub.thumb
  const links = Array.isArray(pub.links) ? pub.links : []
  const authorsText = pub.authors || ''

  return (
    <Row>
      <Thumb>
        {thumb
          ? <img src={thumb} alt={pub.title} />
          : <CoverPlaceholder title={pub.title} coverId={pub.coverId} />}
      </Thumb>
      <Content>
        <TopLine>
          <Title>{pub.title}</Title>
        </TopLine>
        {pub.authorsHtml ? (
          <Authors dangerouslySetInnerHTML={{ __html: pub.authorsHtml }} />
        ) : pub.authorsMd ? (
          <Authors className="md"><ReactMarkdown>{pub.authorsMd}</ReactMarkdown></Authors>
        ) : (
          authorsText && <Authors>{authorsText}</Authors>
        )}
        <MetaRow>
          {pub.venueHtml ? (
            <Meta dangerouslySetInnerHTML={{ __html: pub.venueHtml }} />
          ) : pub.venueMd ? (
            <Meta className="md"><ReactMarkdown>{pub.venueMd}</ReactMarkdown></Meta>
          ) : (
            <Meta>{pub.venue}{pub.year ? ` ${pub.year}` : ''}{pub.volume ? `, ${pub.volume}` : ''}</Meta>
          )}
          {pub.award && (
            <Award><Trophy size={15} strokeWidth={1.75} aria-hidden="true" />{pub.award}</Award>
          )}
        </MetaRow>
        {links.length > 0 && (
          <Badges>
            {links.map(l => (
              <PublicationLink
                key={l.label}
                as={l.internal ? Link : 'a'}
                {...(l.internal
                  ? { to: l.href }
                  : { href: l.href, target: '_blank', rel: 'noreferrer' })}
              >
                {l.label}
              </PublicationLink>
            ))}
          </Badges>
        )}
      </Content>
    </Row>
  )
}
