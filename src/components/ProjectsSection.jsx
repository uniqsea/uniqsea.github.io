import styled from 'styled-components'
import { projects } from '../data.js'
import { ProjectCard as ProjectCardView } from './ProjectCard.jsx'

const Section = styled.section`
  padding: 100px 0;
  position: relative;
`

const SectionHeader = styled.div`
  margin-bottom: 48px; 
  text-align: left;
  
  h2 { 
    margin: 0; 
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--fg);
  }
`

const ProjectGrid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* desktop: 3 cols */
  align-items: start;
  /* responsive: tablet = 2 cols, mobile = 1 col */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

// card moved to its own component

export function ProjectsSection({ maxWidth: Max }) {
  return (
    <Section id="projects">
      <Max>
        <SectionHeader>
          <h2>Selected Projects</h2>
        </SectionHeader>
        <ProjectGrid>
          {projects.map(project => (
            <ProjectCardView key={project.title} project={project} />
          ))}
        </ProjectGrid>
      </Max>
    </Section>
  )
}
