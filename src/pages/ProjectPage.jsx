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
  padding: 64px 0 24px; text-align: center;
`

const Title = styled.h1`
  margin: 0 0 12px; font-size: clamp(2.2rem, 5.2vw, 3.4rem);
`

const SubTitle = styled.p`
  margin: 0 auto 10px; color: var(--muted); font-size: 1.1rem; line-height: 1.7;
  max-width: 900px; text-align: center;
`

const Meta = styled.div`
  color: var(--muted); font-size: 0.95rem; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
  margin-top: 6px;
`

const Cover = styled.div`
  width: 100%; aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: var(--bg-alt);
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

const Body = styled.section`
  display: grid; gap: 18px; padding: 32px 0 96px; max-width: 1040px; margin: 0 auto; /* 对称边距更宽 */
  .md { color: var(--fg); overflow-wrap: anywhere; word-break: break-word; }
  .md p { line-height: 1.9; color: var(--fg); max-width: 100%; white-space: normal; }
  .md li { color: var(--fg); }
  .md a { color: var(--fg); text-decoration: underline; text-underline-offset: 3px; }
  .md h2 { margin: 28px 0 10px; font-size: clamp(1.6rem, 3vw, 2.1rem); }
  .md h3 { margin: 20px 0 8px; font-size: clamp(1.15rem, 2.2vw, 1.35rem); }
  .md ul { padding-left: 1.2em; }
`

const Row = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
`

const Notes = styled.div`
  color: var(--fg);
  line-height: 1.8;
`

const BottomBack = styled.div`
  margin-top: 32px;
  text-align: left;
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
              <MarkdownSection project={project} />
              {project.notes && (
                <Notes dangerouslySetInnerHTML={{ __html: project.notes }} />
              )}
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <Row>
                  {project.tags.map(tag => (<Badge key={tag}>{tag}</Badge>))}
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
              <BottomBack>
                <Link to="/projects">← Back to Projects</Link>
              </BottomBack>
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
        // First try to load from src/content by slug via Vite glob
        const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true })
        const key = Object.keys(modules).find(k => k.endsWith(`/${project.slug}.md`))
        if (key) {
          if (active) setContent(modules[key])
          return
        }
        // Fallback: fetch from public if bodyPath is provided
        if (project?.bodyPath) {
          const res = await fetch(project.bodyPath)
          const text = await res.text()
          if (active) setContent(text)
          return
        }
        // Fallback: inline body
        if (project?.body) setContent(project.body)
      } catch (e) {
        // ignore
      }
    }
    load()
    return () => { active = false }
  }, [project?.slug, project?.bodyPath])

  if (!content) return null
  return (
    <section className="md">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  )
}
