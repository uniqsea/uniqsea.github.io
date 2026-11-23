// Further publications (by id from src/data/publications.js) and smaller projects.

export const moreWork = {
  pubIds: ['p5', 'p1'],
  /* Thumbnails (file names in ../assets), keyed by publication id. */
  pubImages: { p5: 'mw-capcell.webp', p1: 'mw-bioral.webp' },
  projects: [
    { year: '2026', title: 'ContextLens', image: 'mw-contextlens.svg', fit: 'contain', text: 'A general-purpose agent with long-term memory that makes the context and memories behind every turn visible, editable, and traceable · Personal project', links: [{ label: 'GitHub', href: 'https://github.com/uniqsea/ContextLens' }] },
    { year: '2025', title: "Let's Ceramic", image: 'mw-ceramic.jpg', text: 'A playful AR-based ceramic making game exploring embodied interaction and creative expression · Course project', links: [{ label: 'Play', href: 'https://yunhui-song.itch.io/ar-lets-ceramic' }] },
    { year: '2024', title: 'VisionNav', image: 'mw-visionnav.jpg', text: 'An assistive navigation system integrating IoT and computer vision, with vibration feedback through wearable devices · Course project', links: [{ label: 'Project', href: 'https://haiyangxu.me/projects/visionnav' }] },
  ],
}
