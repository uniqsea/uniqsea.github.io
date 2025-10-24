// Brand & narrative
export const site = {
  name: 'Haiyang Xu',        
  brand: 'uniqsea',          // brand (preferred key)
  domain: 'uniqsea.com',     // domain
  givenName: 'Haiyang',
  familyName: 'Xu',
  fullName: 'Haiyang Xu',
  preferredName: 'Haiyang',
  tagline: 'CS master’s student at Aarhus University · HCI focus.',
  location: 'Earth · Remote',
  email: 'au777937@uni.au.dk', 
  // blurb: `I am currently a master's student studying Computer Science at Aarhus University, Denmark, focusing on Human-Computer Interaction. I care about how technology feels to use, especially for specific communities. My work turns complex systems into calm, respectful interfaces that support everyday wellbeing.`,
  blurb:`I am currently a Master's student in Computer Science at Aarhus University, specializing in Human-Computer Interaction. My interests lie in how technology can enhance human experiences in everyday life, particularly within certain communities. I am passionate about human-centered design and about creating interfaces that transform technology into creative and meaningful experiences that actively support people’s well-being.`,
  cvUrl: '#', // optional: link to CV PDF
  domainNote: 'uniqsea = unique + sea. Every wave is unique, so are people.'
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/uniqsea', icon: 'github' },
  { label: 'Email', href: 'mailto:au777937@uni.au.dk', icon: 'email' },
  { label: 'Google Scholar', href: '#', icon: 'scholar' },
  { label: 'ORCID', href: '#', icon: 'orcid' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/haiyang-xu-4b2175338', icon: 'linkedin' },
]

import visionnavCover from './assets/projects/visionnav-cover.svg'
import bioralCover from './assets/publication/bioral-demo-cover.png'

export const projects = [
  {
    slug: 'visionnav',
    title: 'VisionNav',
    subtitle: 'Revolutionizing Walking Experiences with an Intelligent Vibration-Guided Navigation Companion',
    summary: 'An assistive navigation system integrating IoT and computer vision to deliver real-time obstacle detection, path recognition, and intuitive vibration feedback through wearable M5Stack devices.',
    status: 'COURSE PROJECT',
    org: 'Aarhus University',
    year: '2024',
    thumb: visionnavCover,
    cover: visionnavCover,
    bodyPath: '/projects/visionnav.md',
    tags: ['React Native', 'YOLOv8', 'CNN', 'M5Stack', 'Google Maps API'],
    // 只有在这里写链接才会在详情页渲染 Demo / Source Code 徽标
    links: [
      // { label: 'Demo', href: 'https://example.com/demo' },
      // { label: 'Source Code', href: 'https://github.com/...' },
    ],
    notes: '<p>This project was completed under the guidance of <strong>Niels Olof Bouvin</strong>, a truly wonderful and kind person, <em>in memory of him</em>.</p>',
  },
]

// Academic publications (sample data; replace with your own)
export const publications = [
  {
    id: 'p1',
    title: 'Demonstration of BIOral: Fabricating Intraoral pH Sensor for Continuous Health Monitoring',
    authorsHtml: 'Yijing Jiang, Junzhe Jin, Yunhui Song, <strong><u>Haiyang Xu</u></strong>, and Michael Wessely.',
    venueHtml: "In Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (<strong>CHI EA '25</strong>)",
    year: '2025',
    thumb: bioralCover,
    award: '',
    tags: ['Demo', 'HCI'],
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1145/3706599.3721178', tone: 'info' },
      { label: 'PDF', href: '/publication/3706599.3721178.pdf', tone: 'danger' },
      // { label: 'BibTeX', href: '#', tone: 'success' },
    ],
  }
]
