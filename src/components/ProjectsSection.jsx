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
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* prevent long content from forcing track width */
  align-items: start;
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
