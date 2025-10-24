import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar.jsx'
import { Page, Max } from '../components/Layout.jsx'
import { projects } from '../data.js'
import { slugify } from '../utils/slug.js'
import { Badge } from '../components/Badge.jsx'
import ReactMarkdown from 'react-markdown'

// 1. Header Section - 居中，无宽度限制
const Header = styled.header`
  padding: 64px 0 40px;
  text-align: center;
`

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2.2rem, 5.2vw, 3.4rem);
  color: var(--fg);
`

const SubTitle = styled.p`
  margin: 0 auto 8px;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.7;
  text-align: center;
  max-width: 800px;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.95rem;
`

// 2. Cover Section - 独立宽度，始终居中
const CoverSection = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 48px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-alt);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

// 3. Content Section - 与 Cover 对齐，内部使用响应式左右边距
const ContentSection = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 48px;
  padding: 0 12px;

  h2 {
    margin: 32px 0 12px;
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    color: var(--fg);
  }

  h3 {
    margin: 24px 0 10px;
    font-size: clamp(1.15rem, 2.2vw, 1.35rem);
    color: var(--fg);
  }

  p {
    margin: 0 0 16px;
    line-height: 1.9;
    color: var(--fg);
    max-width: none; /* override global 65ch */
  }

  ul, ol {
    margin: 0 0 16px;
    padding-left: 1.5em;
    line-height: 1.9;
    color: var(--fg);
  }

  li {
    margin-bottom: 8px;
    color: var(--fg);
  }

  a {
    color: var(--fg);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  code {
    padding: 2px 6px;
    background: var(--bg-alt);
    border-radius: 4px;
    font-size: 0.9em;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

// 4. Notes Section - 独立宽度和样式
const NotesSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 48px;

  p {
    margin: 0;
    line-height: 1.8;
    color: var(--fg);
    max-width: none; /* override global 65ch to fill available width */
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }
`

// 5. Tags Section - 独立宽度
const TagsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

// 6. Links Section - 独立宽度
const LinksSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 48px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

// 7. Back Link
const BackSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 96px;

  a {
    color: var(--fg);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

// Not Found
const NotFound = styled.div`
  padding: 64px 0;
  text-align: center;

  h1 {
    margin: 0 0 16px;
    font-size: 2rem;
  }

  a {
    color: var(--fg);
    text-decoration: underline;
  }
`

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(p => (p.slug || slugify(p.title)) === slug)

  if (!project) {
    return (
      <Page>
        <NavBar />
        <Max>
          <NotFound>
            <h1>Project Not Found</h1>
            <Link to="/projects">← Back to Projects</Link>
          </NotFound>
        </Max>
      </Page>
    )
  }

  return (
    <Page>
      <NavBar />
      <Max>
        {/* 1. Header Section */}
        <Header>
          <Title>{project.title}</Title>
          {project.subtitle && <SubTitle>{project.subtitle}</SubTitle>}
          <Meta>
            {project.org && <span>{project.org}</span>}
            {project.org && project.year && <span>·</span>}
            {project.year && <span>{project.year}</span>}
            {project.status && <Badge variant="outline">{project.status}</Badge>}
          </Meta>
        </Header>

        {/* 2. Cover Section */}
        {(project.cover || project.thumb) && (
          <CoverSection>
            <img src={project.cover || project.thumb} alt={project.title} />
          </CoverSection>
        )}

        {/* 3. Content Section (Markdown) */}
        <MarkdownContent project={project} />

        {/* 4. Notes Section */}
        {project.notes && (
          <NotesSection dangerouslySetInnerHTML={{ __html: project.notes }} />
        )}

        {/* 5. Tags Section */}
        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <TagsSection>
            {project.tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </TagsSection>
        )}

        {/* 6. Links Section */}
        {Array.isArray(project.links) && project.links.length > 0 && (
          <LinksSection>
            {project.links.map(link => (
              <Badge key={link.label} as="a" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </Badge>
            ))}
          </LinksSection>
        )}

        {/* 7. Back Link */}
        <BackSection>
          <Link to="/projects">← Back to Projects</Link>
        </BackSection>
      </Max>
    </Page>
  )
}

function MarkdownContent({ project }) {
  const [content, setContent] = useState('')

  useEffect(() => {
    let active = true

    async function loadContent() {
      try {
        // Try loading from src/content/projects/*.md
        const modules = import.meta.glob('../content/projects/*.md', {
          query: '?raw',
          import: 'default',
          eager: true
        })
        
        const key = Object.keys(modules).find(k => k.endsWith(`/${project.slug}.md`))
        
        if (key) {
          if (active) setContent(modules[key])
          return
        }

        // Fallback: fetch from public
        if (project?.bodyPath) {
          const res = await fetch(project.bodyPath)
          const text = await res.text()
          if (active) setContent(text)
          return
        }

        // Fallback: inline body
        if (project?.body) {
          if (active) setContent(project.body)
        }
      } catch (error) {
        console.error('Failed to load markdown content:', error)
      }
    }

    loadContent()
    return () => { active = false }
  }, [project?.slug, project?.bodyPath, project?.body])

  if (!content) return null

  return (
    <ContentSection>
      <ReactMarkdown>{content}</ReactMarkdown>
    </ContentSection>
  )
}
