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
  gap: 48px; 
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
