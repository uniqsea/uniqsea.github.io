import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { projects } from '../data.js'
import { slugify } from '../utils/slug.js'
import { Badge } from '../components/Badge.jsx'
import ReactMarkdown from 'react-markdown'

const Header = styled.header`
  padding: 56px 0 24px; text-align: center;
`

const Title = styled.h1`
  margin: 0 0 8px; font-size: clamp(2rem, 5vw, 3.2rem);
`

const SubTitle = styled.p`
  margin: 0; color: var(--muted); font-size: 1.1rem;
`

const Meta = styled.div`
  color: var(--muted); font-size: 0.95rem; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
  margin-top: 8px;
`

const Cover = styled.div`
  width: 100%; aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Body = styled.section`
  display: grid; gap: 16px; padding: 28px 0 80px; max-width: 900px; margin: 0 auto;
  .md p { line-height: 1.9; color: var(--muted); }
  .md h2, .md h3 { margin: 22px 0 8px; }
  .md ul { padding-left: 1.2em; }
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
              {project.subtitle && <SubTitle>{project.subtitle}</SubTitle>}
              <Meta>
                {project.org && <span>{project.org}</span>}
                {project.year && <span>· {project.year}</span>}
                {project.status && <Badge variant="outline">{project.status}</Badge>}
              </Meta>
            </Header>
            <Cover>{(project.cover || project.thumb) && <img src={project.cover || project.thumb} alt={project.title} />}</Cover>
            <Body>
              {project.overview && (
                <section>
                  <h2 style={{ margin: '24px 0 8px' }}>Overview</h2>
                  <p>{project.overview}</p>
                </section>
              )}
              <MarkdownSection project={project} />
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

function MarkdownSection({ project }) {
  const [content, setContent] = useState('')
  useEffect(() => {
    let active = true
    async function load() {
      try {
        if (project?.bodyPath) {
          const res = await fetch(project.bodyPath)
          const text = await res.text()
          if (active) setContent(text)
        } else if (project?.body) {
          setContent(project.body)
        }
      } catch (e) {
        // ignore
      }
    }
    load()
    return () => { active = false }
  }, [project?.bodyPath])

  if (!content) return null
  return (
    <section className="md">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  )
}
