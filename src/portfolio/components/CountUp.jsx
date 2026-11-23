// Counts every number inside a string (e.g. "95.83 / 91.25%") up from zero when it comes into view.
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

export default function CountUp({ text, duration = 1100 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [t, setT] = useState(reduce ? 1 : 0)

  useEffect(() => {
    if (!inView || reduce) return undefined
    let raf
    const start = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - start) / duration)
      setT(1 - (1 - k) ** 3)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, duration])

  const out = text.replace(/\d+(\.\d+)?/g, (m) => (parseFloat(m) * t).toFixed((m.split('.')[1] || '').length))
  return <span ref={ref}>{out}</span>
}
