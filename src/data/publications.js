import bioralCover from '../assets/publication/bioral-demo-cover.png'

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
