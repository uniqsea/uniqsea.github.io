import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { VisitorGlobe } from '../features/visitor-globe/VisitorGlobe.jsx'

const Section = styled.section`
  padding: 64px 0;
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  @media (max-width: 640px) { padding: 40px 0; }
`

const Back = styled(Link)`
  align-self: flex-start;
  font-size: 0.9rem;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 32px;
  &:hover { color: var(--fg); }
`

const About = styled.div`
  margin-top: 64px;
  max-width: 640px;
  align-self: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    font-family: var(--heading-font);
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0;
    color: var(--fg);
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: var(--muted);
    font-size: 1rem;
  }

  small {
    color: var(--muted);
    opacity: 0.8;
    font-size: 0.85rem;
  }
`

export default function VisitorGlobePage() {
  return (
    <Page>
      <NavBar />
      <Section>
        <Max>
          <Back to="/design">← Back to design</Back>
          <VisitorGlobe />
          <About>
            <h1>unique</h1>
            <p>
              The Earth is drawn entirely in light — tens of thousands of
              particles tracing every coastline. This piece resolves your
              approximate location from your IP address, then turns the globe to
              your country and lights its borders aglow. Refresh from another
              network and it spins somewhere new.
            </p>
            <small>
              Country-level only, resolved transiently and never stored. Drag to
              spin, scroll to zoom. Built with three.js.
            </small>
          </About>
        </Max>
      </Section>
    </Page>
  )
}
