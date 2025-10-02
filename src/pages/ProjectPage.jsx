import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { projects } from '../data.js'
import { slugify } from '../utils/slug.js'
import { Badge } from '../components/Badge.jsx'

const Header = styled.header`
  padding: 48px 0 24px;
`

const Title = styled.h1`
  margin: 0 0 8px; font-size: clamp(2rem, 4vw, 3rem);
`

const Meta = styled.div`
  color: var(--muted); font-size: 0.95rem; display: flex; gap: 10px; flex-wrap: wrap;
`

const Cover = styled.div`
  width: 100%; aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Body = styled.section`
  display: grid; gap: 16px; padding: 28px 0 80px;
`

const Row = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
`

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(p => (p.slug || slugify(p.title)) === slug)

  return (
    <Page>
      <NavBar />
      <Max>
        {!project ? (
          <Header>
            <Title>Project Not Found</Title>
            <Meta><Link to="/projects">← Back to Projects</Link></Meta>
          </Header>
        ) : (
          <>
            <Header>
              <Title>{project.title}</Title>
              <Meta>
                {project.org && <span>{project.org}</span>}
                {project.year && <span>· {project.year}</span>}
                {project.status && <Badge variant="outline">{project.status}</Badge>}
              </Meta>
            </Header>
            <Cover>{(project.cover || project.thumb) && <img src={project.cover || project.thumb} alt={project.title} />}</Cover>
            <Body>
              {project.summary && <p>{project.summary}</p>}
              {project.impact && <p><strong>Impact:</strong> {project.impact}</p>}
              {Array.isArray(project.stack) && project.stack.length > 0 && (
                <Row>
                  {project.stack.map(tech => (<Badge key={tech}>{tech}</Badge>))}
                </Row>
              )}
              {Array.isArray(project.links) && project.links.length > 0 && (
                <Row>
                  {project.links.map(link => (
                    <Badge key={link.label} as="a" href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </Badge>
                  ))}
                </Row>
              )}
              <Meta><Link to="/projects">← Back to Projects</Link></Meta>
            </Body>
          </>
        )}
      </Max>
    </Page>
  )
}

