import { Suspense, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { VoronoiGlobe } from './VoronoiGlobe.jsx'
import { useVisitorCountry } from './useVisitorCountry.js'
import { greetingFor } from './greetings.js'

const Stage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const CanvasFrame = styled.div`
  width: min(820px, 94vw);
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: #06080f;

  canvas { display: block; touch-action: none; }
`

const Greeting = styled.p`
  margin: 0;
  font-family: var(--heading-font);
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg);
  text-align: center;
  min-height: 1.4em;
`

const Caption = styled.p`
  margin: 0;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-style: italic;
  font-size: 1rem;
  color: var(--muted);
`

function Scene({ data, targetLng }) {
  return (
    <>
      <color attach="background" args={['#06080f']} />
      <Stars radius={60} depth={40} count={1400} factor={3} saturation={0} fade speed={0.4} />
      <VoronoiGlobe data={data} spin={0.04} highlightLng={targetLng} />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.6}
        maxDistance={5}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </>
  )
}

export function VisitorGlobe() {
  const [data, setData] = useState(null)
  const visitor = useVisitorCountry()

  useEffect(() => {
    let active = true
    import('./data/voronoi.js').then((mod) => {
      if (active) setData(mod.default)
    })
    return () => {
      active = false
    }
  }, [])

  // Some territories are folded into another country to match the mesh data.
  const code = visitor.code === 'TW' ? 'CN' : visitor.code

  // Resolve the visitor's country to a target longitude for the globe to face.
  const focus = (() => {
    if (!data || visitor.status !== 'ready' || !code) return null
    return data.countries[code] || null
  })()

  // Greet the visitor in their country's own language. No place/region name is
  // shown — this avoids surfacing any territorial-attribution labels.
  const hello = (() => {
    if (!data || visitor.status === 'loading') return 'Finding you on the map…'
    if (visitor.status === 'ready' && code) return `${greetingFor(code)} 👋`
    return 'Hello 👋'
  })()

  return (
    <Stage>
      <CanvasFrame>
        {data && (
          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 42 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Scene data={data} targetLng={focus ? focus.lng : null} />
            </Suspense>
          </Canvas>
        )}
      </CanvasFrame>
      <Greeting>{hello}</Greeting>
      <Caption>Drag to spin · scroll to zoom</Caption>
    </Stage>
  )
}
