import styled from 'styled-components'
import { NavBar } from '../components/NavBar.jsx'
import { MasonryGallery } from '../components/MasonryGallery.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { moments } from '../data.js'

const Section = styled.section`
  padding: 80px 0;
  min-height: calc(100vh - 72px);
  
  @media (max-width: 640px) {
    padding: 60px 0;
  }
`

const Header = styled.header`
  margin-bottom: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`

const Rule = styled.div`
  width: 36px;
  height: 1px;
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

export default function Moments() {
  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            <Rule />
            <Subtitle>Capturing life through my lens.</Subtitle>
            <Rule />
          </Header>
          <MasonryGallery photos={moments} />
        </Max>
      </Section>
    </Page>
  )
}

