// Pre-compute a high-density field of land particles for the 3D particle globe,
// tagged by country (precise, polygon-accurate) so the visitor's country can be
// highlighted exactly along its borders.
// Run: npm run gen-globe
//
// Inputs:
//   - dotted-map's bundled world geometry, sampled at high resolution, for the
//     land particle positions.
//   - A world-countries GeoJSON (ISO-2 tagged) for point-in-polygon country
//     attribution. Path via GLOBE_GEOJSON env var; falls back to a vendored copy
//     under scripts/data/countries.geojson. Source (committed):
//     https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson
//   - An equirectangular natural-colour Earth daymap for per-particle colour, so
//     deserts read sandy, forests green, ice white, etc. Path via GLOBE_DAYMAP;
//     falls back to scripts/data/earth-daymap.jpg (Solar System Scope, CC-BY).
//
// Output: src/features/visitor-globe/data/particles.js
//   export default {
//     count, positions:[x,y,z,...], lats:[...], lngs:[...],
//     colors:[r,g,b,...],           // 0-255 sampled land-surface colour
//     country:[idx,...],            // -1 if untagged (ocean / no match)
//     countries: { US: { i, lat, lng }, ... }  // index + centroid per ISO-2
//   }

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getMapJSON } from 'dotted-map'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../src/features/visitor-globe/data')
const GEOJSON_PATH =
  process.env.GLOBE_GEOJSON || path.resolve(__dirname, 'data/countries.geojson')
const DAYMAP_PATH =
  process.env.GLOBE_DAYMAP || path.resolve(__dirname, 'data/earth-daymap.jpg')

const HEIGHT = 250 // sampling resolution -> ~53k land points
const GRID = 'diagonal'
const MERC_MAX = 20037508.342789244 // Web-Mercator half-extent in metres

function mercatorToLatLng(x, y) {
  const lng = (x / MERC_MAX) * 180
  const lat = (Math.atan(Math.sinh((y / MERC_MAX) * Math.PI)) * 180) / Math.PI
  return { lat, lng }
}

function latLngToVec3(lat, lng) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  }
}

function round(n, d = 4) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

// Ray-casting point-in-ring test (lng = x, lat = y).
function pointInRing(lng, lat, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0]
    const yi = ring[i][1]
    const xj = ring[j][0]
    const yj = ring[j][1]
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

// A polygon = [outerRing, hole1, hole2, ...]. Inside outer and outside holes.
function pointInPolygon(lng, lat, polygon) {
  if (!pointInRing(lng, lat, polygon[0])) return false
  for (let h = 1; h < polygon.length; h += 1) {
    if (pointInRing(lng, lat, polygon[h])) return false
  }
  return true
}

// Pre-flatten each country into { iso2, name, bbox, polygons:[poly,...] }.
function loadCountries() {
  const raw = JSON.parse(fs.readFileSync(GEOJSON_PATH, 'utf8'))
  const list = []
  for (const f of raw.features) {
    const iso2 = f.properties['ISO3166-1-Alpha-2']
    if (!iso2 || iso2 === '-99') continue
    const polygons = []
    const g = f.geometry
    if (g.type === 'Polygon') polygons.push(g.coordinates)
    else if (g.type === 'MultiPolygon') for (const p of g.coordinates) polygons.push(p)
    if (!polygons.length) continue

    let latMin = 90, latMax = -90, lngMin = 180, lngMax = -180
    let sumLat = 0, sumLng = 0, n = 0
    for (const poly of polygons) {
      for (const [lng, lat] of poly[0]) {
        if (lat < latMin) latMin = lat
        if (lat > latMax) latMax = lat
        if (lng < lngMin) lngMin = lng
        if (lng > lngMax) lngMax = lng
        sumLat += lat
        sumLng += lng
        n += 1
      }
    }
    list.push({
      iso2,
      name: f.properties.name,
      bbox: { latMin, latMax, lngMin, lngMax },
      center: { lat: sumLat / n, lng: sumLng / n },
      polygons,
    })
  }
  return list
}

// Decode the equirectangular daymap into a raw RGB buffer + a sampler that maps
// lat/lng -> surface colour. Returns null if the image is missing (colours then
// fall back to a flat tint at write time).
async function loadDaymap() {
  if (!fs.existsSync(DAYMAP_PATH)) return null
  const { data, info } = await sharp(DAYMAP_PATH)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  return function sample(lat, lng) {
    const u = (lng + 180) / 360
    const vv = (90 - lat) / 180
    const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)))
    const y = Math.min(height - 1, Math.max(0, Math.floor(vv * height)))
    const i = (y * width + x) * channels
    return [data[i], data[i + 1], data[i + 2]]
  }
}

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  if (!fs.existsSync(GEOJSON_PATH)) {
    console.error(
      `Missing countries GeoJSON at ${GEOJSON_PATH}.\n` +
      `Set GLOBE_GEOJSON or place a file at scripts/data/countries.geojson.`,
    )
    process.exit(1)
  }

  const sampleColor = await loadDaymap()
  if (!sampleColor) {
    console.warn(`No daymap at ${DAYMAP_PATH} — particles will use a flat tint.`)
  }

  const countries = loadCountries()
  console.log(`Loaded ${countries.length} countries from GeoJSON`)

  const map = JSON.parse(getMapJSON({ height: HEIGHT, grid: GRID }))
  const { X_MIN, X_RANGE, Y_MIN, Y_RANGE, width, height } = map
  const points = Object.values(map.points)

  const positions = []
  const lats = []
  const lngs = []
  const colors = []
  const country = []
  const used = new Map() // iso2 -> assigned compact index

  for (const p of points) {
    const mx = X_MIN + (p.x / (width - 1)) * X_RANGE
    const my = Y_MIN + (1 - p.y / (height - 1)) * Y_RANGE
    const { lat, lng } = mercatorToLatLng(mx, my)
    const v = latLngToVec3(lat, lng)
    positions.push(round(v.x), round(v.y), round(v.z))
    lats.push(round(lat, 2))
    lngs.push(round(lng, 2))

    const rgb = sampleColor ? sampleColor(lat, lng) : [120, 150, 200]
    colors.push(rgb[0], rgb[1], rgb[2])

    let matched = -1
    for (const c of countries) {
      const b = c.bbox
      if (lat < b.latMin || lat > b.latMax || lng < b.lngMin || lng > b.lngMax) continue
      let hit = false
      for (const poly of c.polygons) {
        if (pointInPolygon(lng, lat, poly)) { hit = true; break }
      }
      if (hit) {
        if (!used.has(c.iso2)) used.set(c.iso2, used.size)
        matched = used.get(c.iso2)
        break
      }
    }
    country.push(matched)
  }

  // Build the compact countries lookup with centroids, ordered by index.
  const byIndex = []
  for (const c of countries) {
    if (used.has(c.iso2)) byIndex[used.get(c.iso2)] = c
  }
  const countriesOut = {}
  byIndex.forEach((c, i) => {
    countriesOut[c.iso2] = { i, lat: round(c.center.lat, 2), lng: round(c.center.lng, 2) }
  })

  const data = { count: points.length, positions, lats, lngs, colors, country, countries: countriesOut }
  const file = path.join(OUT_DIR, 'particles.js')
  const body =
    '// AUTO-GENERATED by scripts/gen-globe-particles.js - do not edit by hand.\n' +
    '// Run `npm run gen-globe` to regenerate.\n' +
    `export default ${JSON.stringify(data)}\n`
  fs.writeFileSync(file, body)

  const kb = (body.length / 1024).toFixed(0)
  const tagged = country.filter((c) => c >= 0).length
  console.log(`Wrote ${file} (${kb}KB, ${points.length} particles, ${tagged} tagged, ${used.size} countries)`)
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
