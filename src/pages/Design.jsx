import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { designs } from '../data/designs.js'

const Section = styled.section`
  padding: clamp(64px, 9vw, 112px) 0 96px;
  min-height: calc(100vh - 72px);
  @media (max-width: 640px) { padding: 60px 0; }
`

const Header = styled.header`
  margin-bottom: clamp(48px, 7vw, 80px);
  max-width: 560px;
  @media (max-width: 640px) { margin-bottom: 40px; }
`

const Title = styled.h1`
  margin-bottom: 12px;
  font-size: clamp(2.25rem, 5vw, 4rem);
  font-weight: 600;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--muted);
  margin: 0;
  line-height: 1.7;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  column-gap: 20px;
  row-gap: 40px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover { text-decoration: none; }
`

const ImageWrap = styled.div`
  overflow: hidden;
  background: var(--surface);
  img {
    width: 100%;
    display: block;
    object-fit: contain;
  }
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
  overflow: hidden;
  background: #087cff;
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

const showVisitorGlobe = false

export default function Design() {
  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            <Title>Design</Title>
            <Subtitle>Design work and visual artifacts.</Subtitle>
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
            {designs.map(item => (
              <Card
                as={Link}
                key={item.id}
                to={`/design/${item.id}`}
                aria-label={`Open ${item.title}`}
              >
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
    </Page>
  )
}
