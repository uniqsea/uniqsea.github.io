// Brand & narrative
export const site = {
  name: 'Haiyang Xu',        
  brand: 'uniqsea',          // brand (preferred key)
  domain: 'haiyangxu.me',     // domain
  givenName: 'Haiyang',
  familyName: 'Xu',
  fullName: 'Haiyang Xu',
  preferredName: 'Haiyang',
  tagline: 'CS master’s student at Aarhus University · HCI focus.',
  location: 'Earth · Remote',
  email: 'au777937@uni.au.dk', 
  // blurb: `I am currently a master's student studying Computer Science at Aarhus University, Denmark, focusing on Human-Computer Interaction. I care about how technology feels to use, especially for specific communities. My work turns complex systems into calm, respectful interfaces that support everyday wellbeing.`,
  blurb: `I am currently a Master's student in Computer Science at Aarhus University, specializing in Human-Computer Interaction. 
  My interests lie in how technology can enhance human experiences in everyday life, particularly within certain communities. I am passionate about human-centered design and about creating interfaces that transform technology into creative and meaningful experiences that actively support people's well-being.`,
  cvUrl: '#', // optional: link to CV PDF
  // domainNote: 'uniqsea = unique + sea. Every wave is unique, so are people.'
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
import letsCeramicCover from './assets/projects/ceramic-cover.png'
import EchoMindCover from './assets/projects/echomind-cover.png'

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
    // clickType: 'markdown' | 'external' | 'none'
    // - 'markdown' (default): 点击进入项目详情页并渲染 markdown
    // - 'external': 点击跳转到 externalUrl（新标签页）
    // - 'none': 卡片仅展示信息，不可点击
    clickType: 'markdown',
    // 如果是 external，可以配置 externalUrl
    // externalUrl: 'https://example.com',
    // tags: ['React Native', 'YOLOv8', 'CNN', 'M5Stack', 'Google Maps API'],
    // 只有在这里写链接才会在详情页渲染 Demo / Source Code 徽标
    links: [
      // { label: 'Demo', href: 'https://example.com/demo' },
      // { label: 'Source Code', href: 'https://github.com/...' },
    ],
    notes: `<p style="margin: 0; line-height: 1.8; font-size: 1.15rem; color: var(--fg); text-align: center; font-family: 'Georgia', 'Times New Roman', serif; letter-spacing: 0.01em;">
      This project was completed under the guidance of the late <strong style="font-weight: 600;">Niels Olof Bouvin</strong>, a truly wonderful and kind person, <em style="font-style: italic;">whom we dearly miss</em>.
    </p>`,
  },
  {
    slug: 'lets-ceramic',
    title: "Let's Ceramic",
    summary: 'A playful AR-based ceramic making experience that explores embodied interaction and creative expression.',
    status: 'COURSE PROJECT',
    org: 'Aarhus University',
    year: '2025',
    clickType: 'external',
    externalUrl: 'https://yunhui-song.itch.io/ar-lets-ceramic',
    thumb: letsCeramicCover,
    cover: letsCeramicCover,
    // 可以按需补充 thumb / cover / tags
  },
  {
    slug: 'nobody-wants-to-talk-into-a-void',
    title: 'EchoMind',
    summary: 'An Intelligent Feedback System for Talks and Presentations',
    status: 'COURSE PROJECT',
    org: 'Aarhus University',
    year: '2025',
    clickType: 'external',
    externalUrl: 'https://medium.com/@uniqsea/nobody-wants-to-talk-into-a-void-38253448f0c4',
    // 可以按需补充 thumb / cover / tags
    thumb: EchoMindCover,
    cover: EchoMindCover,
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

// Photography moments
export const moments = [
  // Sample data - replace with your own photos
  // 优先使用本地 image 路径，没有本地路径才用 url（图床）
  {
    id: 'm1',
    image: '/moments/photo1.png',  // 本地路径（优先）
    // url: 'https://your-cdn.com/photo1.jpg',  // 图床 URL（可选，只在没有 image 时使用）
    caption: 'Golden hour at the beach',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm2',
    image: '/moments/photo3.png',
    caption: 'Child riding a bike',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm3',
    image: '/moments/photo2.png',
    caption: 'Plane flying over the ocean',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm4',
    image: '/moments/photo4.png',
    caption: 'Seagulls flying over the church tower',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm5',
    image: '/moments/photo5.png',
    caption: 'Lonely bench in the sun',
    location: 'Deer Park, Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm6',
    image: '/moments/photo6.png',
    caption: 'Balcony in the sun',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm7',
    image: '/moments/photo7.png',
    caption: 'Evening sunset',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm8',
    image: '/moments/photo8.png',
    caption: 'Beautiful seaside buildings',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm9',
    image: '/moments/photo9.png',
    caption: 'Green Watchtower',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm10',
    image: '/moments/photo10.jpg',
    caption: 'Rain hitting the window',
    location: 'Munich, Germany',
    date: '2024-10-13',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
  {
    id: 'm11',
    image: '/moments/photo11.jpg',
    caption: 'Signpost in the mountains',
    location: 'Munich, Germany',
    date: '2024-10-13',
    showInfo: false  // 设为 false 可以隐藏悬浮信息，即使有 caption/location/date
  },
]
