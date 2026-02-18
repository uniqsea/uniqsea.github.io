import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getProjectPath } from '../utils/slug.js'
import { Badge } from './Badge.jsx'

const Wrap = styled.article`
  display: grid;
  gap: 16px;
  height: 100%;
`

const Cover = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10; /* keep consistent 16:10 cover */
  border-radius: 18px;
  overflow: hidden;
  background: var(--bg-alt);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--fg);
  font-weight: 800;
  line-height: 1.3;
  word-break: break-word;
  min-width: 0;
`

const Desc = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
  font-size: 1rem;
  max-width: 60ch;
`

const Meta = styled.div`
  margin-top: 8px;
  color: var(--muted);
  font-weight: 600;
  font-size: 0.95rem;

  .dot {
    margin: 0 8px;
  }
`

function getClickConfig(project) {
  const clickType = project.clickType || 'markdown'

  if (clickType === 'none') {
    return { type: 'none', to: null, href: null }
  }

  if (clickType === 'external' && project.externalUrl) {
    return { type: 'external', to: null, href: project.externalUrl }
  }

  return { type: 'markdown', to: getProjectPath(project), href: null }
}

export function ProjectCard({ project }) {
  const cover = project.thumb || project.cover || '/sea.png'
  const label = project.label || (project.status ? project.status : null)
  const { type, to, href } = getClickConfig(project)

  const WrapperComponent = ({ children }) => {
    if (type === 'none') return children
    if (type === 'external') {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {children}
        </a>
      )
    }

    return (
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    )
  }

  return (
    <Wrap>
      <WrapperComponent>
        <Cover>{cover && <img src={cover} alt={project.title} />}</Cover>
      </WrapperComponent>
      <div>
        <TitleRow>
          <WrapperComponent>
            <Title>{project.title}</Title>
          </WrapperComponent>
          {label && <Badge variant="outline">{label}</Badge>}
        </TitleRow>
        {project.summary && <Desc>{project.summary}</Desc>}
        {(project.org || project.year) && (
          <Meta>
            {project.org && <span>{project.org}</span>}
            {project.org && project.year && <span className="dot">·</span>}
            {project.year && <span>{project.year}</span>}
          </Meta>
        )}
      </div>
    </Wrap>
  )
}
