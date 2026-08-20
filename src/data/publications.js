import bioralCover from '../assets/publication/bioral-demo-cover.png'
import magheartCover from '../assets/publication/magheart-cover.png'
import teethMarkCover from '../assets/publication/teethmark-cover-v6-cobalt.webp'
import echoMindCover from '../assets/publication/echomind-cover-v2-teal.png'

export const publicationsHeaderNoteHtml = '<sup>*</sup> Equal Contribution'

export const publications = [
  {
    id: 'p4',
    title: 'EchoMind: Augmenting Recorded Presentations with Context-Grounded Conversational Agents and Collective Viewer Signals',
    authorsHtml: '<strong><u>Haiyang Xu</u></strong>, Yunhui Song, Black Sun, and Niklas Elmqvist.',
    venueHtml: '<em>NordiCHI 2026</em>',
    year: '2026',
    thumb: echoMindCover,
    coverTitle: 'EchoMind',
    coverTextColor: '#fff7df',
    award: '',
    tags: ['Paper', 'HCI'],
    links: [],
  },
  {
    id: 'p3',
    title: 'TeethMark: Enabling Tongue-Tooth Interaction with Capacitive Sensing and Electrotactile Feedback using an Intraoral Wearable',
    authorsHtml: 'Yijing Jiang, Yunhui Song, <strong><u>Haiyang Xu</u></strong>, Maria Perdices Segui, Himani Deshpande, and Michael Wessely.',
    venueHtml: '<em>UIST 2026</em>',
    year: '2026',
    thumb: teethMarkCover,
    coverTitle: 'TeethMark',
    coverTextColor: '#fff7df',
    award: '',
    tags: ['Paper', 'HCI'],
    links: [],
  },
  {
    id: 'p5',
    title: 'BIOral CapCell: An Intraoral Solution for Drug Release and Monitoring via Colorimetric Sensing',
    authorsHtml: 'Yijing Jiang, <strong><u>Haiyang Xu</u></strong>, Yunhui Song, Black Sun, Junzhe Jin, and Michael Wessely.',
    venueHtml: '<em>UIST 2026 Poster</em>',
    year: '2026',
    coverId: 'clouds',
    award: '',
    tags: ['Poster', 'HCI'],
    links: [],
  },
  {
    id: 'p2',
    title: 'MagHeart: Exploring Playful Avatar Co-Creation and Shared Heartbeats for Icebreaking in Hybrid Meetings',
    authorsHtml: 'Black Sun<sup>*</sup>, <strong><u>Haiyang Xu</u></strong><sup>*</sup>, Ge Kacy Fu, Liyue Da, and Eve Hoggan.',
    venueHtml: '<em>CHI EA 2026</em>',
    year: '2026',
    thumb: magheartCover,
    award: '',
    tags: ['Poster', 'HCI'],
    links: [
      { label: 'DOI', href: 'https://dl.acm.org/doi/10.1145/3772363.3798371', tone: 'info' },
      { label: 'PDF', href: '/publication/3772363.3798371.pdf', tone: 'pdf' },
      // { label: 'BibTeX', href: '#' },
    ],
  },
  {
    id: 'p1',
    title: 'Demonstration of BIOral: Fabricating Intraoral pH Sensor for Continuous Health Monitoring',
    authorsHtml: 'Yijing Jiang, Junzhe Jin, Yunhui Song, <strong><u>Haiyang Xu</u></strong>, and Michael Wessely.',
    venueHtml: '<em>CHI EA 2025</em>',
    year: '2025',
    thumb: bioralCover,
    award: '',
    tags: ['Demo', 'HCI'],
    links: [
      { label: 'DOI', href: 'https://doi.org/10.1145/3706599.3721178', tone: 'info' },
      { label: 'PDF', href: '/publication/3706599.3721178.pdf', tone: 'pdf' },
      // { label: 'BibTeX', href: '#' },
    ],
  },
]
