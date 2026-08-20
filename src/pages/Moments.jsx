import styled from 'styled-components'
import { NavBar } from '../components/NavBar.jsx'
import { MasonryGallery } from '../components/MasonryGallery.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { moments } from '../data.js'

const Section = styled.section`
  padding: clamp(64px, 9vw, 112px) 0 96px;
  min-height: calc(100vh - 72px);
  
  @media (max-width: 640px) {
    padding: 60px 0;
  }
`

const Header = styled.header`
  margin-bottom: clamp(48px, 7vw, 80px);
  max-width: 560px;

  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
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

export default function Moments() {
  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            <Title>Moments</Title>
            <Subtitle>Capturing life through my lens.</Subtitle>
          </Header>
          <MasonryGallery photos={moments} />
        </Max>
      </Section>
    </Page>
  )
}
