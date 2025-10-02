import { NavBar } from '../components/NavBar.jsx'
import { PublicationsSection } from '../components/PublicationsSection.jsx'
import { Page, Max } from '../components/Layout.jsx'

export default function PublicationsPage() {
  return (
    <Page>
      <NavBar />
      <PublicationsSection maxWidth={Max} />
    </Page>
  )
}
