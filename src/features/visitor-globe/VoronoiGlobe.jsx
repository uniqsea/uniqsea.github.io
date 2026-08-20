import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Invert latLngToVec3 used by the generator.
function vec3ToLatLng(v) {
  const lat = 90 - (Math.acos(THREE.MathUtils.clamp(v.y, -1, 1)) * 180) / Math.PI
  let lng = (Math.atan2(v.z, -v.x) * 180) / Math.PI - 180
  if (lng < -180) lng += 360
  if (lng > 180) lng -= 360
  return { lat, lng }
}

// Flat-shaded irregular Voronoi shards tiling the land, each lifted along its
// normal on hover. Back hemisphere is culled so the globe reads solid.
const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aHoverFlag;
  varying vec3 vColor;
  varying float vFacing;
  varying float vHover;

  void main() {
    vColor = aColor;
    vHover = aHoverFlag;

    vec3 dir = normalize(position);
    vec3 pos = position + dir * aHoverFlag * 0.04;

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix) * dir);
    vec3 viewDir = normalize(cameraPosition - world.xyz);
    vFacing = dot(worldNormal, viewDir);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uRimColor;
  uniform vec3 uHoverColor;
  uniform float uSaturation;
  uniform float uBrightness;
  varying vec3 vColor;
  varying float vFacing;
  varying float vHover;

  void main() {
    if (vFacing < 0.0) discard; // hide far hemisphere -> solid globe

    vec3 surface = vColor;
    float lum = dot(surface, vec3(0.299, 0.587, 0.114));
    surface = mix(vec3(lum), surface, uSaturation) * uBrightness;

    float fres = pow(1.0 - vFacing, 2.0);
    vec3 col = surface + uRimColor * fres * 0.35;
    col = mix(col, uHoverColor, vHover * 0.8);

    gl_FragColor = vec4(col, 1.0);
  }
`

export function VoronoiGlobe({ data, spin = 0.04, highlightLng = null, onHoverCountry = null }) {
  const ref = useRef()
  const matRef = useRef()
  const { camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const hoverCountry = useRef(-1)
  const hoverEase = useRef(null)
  const target = useRef({ lng: null })
  target.current.lng = highlightLng

  const geometry = useMemo(() => {
    const { positions, colors, indices, vertexCount } = data
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3))
    geo.setAttribute('aHoverFlag', new THREE.BufferAttribute(new Float32Array(vertexCount), 1))
    if (indices) {
      const IndexArray = vertexCount > 65535 ? Uint32Array : Uint16Array
      geo.setIndex(new THREE.BufferAttribute(IndexArray.from(indices), 1))
    }
    geo.computeBoundingSphere()
    return geo
  }, [data])

  const uniforms = useMemo(
    () => ({
      uRimColor: { value: new THREE.Color('#6db4ff') },
      uHoverColor: { value: new THREE.Color('#bfe9ff') },
      uSaturation: { value: 1.3 },
      uBrightness: { value: 1.12 },
    }),
    [],
  )

  if (!hoverEase.current || hoverEase.current.length !== data.vertexCount) {
    hoverEase.current = new Float32Array(data.vertexCount)
  }

  // Spin so the focused longitude faces the camera (matches generator mapping).
  const targetRotationForLng = (lng) => {
    const theta = ((lng + 180) * Math.PI) / 180
    return Math.atan2(Math.cos(theta), Math.sin(theta))
  }

  const handleMove = (e) => {
    const mesh = ref.current
    if (!mesh) return
    raycaster.current.setFromCamera(e.pointer ?? e, camera)
    const hit = raycaster.current.intersectObject(mesh, false)[0]
    if (!hit) {
      setHover(-1)
      return
    }
    const idx = hit.face ? hit.face.a : -1
    const cIdx = idx >= 0 ? data.country[idx] : -1
    setHover(cIdx)
  }

  const setHover = (idx) => {
    if (hoverCountry.current === idx) return
    hoverCountry.current = idx
    if (onHoverCountry) onHoverCountry(idx)
  }

  useFrame((_, delta) => {
    const g = ref.current
    if (g) {
      // Pause the spin while a country is hovered so it holds still to inspect.
      const paused = hoverCountry.current >= 0
      if (target.current.lng != null) {
        const want = targetRotationForLng(target.current.lng)
        let diff = (want - g.rotation.y) % (Math.PI * 2)
        if (diff > Math.PI) diff -= Math.PI * 2
        if (diff < -Math.PI) diff += Math.PI * 2
        g.rotation.y += diff * Math.min(1, delta * 2.2) + (paused ? 0 : spin * 0.15 * delta)
      } else if (!paused) {
        g.rotation.y += spin * delta
      }
    }

    // Ease per-vertex hover toward target (1 if its country is hovered).
    // data.country is per-vertex, so compare each vertex's tag directly.
    const attr = geometry.getAttribute('aHoverFlag')
    if (attr) {
      const tags = data.country
      const ease = hoverEase.current
      const hovered = hoverCountry.current
      const k = Math.min(1, delta * 9)
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
    <mesh ref={ref} geometry={geometry} onPointerMove={handleMove} onPointerOut={() => setHover(-1)}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export { vec3ToLatLng }
