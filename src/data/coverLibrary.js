import spring from '../assets/covers/universal/cover-01-spring.webp'
import harvest from '../assets/covers/universal/cover-02-harvest.webp'
import lake from '../assets/covers/universal/cover-03-lake.webp'
import violet from '../assets/covers/universal/cover-04-violet.webp'
import coral from '../assets/covers/universal/cover-05-coral.webp'
import forest from '../assets/covers/universal/cover-06-forest.webp'
import clouds from '../assets/covers/universal/cover-07-clouds.webp'
import terracotta from '../assets/covers/universal/cover-08-terracotta.webp'

export const universalCovers = [
  { id: 'spring', src: spring, textColor: '#fff8e8', fallback: '#285735' },
  { id: 'harvest', src: harvest, textColor: '#fff8e8', fallback: '#174b34' },
  { id: 'lake', src: lake, textColor: '#fffaf0', fallback: '#174b88' },
  { id: 'violet', src: violet, textColor: '#fff4e8', fallback: '#39234f' },
  { id: 'coral', src: coral, textColor: '#27204f', fallback: '#ef5d58' },
  { id: 'forest', src: forest, textColor: '#fff8e8', fallback: '#123f2f' },
  { id: 'clouds', src: clouds, textColor: '#fffaf0', fallback: '#6f8792' },
  { id: 'terracotta', src: terracotta, textColor: '#fff8e8', fallback: '#641c2a' },
]

export function getUniversalCover(title, preferredId) {
  if (preferredId) {
    const preferred = universalCovers.find(cover => cover.id === preferredId)
    if (preferred) return preferred
  }

  const hash = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return universalCovers[hash % universalCovers.length]
}
