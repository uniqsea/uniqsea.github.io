import { useEffect, useState } from 'react'
import { MagHeartContext } from './magHeartContext.js'

export default function MagHeartProvider({ children }) {
  const [measurementVisible, setMeasurementVisible] = useState(false)
  const [avatarHovered, setAvatarHovered] = useState(false)
  const active = measurementVisible || avatarHovered
  const [bpm, setBpm] = useState(80)

  useEffect(() => {
    if (!active) return
    const timer = window.setInterval(() => {
      const change = Math.random() < 0.5 ? -1 : 1
      setBpm(previous => previous === 76 ? 77 : previous === 84 ? 83 : previous + change)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [active])

  return <MagHeartContext.Provider value={{ measurementVisible, setMeasurementVisible, avatarHovered, setAvatarHovered, bpm }}>{children}</MagHeartContext.Provider>
}
