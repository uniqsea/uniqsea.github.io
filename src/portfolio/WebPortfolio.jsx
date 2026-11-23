import { useEffect } from 'react'
import { projects as baseProjects } from '../portfolio-shared/content/index.js'
import { useContent, useLang, useT } from './i18n.js'
import { LangProvider } from './components/LangProvider.jsx'
import { WebGlobal, Page } from './theme.js'
import { LightboxProvider } from './components/Lightbox.jsx'
import TopBar from './components/TopBar.jsx'
import useActiveSection from './hooks/useActiveSection.js'
import { projectId, pageId, MORE_ID } from './hooks/ids.js'
import Hero from './sections/Hero.jsx'
import WorkIndex from './sections/WorkIndex.jsx'
import Project from './sections/Project.jsx'
import MoreWork from './sections/MoreWork.jsx'

/*
  Public but unlisted: reachable at /portfolio, linked from nowhere on the site, and noindex.
  Interactive portfolio for the browser. Same content as the PDF deck (portfolio-shared),
  laid out for scrolling: sticky project bar with reading progress, a process bar per project,
  zoomable figures, the project video in place, and figures and numbers that come in as you read.
*/

/* Every element id of a project (opener and pages), so the top bar knows which project is in view. */
const spyIds = baseProjects.flatMap((p) => [projectId(p), ...p.pages.map((_, i) => pageId(p, i))]).concat(MORE_ID)
const ownerOf = (id) => baseProjects.find((p) => id === projectId(p) || id?.startsWith(`${p.key}-`))

/* Keep the page out of search results while it is mounted. */
function useNoIndex() {
  useEffect(() => {
    if (document.querySelector('meta[name="robots"]')) return undefined // already in the prerendered HTML
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
}

export default function WebPortfolio() {
  useNoIndex()
  return <LangProvider><Portfolio /></LangProvider>
}

function Portfolio() {
  const { projects } = useContent()
  const t = useT()
  const { lang } = useLang()
  const active = useActiveSection(spyIds)
  const owner = active === MORE_ID ? MORE_ID : ownerOf(active)?.key
  const items = [
    ...projects.map((p) => ({ id: projectId(p), label: p.name, color: p.brand.deep })),
    { id: MORE_ID, label: t('More work') },
  ]
  return (
    <Page lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <WebGlobal />
      <LightboxProvider>
        <TopBar items={items} active={owner} />
        <Hero />
        <WorkIndex />
        {projects.map((project) => <Project key={project.key} project={project} />)}
        <MoreWork />
      </LightboxProvider>
    </Page>
  )
}
