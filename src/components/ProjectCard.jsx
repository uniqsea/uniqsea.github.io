import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getProjectPath } from '../utils/slug.js'
import { Badge } from './Badge.jsx'

const Wrap = styled.article`
  display: grid; gap: 16px; height: 100%;
`

const Cover = styled.div`
  width: 100%; height: 180px; border-radius: 18px; overflow: hidden;
  background: var(--bg-alt);
  position: relative;
  img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
  &:hover img { transform: scale(1.03); }
  @media (max-width: 1024px) { height: 160px; }
  @media (max-width: 700px) { height: 140px; }
`

const TitleRow = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
`

const Title = styled.h3`
  margin: 0; font-size: clamp(1.1rem, 2vw, 1.4rem); color: var(--fg); font-weight: 800;
  line-height: 1.3; word-break: break-word; min-width: 0;
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
