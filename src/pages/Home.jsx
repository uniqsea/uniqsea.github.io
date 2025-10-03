import { NavBar } from '../components/NavBar.jsx'
import { HeroSection } from '../components/HeroSection.jsx'
import { PublicationsSection } from '../components/PublicationsSection.jsx'
import { ProjectsSection } from '../components/ProjectsSection.jsx'
import { Page, Max as MaxContainer } from '../components/Layout.jsx'
import styled from 'styled-components'

const Max = MaxContainer

export default function Home() {
  return (
    <Page>
      <NavBar />
      <HeroSection maxWidth={Max} />
      <PublicationsSection maxWidth={Max} />
      <ProjectsSection maxWidth={Max} />
      <Footer>
        <Max>
        <div>© {new Date().getFullYear()} {site?.name || 'uniqsea'}</div>
        <div>{domainNote}</div>
        </Max>
      </Footer>
    </Page>
  )
}

// Local lightweight footer with domain note
import { site } from '../data.js'
const domainNote = site.domainNote
const Footer = styled.footer`
  padding: 60px 0 100px; 
  text-align: center; 
  font-size: 14px; 
  color: var(--muted);
  border-top: 1px solid var(--border);
`
