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
  padding: 48px 0 32px;
  text-align: center;
`

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2.4rem, 5.5vw, 3.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--fg);
  line-height: 1.1;
`

const SubTitle = styled.p`
  margin: 0 auto 16px;
  color: var(--muted);
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  line-height: 1.6;
  text-align: center;
  max-width: 900px;
  font-weight: 400;
  padding: 0 16px;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  margin-top: 4px;
  padding: 0 16px;
`

// 2. Cover Section - 独立宽度，始终居中
const CoverSection = styled.section`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 40px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-alt);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 12px 32px rgba(0, 0, 0, 0.08);
  }

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
  margin: 0 auto 40px;
  padding: 0 clamp(12px, 3vw, 24px);

  h2 {
    margin: 36px 0 12px;
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--fg);
    line-height: 1.3;
    
    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    margin: 24px 0 10px;
    font-size: clamp(1.15rem, 3vw, 1.5rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--fg);
    line-height: 1.4;
  }

  p {
    margin: 0 0 16px;
    line-height: 1.8;
    color: var(--fg);
    max-width: none;
    font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  }

  ul, ol {
    margin: 0 0 16px;
    padding-left: 1.75em;
    line-height: 1.8;
    color: var(--fg);
  }

  li {
    margin-bottom: 8px;
    color: var(--fg);
    font-size: 1.05rem;
  }

  a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
    transition: all 0.2s ease;
    
    &:hover {
      text-decoration-thickness: 2px;
      opacity: 0.8;
    }
  }

  code {
    padding: 3px 8px;
    background: var(--bg-alt);
    border-radius: 6px;
    font-size: 0.9em;
    font-family: 'Monaco', 'Menlo', monospace;
    border: 1px solid var(--border);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    margin: 20px 0;
  }

  hr {
    margin: 32px 0;
    border: none;
    border-top: 1px solid var(--border);
  }
`

// 4. Notes Section - 只负责布局，样式由 data.js 中的 HTML 控制
const NotesSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 40px;
  padding: 0 12px;

  p {
    max-width: none; /* 覆盖全局 65ch 限制，确保铺满 */
  }
`

// 5. Tags Section - 独立宽度
const TagsSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 24px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 12px;
`

// 6. Links Section - 独立宽度
const LinksSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 40px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 12px;
`

// 7. Back Link
const BackSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 12px 64px;
  border-top: 1px solid var(--border);

  a {
    display: inline-flex;
    align-items: center;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      color: var(--fg);
      transform: translateX(-2px);
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
