import { useState } from 'react'
import styled from 'styled-components'
import { NavBar } from '../components/NavBar.jsx'
import { Lightbox } from '../components/Lightbox.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { designs } from '../data/designs.js'

const Section = styled.section`
  padding: 80px 0;
  min-height: calc(100vh - 72px);
  @media (max-width: 640px) { padding: 60px 0; }
`

const Header = styled.header`
  margin-bottom: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  @media (max-width: 640px) { margin-bottom: 40px; }
`

const Rule = styled.div`
  width: 36px; height: 1px;
  background: var(--border);
`

const Subtitle = styled.p`
  font-family: 'Georgia', 'Times New Roman', serif;
  font-style: italic;
  font-size: 1.15rem;
  color: var(--muted);
  letter-spacing: 0.02em;
  margin: 0;
  line-height: 1.6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 36px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
`

const ImageWrap = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  img {
    width: 100%;
    display: block;
    object-fit: contain;
    transition: transform 0.4s ease;
  }
  ${Card}:hover & img { transform: scale(1.02); }
`

const CardMeta = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`

const CardTitle = styled.span`
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: 1rem;
  color: var(--fg);
`

const CardSub = styled.span`
  font-size: 0.85rem;
  color: var(--muted);
`

const lightboxPhotos = designs.map(d => ({
  image: d.full,
  clickOriginal: true,
  caption: d.title,
  location: d.subtitle,
}))

export default function Design() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            <Rule />
            <Subtitle>Design work and visual artifacts.</Subtitle>
            <Rule />
          </Header>
          <Grid>
            {designs.map((item, i) => (
              <Card key={item.id} onClick={() => setLightboxIndex(i)}>
                <ImageWrap>
                  <img src={item.image} alt={item.title} />
                </ImageWrap>
                <CardMeta>
                  <CardTitle>{item.title}</CardTitle>
                  <CardSub>{item.subtitle}</CardSub>
                </CardMeta>
              </Card>
            ))}
          </Grid>
        </Max>
      </Section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex(i => Math.min(lightboxPhotos.length - 1, i + 1))}
        />
      )}
    </Page>
  )
}
