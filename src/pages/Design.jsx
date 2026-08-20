import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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

const InteractiveCard = styled(Card)`
  text-decoration: none;
`

const Preview = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #087cff;
  border: 1px solid var(--border);
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;

  svg { width: 100%; height: 100%; color: #fff; }
  .pv-dot { transition: opacity 0.3s ease; }
  ${Card}:hover & svg { transform: scale(1.02); transition: transform 0.4s ease; }
`

const PreviewTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 10px;
`

// A tiny static atlas crop hinting at the live piece, no data needed.
const previewDots = Array.from({ length: 260 }, (_, i) => {
  const a = i * 2.39996
  const rr = Math.sqrt((i + 0.5) / 260)
  const island = i > 185
  return {
    x: (island ? 72 + Math.cos(a) * rr * 11 : 33 + Math.cos(a) * rr * 26).toFixed(1),
    y: (island ? 45 + Math.sin(a) * rr * 15 : 43 + Math.sin(a) * rr * 30).toFixed(1),
  }
})

const lightboxPhotos = designs.map(d => ({
  image: d.full,
  clickOriginal: true,
  caption: d.title,
  location: d.subtitle,
}))

const showVisitorGlobe = false

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
            {showVisitorGlobe && (
              <InteractiveCard as={Link} to="/design/visitor-globe">
                <Preview>
                  <PreviewTag>Interactive</PreviewTag>
                  <svg viewBox="0 0 100 75" aria-hidden="true">
                    <line x1="34" y1="0" x2="34" y2="75" stroke="rgba(255,255,255,.22)" strokeWidth=".45" />
                    <line x1="67" y1="0" x2="67" y2="75" stroke="rgba(255,255,255,.22)" strokeWidth=".45" />
                    <line x1="0" y1="38" x2="100" y2="38" stroke="rgba(255,255,255,.22)" strokeWidth=".45" />
                    {previewDots.map((d, i) => (
                      <circle
                        key={i}
                        className="pv-dot"
                        cx={d.x}
                        cy={d.y}
                        r="0.62"
                        fill="currentColor"
                        opacity="0.92"
                      />
                    ))}
                  </svg>
                </Preview>
                <CardMeta>
                  <CardTitle>unique</CardTitle>
                  <CardSub>Live · your country in dots</CardSub>
                </CardMeta>
              </InteractiveCard>
            )}
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
