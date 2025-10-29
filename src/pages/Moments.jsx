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
  
  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`

const Title = styled.h1`
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--fg), var(--muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

export default function Moments() {
  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Header>
            {/* <Title>Moments</Title> */}
            <Subtitle>
              Capturing life through my lens.
            </Subtitle>
          </Header>
          <MasonryGallery photos={moments} />
        </Max>
      </Section>
    </Page>
  )
}

