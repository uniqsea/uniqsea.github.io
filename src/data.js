// Brand & narrative
export const site = {
  name: 'uniqsea',           // brand (legacy key)
  brand: 'uniqsea',          // brand (preferred key)
  domain: 'uniqsea.com',     // domain
  givenName: 'Haiyang',
  familyName: 'Xu',
  fullName: 'Haiyang Xu',
  preferredName: 'Haiyang',
  tagline: 'CS master’s student at Aarhus University · HCI focus.',
  location: 'Earth · Remote',
  email: 'au777937@uni.au.dk', // update your real email
  blurb: `I study Human–Computer Interaction at Aarhus University. I care about how technology feels to use, especially for specific communities. My work turns complex systems into calm, respectful interfaces that support everyday wellbeing.`,
  cvUrl: '#', // optional: link to CV PDF
  domainNote: 'uniqsea.com = unique + sea. “Haiyang” means sea; every wave is unique, so are people.'
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/uniqsea', icon: 'github' },
  { label: 'Email', href: 'mailto:au777937@uni.au.dk', icon: 'email' },
  { label: 'Google Scholar', href: '#', icon: 'scholar' },
  { label: 'ORCID', href: '#', icon: 'orcid' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/haiyang-xu-4b2175338', icon: 'linkedin' },
]

export const projects = [
  {
    title: 'Mindful Check-In',
    summary: 'A gentle mood tracking interface designed for users with anxiety, featuring customizable prompts and privacy-first data storage.',
    role: 'Research · UX Design · Frontend',
    stack: ['React', 'TypeScript', 'LocalStorage', 'Web Accessibility'],
    status: 'CASE STUDY',
    org: 'Personal',
    year: '2025',
    thumb: '/sea.PNG',
    impact: 'Supporting 200+ daily users in mental health journey',
    links: [
      { label: 'Prototype', href: '#', type: 'demo' },
      { label: 'Research Paper', href: '#', type: 'research' }
    ]
  },
  {
    title: 'Adaptive Reading Interface',
    summary: 'Dynamic text rendering system that adjusts typography, spacing, and contrast based on user preferences and environmental context.',
    role: 'Accessibility Research · Frontend Engineering',
    stack: ['Web Components', 'CSS Custom Properties', 'Intersection Observer'],
    status: 'SHIPPED',
    org: 'Research',
    year: '2024',
    thumb: '/sea.PNG',
    impact: 'Improved reading comprehension for 15+ users with dyslexia',
    links: [
      { label: 'Live Demo', href: '#', type: 'demo' },
      { label: 'Source Code', href: '#', type: 'code' }
    ]
  },
  {
    title: 'Community Care Network',
    summary: 'Platform visualizing mutual aid connections in local communities, designed with privacy and consent as core principles.',
    role: 'Participatory Design · System Architecture',
    stack: ['D3.js', 'Node.js', 'Privacy-by-Design'],
    status: 'Research Phase',
    impact: 'Co-designed with 3 community organizations',
    links: [
      { label: 'Design Process', href: '#', type: 'case-study' }
    ]
  }
]

// Academic publications (sample data; replace with your own)
export const publications = [
  {
    id: 'p1',
    title: 'Demonstration of BIOral: Fabricating Intraoral pH Sensor for Continuous Health Monitoring',
    authors: 'Yijing Jiang, Junzhe Jin, Yunhui Song, Haiyang Xu, and Michael Wessely.',
    venue: 'In Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA \'25)',
    doi: '10.1145/3706599.3721178',
  }
]
