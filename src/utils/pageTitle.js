import { site, projects } from '../data.js'
import { designs } from '../data/designs.js'
import { slugify } from './slug.js'

const sectionLabels = {
  projects: 'Projects',
  publications: 'Publications',
  moments: 'Moments',
  design: 'Design',
}

function getDetailLabel(section, id) {
  if (section === 'projects') {
    return projects.find(p => (p.slug || slugify(p.title)) === id)?.title
  }
  if (section === 'design') {
    if (id === 'visitor-globe') return 'Visitor Globe'
    return designs.find(d => d.id === id)?.title
  }
  return undefined
}

// Home and unknown routes (which render Home) show the name on its own.
export function getPageTitle(pathname) {
  const [section, id] = pathname.split('/').filter(Boolean)
  const label = id ? getDetailLabel(section, id) : sectionLabels[section]
  return label ? `${label} - ${site.fullName}` : site.fullName
}
