import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Convert a point on the unit sphere (in the globe's local frame) to lat/lng,
// inverting latLngToVec3.
function vec3ToLatLng(v) {
  const lat = 90 - (Math.acos(THREE.MathUtils.clamp(v.y, -1, 1)) * 180) / Math.PI
  let lng = (Math.atan2(v.z, -v.x) * 180) / Math.PI - 180
  if (lng < -180) lng += 360
  if (lng > 180) lng -= 360
  return { lat, lng }
}

// Crisp solid point sprite (vector-like clarity), brighter toward the rim
// (fresnel). Hovered country particles lift along their normal and glow.
// One draw call.
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aHighlight;
  attribute float aHover;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFresnel;
  varying float vTwinkle;
  varying float vHighlight;
  varying float vHover;
  varying float vFacing;

  void main() {
    vHighlight = aHighlight;
    vHover = aHover;
    vColor = aColor;

    // Drift each particle slightly along its own normal (breathing land),
    // plus a stronger lift when its country is hovered.
    vec3 dir = normalize(position);
    float drift = sin(uTime * 0.6 + aSeed * 6.2831) * 0.004;
    float lift = aHover * 0.06;
    vec3 pos = position + dir * (drift + lift);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Facing: >0 front hemisphere, <0 back. Used to hide the far side so the
    // globe reads solid instead of see-through.
    vec3 worldNormal = normalize(mat3(modelMatrix) * dir);
    vec3 viewDir = normalize(cameraPosition - (modelMatrix * vec4(pos, 1.0)).xyz);
    float facing = dot(worldNormal, viewDir);
    vFacing = facing;
    vFresnel = pow(1.0 - abs(facing), 2.4);

    // Slow per-particle twinkle.
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.4 + aSeed * 40.0);

    gl_Position = projectionMatrix * mvPosition;
    // Per-particle size variation (organic, not a uniform grid of equal dots).
    // aSeed in [0,1] -> size multiplier roughly in [0.55, 1.5].
    float sizeVar = 0.55 + aSeed * 0.95;
    gl_PointSize = uSize * sizeVar * (1.0 + aHover * 0.6) * uPixelRatio * (1.0 / -mvPosition.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uRimColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uHoverColor;
  uniform float uSaturation;
  uniform float uBrightness;
  varying vec3 vColor;
  varying float vFresnel;
  varying float vTwinkle;
  varying float vHighlight;
  varying float vHover;
  varying float vFacing;

  void main() {
    // Hide the far hemisphere so the globe reads solid, not see-through.
    float front = smoothstep(-0.05, 0.10, vFacing);
    if (front < 0.01) discard;

    // Mostly-solid round sprite with a slight feathered edge — crisp enough to
    // read sharp, soft enough to feel organic rather than a mechanical grid.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = (1.0 - smoothstep(0.34, 0.5, d)) * front;
    if (alpha < 0.01) discard;

    // Real surface colour, tone-shaped: lift saturation + overall brightness.
    vec3 surface = vColor;
    float lum = dot(surface, vec3(0.299, 0.587, 0.114));
    surface = mix(vec3(lum), surface, uSaturation) * uBrightness;

    // Subtle cool rim glow only near the limb — kept restrained for clarity.
    vec3 base = surface + uRimColor * pow(vFresnel, 1.4) * 0.5;

    // Visitor-country highlight (warm), then hover (cooler, brighter) on top.
    base = mix(base, uHighlightColor, vHighlight * 0.8);
    base = mix(base, uHoverColor, vHover * 0.85);
    base += uHoverColor * vHover * 0.4;

    gl_FragColor = vec4(base, alpha);
  }
`

// Spin so the given longitude faces the camera (which sits on +Z).
// A point's base position (latLngToVec3) has x = -sin(phi)cos(theta),
// z = sin(phi)sin(theta) with theta = (lng+180)°. Rotating the globe by ry about
// Y gives newZ = -x·sin(ry) + z·cos(ry); maximising newZ (toward the camera)
// yields ry = atan2(-x, z). phi cancels, so only lng matters.
function targetRotationForLng(lng) {
  const theta = ((lng + 180) * Math.PI) / 180
  const x = -Math.cos(theta)
  const z = Math.sin(theta)
  return Math.atan2(-x, z)
}

export function ParticleGlobe({
  data,
  spin = 0.05,
  highlightIndex = -1,
  targetLng = null,
  onHoverCountry = null,
}) {
  const ref = useRef()
  const matRef = useRef()
  const pickRef = useRef()
  const { camera } = useThree()
  // Rotation target: while a country is focused we stop free-spin and ease in.
  const target = useRef({ lng: null })
  target.current.lng = targetLng

  // Hover state: which country index is hovered, and a per-particle eased value.
  const hoverIndex = useRef(-1)
  const hoverEase = useRef(null)
  const raycaster = useRef(new THREE.Raycaster())

  const geometry = useMemo(() => {
    const { count, positions, colors } = data
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(positions)
    const seeds = new Float32Array(count)
    const highlight = new Float32Array(count)
    const hover = new Float32Array(count)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      seeds[i] = Math.random()
      highlight[i] = 0
      hover[i] = 0
    }
    // Sampled 0-255 surface colours -> 0-1, sRGB->linear for correct rendering.
    if (colors) {
      for (let i = 0; i < count * 3; i += 1) {
        const c = colors[i] / 255
        col[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
      }
    } else {
      col.fill(0.6)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aHighlight', new THREE.BufferAttribute(highlight, 1))
    geo.setAttribute('aHover', new THREE.BufferAttribute(hover, 1))
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    return geo
  }, [data])

  // Repaint highlight attribute whenever the focused country changes.
  useMemo(() => {
    const attr = geometry.getAttribute('aHighlight')
    if (!attr) return
    const tags = data.country
    for (let i = 0; i < attr.count; i += 1) {
      attr.array[i] = highlightIndex >= 0 && tags[i] === highlightIndex ? 1 : 0
    }
    attr.needsUpdate = true
  }, [geometry, data, highlightIndex])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 5.5 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uRimColor: { value: new THREE.Color('#6db4ff') },
      uHighlightColor: { value: new THREE.Color('#fff4d6') },
      uHoverColor: { value: new THREE.Color('#aee4ff') },
      uSaturation: { value: 1.35 },
      uBrightness: { value: 1.15 },
    }),
    [],
  )

  // Lazily-sized scratch buffer for smooth per-particle hover easing.
  if (!hoverEase.current || hoverEase.current.length !== data.count) {
    hoverEase.current = new Float32Array(data.count)
  }

  // Resolve which country (if any) the pointer is over, by raycasting an
  // invisible sphere, converting the hit to lat/lng, and matching the nearest
  // tagged particle. Cheap: one ray + a localized particle scan.
  const handleMove = (e) => {
    const mesh = pickRef.current
    const points = ref.current
    if (!mesh || !points) return
    raycaster.current.setFromCamera(e.pointer ?? e, camera)
    const hit = raycaster.current.intersectObject(mesh, false)[0]
    if (!hit) {
      setHover(-1)
      return
    }
    // Hit point -> globe-local unit vector (undo the globe's rotation).
    const local = points.worldToLocal(hit.point.clone()).normalize()
    const { lat, lng } = vec3ToLatLng(local)

    // Nearest tagged particle to this lat/lng wins its country.
    const { lats, lngs, country } = data
    let best = -1
    let bestD = 6 // squared-degree gate so empty ocean clicks don't snap
    for (let i = 0; i < data.count; i += 1) {
      if (country[i] < 0) continue
      const dla = lats[i] - lat
      let dln = lngs[i] - lng
      if (dln > 180) dln -= 360
      if (dln < -180) dln += 360
      const d = dla * dla + dln * dln
      if (d < bestD) {
        bestD = d
        best = country[i]
      }
    }
    setHover(best)
  }

  const setHover = (idx) => {
    if (hoverIndex.current === idx) return
    hoverIndex.current = idx
    if (onHoverCountry) onHoverCountry(idx)
  }

  useFrame((state, delta) => {
    const g = ref.current
    if (g) {
      if (target.current.lng != null) {
        // Ease the focused country to the front, then drift very slowly.
        const want = targetRotationForLng(target.current.lng)
        const cur = g.rotation.y
        let diff = (want - cur) % (Math.PI * 2)
        if (diff > Math.PI) diff -= Math.PI * 2
        if (diff < -Math.PI) diff += Math.PI * 2
        g.rotation.y += diff * Math.min(1, delta * 2.2) + spin * 0.15 * delta
      } else {
        g.rotation.y += spin * delta
      }
    }
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime

    // Ease each particle's hover value toward its target (1 if its country is
    // hovered, else 0) and push to the GPU. Smooth lift + glow.
    const attr = geometry.getAttribute('aHover')
    if (attr) {
      const tags = data.country
      const ease = hoverEase.current
      const hovered = hoverIndex.current
      const k = Math.min(1, delta * 8)
      let dirty = false
      for (let i = 0; i < attr.count; i += 1) {
        const want = hovered >= 0 && tags[i] === hovered ? 1 : 0
        const cur = ease[i]
        if (Math.abs(want - cur) > 0.001) {
          ease[i] = cur + (want - cur) * k
          attr.array[i] = ease[i]
          dirty = true
        }
      }
      if (dirty) attr.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Invisible sphere used purely for pointer picking. */}
      <mesh
        ref={pickRef}
        onPointerMove={handleMove}
        onPointerOut={() => setHover(-1)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <points ref={ref} geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  )
}
