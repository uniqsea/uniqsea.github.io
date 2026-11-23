// Scroll-spy: which of the given element ids sits in the reading band of the viewport.
import { useEffect, useState } from 'react'

export default function useActiveSection(ids, band = '-40% 0px -55% 0px') {
  const [active, setActive] = useState(null)
  const key = ids.join('|')
  useEffect(() => {
    const els = key.split('|').map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: band },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key, band])
  return active
}
