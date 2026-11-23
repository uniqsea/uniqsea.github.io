// Fades content up as it scrolls into view (once). Respects reduced motion.
import { motion, useReducedMotion } from 'motion/react'

export default function Reveal({ children, delay = 0, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  if (reduce) return <M {...rest}>{children}</M>
  return (
    <M
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </M>
  )
}
