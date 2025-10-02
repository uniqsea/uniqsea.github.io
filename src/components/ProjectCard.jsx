import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Badge } from './Badge.jsx'
import { getProjectPath } from '../utils/slug.js'

const Wrap = styled.article`
  display: grid; gap: 16px;
`

const Cover = styled.div`
  width: 100%; aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden;
  background: var(--bg-alt);
  position: relative;
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
  &:hover img { transform: scale(1.03); }
`

const TitleRow = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
`

const Title = styled.h3`
  margin: 0; font-size: clamp(1.4rem, 2.2vw, 1.8rem); color: var(--fg); font-weight: 800;
`

const Desc = styled.p`
  margin: 0; color: var(--muted); line-height: 1.8; font-size: 1rem; max-width: 60ch;
`

const Meta = styled.div`
  margin-top: 8px; color: var(--muted); font-weight: 600; font-size: 0.95rem;
  .dot { margin: 0 8px; }
`

export function ProjectCard({ project }) {
  const cover = project.thumb || project.cover || '/sea.PNG'
  const label = project.label || (project.status ? project.status : null)
  const to = getProjectPath(project)
  return (
    <Wrap>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Cover>{cover && <img src={cover} alt={project.title} />}</Cover>
      </Link>
      <div>
        <TitleRow>
          <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title>{project.title}</Title>
          </Link>
          {label && <Badge variant="outline">{label}</Badge>}
        </TitleRow>
        {project.summary && <Desc>{project.summary}</Desc>}
        {(project.org || project.year) && (
          <Meta>
            {project.org && <span>{project.org}</span>}
            {(project.org && project.year) && <span className="dot">·</span>}
            {project.year && <span>{project.year}</span>}
          </Meta>
        )}
      </div>
    </Wrap>
  )
}
