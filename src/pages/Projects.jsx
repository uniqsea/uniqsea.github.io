import { NavBar } from '../components/NavBar.jsx'
import { ProjectsSection } from '../components/ProjectsSection.jsx'
import { Page, Max } from '../components/Layout.jsx'

export default function ProjectsPage() {
  return (
    <Page>
      <NavBar />
      <ProjectsSection maxWidth={Max} />
    </Page>
  )
}
