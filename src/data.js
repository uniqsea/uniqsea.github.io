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
  // blurb: `I am currently a master's student studying Computer Science at Aarhus University, Denmark, focusing on Human-Computer Interaction. I care about how technology feels to use, especially for specific communities. My work turns complex systems into calm, respectful interfaces that support everyday wellbeing.`,
  blurb:`I am currently a Master's student in Computer Science at Aarhus University, specializing in Human-Computer Interaction. My interests lie in how technology can enhance human experiences in everyday life, particularly within certain communities. I am passionate about human-centered design and about creating interfaces that transform technology into creative and meaningful experiences that actively support people’s well-being.`,
  cvUrl: '#', // optional: link to CV PDF
  domainNote: 'uniqsea.com = unique + sea. “Haiyang” means sea; every wave is unique, so are people.'
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/uniqsea', icon: 'github' },
  { label: 'Email', href: 'au777937@uni.au.dk', icon: 'email' },
  { label: 'Google Scholar', href: '#', icon: 'scholar' },
  { label: 'ORCID', href: '#', icon: 'orcid' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/haiyang-xu-4b2175338', icon: 'linkedin' },
]

export const projects = [
  {
    slug: 'visionnav',
    title: 'VisionNav',
    subtitle: 'Revolutionizing Walking Experiences with an Intelligent Vibration-Guided Navigation Companion.',
    summary: 'An assistive navigation system integrating IoT and computer vision to deliver real-time obstacle detection, path recognition, and intuitive vibration feedback through wearable M5Stack devices.',
    overview: 'VisionNav transforms smartphone camera input and Google Maps data into clear haptic guidance. Designed for people with visual/hearing impairments and for noisy or visually demanding environments, it provides reliable, safe, and accessible navigation using simple, understandable feedback.',
    features: [
      'Turn-by-turn navigation enhanced with vibration cues',
      'Obstacle detection and avoidance using YOLOv8-based vision models',
      'Path position recognition via a lightweight CNN classifier',
      'Mobile UI for destination search, route view, and QR code sharing',
    ],
    status: 'COURSE PROJECT',
    org: 'Aarhus University',
    year: '2024',
    thumb: '/visionnav-cover.svg',
    cover: '/visionnav-cover.svg',
    bodyPath: '/projects/visionnav.md',
    stack: ['React Native', 'YOLOv8', 'CNN', 'M5Stack', 'Google Maps API'],
    links: [
      { label: 'Demo', href: '#', tone: 'amber' },
      { label: 'Source Code', href: '#', tone: 'gold' }
    ],
  },
]

// Academic publications (sample data; replace with your own)
export const publications = [
  {
    id: 'p1',
    title: 'Demonstration of BIOral: Fabricating Intraoral pH Sensor for Continuous Health Monitoring',
    authors: 'Yijing Jiang, Junzhe Jin, Yunhui Song, Haiyang Xu, and Michael Wessely.',
    venue: 'In Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA \'25)',
    year: '2025',
    thumb: '/bioral-demo-cover.png',
    award: '',
    tags: ['Peer-reviewed', 'HCI'],
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1145/3706599.3721178', tone: 'info' },
      { label: 'PDF', href: 'https://dl.acm.org/doi/10.1145/3706599.3721178', tone: 'danger' },
      // { label: 'BibTeX', href: '#', tone: 'success' },
    ],
  }
]
