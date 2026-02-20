import bioralCover from '../assets/publication/bioral-demo-cover.png'
import magheartCover from '../assets/publication/magheart-cover.png'

export const publicationsHeaderNoteHtml = '<sup>*</sup> Equal Contribution'

export const publications = [
  {
    id: 'p2',
    title: 'MagHeart: Exploring Playful Avatar Co-Creation and Shared Heartbeats for Icebreaking in Hybrid Meetings',
    authorsHtml: 'Black Sun<sup>*</sup>, <strong><u>Haiyang Xu</u></strong><sup>*</sup>, Ge Kacy Fu, Liyue Da, and Eve Hoggan.',
    venueHtml: "In Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (<strong>CHI EA '26</strong>)",
    year: '2026',
    thumb: magheartCover,
    award: '',
    tags: ['Poster', 'HCI'],
    links: [
      // { label: 'DOI', href: 'https://doi.org/10.1145/3706599.3721178', tone: 'info' },
      // { label: 'PDF', href: '/publication/3706599.3721178.pdf', tone: 'danger' },
      // { label: 'BibTeX', href: '#', tone: 'success' },
    ],
  },
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
  },
]
