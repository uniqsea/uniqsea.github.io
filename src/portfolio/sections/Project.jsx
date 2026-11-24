// One case study: opener, sticky process bar, then its content pages.
import styled from 'styled-components'
import { brandVars } from '../../portfolio-shared/lib/publication.js'
import MagHeartProvider from '../components/MagHeartProvider.jsx'
import StageNav from '../components/StageNav.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import { projectId, pageId } from '../hooks/ids.js'
import ProjectOpener from './ProjectOpener.jsx'
import ContentSection from './ContentSection.jsx'

const Wrap = styled.article`
  padding-bottom: clamp(80px, 10vw, 140px);
`

export default function Project({ project }) {
  const ids = project.pages.map((_, i) => pageId(project, i))
  const active = useActiveSection(ids)
  const activeStage = project.pages[ids.indexOf(active)]?.stage

  /* Each stage jumps to its first page. */
  const targets = {}
  project.pages.forEach((page, i) => { if (!(page.stage in targets)) targets[page.stage] = ids[i] })

  const article = (
    <Wrap style={brandVars(project)}>
      <ProjectOpener id={projectId(project)} project={project} />
      <StageNav project={project} targets={targets} activeStage={activeStage} />
      {project.pages.map((page, i) => <ContentSection key={ids[i]} id={ids[i]} page={page} index={i} />)}
    </Wrap>
  )
  return project.key === 'magheart' ? <MagHeartProvider>{article}</MagHeartProvider> : article
}
