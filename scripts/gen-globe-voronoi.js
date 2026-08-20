// Pre-compute a per-country constrained-Voronoi tessellation and map it onto a
// 3D sphere. The country OUTLINE is exact (taken straight from real borders);
// only the INTERIOR is broken into free organic shards. So borders are precise
// by construction — there is no global "cut" step.
// Run: npm run gen-voronoi
//
// Pipeline (per country):
//   1. Take the country's real border polygons as the exact region.
//   2. Reject-sample seeds inside it; seed count scales with the country's area
//      so global shard density is uniform.
//   3. Lloyd-relax with centroids constrained to stay inside the border.
//   4. Clip each interior Voronoi cell to THIS country's border only, so shards
//      hug the outline. Sample surface colour, triangulate, project to sphere.
//
// Output: src/features/visitor-globe/data/voronoi.js  (indexed geometry)
//   export default {
//     positions:[x,y,z,...], colors:[r,g,b,...], cellId:[...], country:[...],
//     indices:[...], centers:[lat,lng,...], countries:{ US:{i,lat,lng} },
//     vertexCount, indexCount, cellCount
//   }

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Delaunay } from 'd3-delaunay'
import polygonClipping from 'polygon-clipping'
import earcut from 'earcut'
import simplify from 'simplify-js'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../src/features/visitor-globe/data')
const GEOJSON_PATH = process.env.GLOBE_GEOJSON || path.resolve(__dirname, 'data/countries.geojson')
const DAYMAP_PATH = process.env.GLOBE_DAYMAP || path.resolve(__dirname, 'data/earth-daymap.jpg')

const TOTAL_SHARDS = Number(process.env.VORONOI_SHARDS || 12000) // global target
const LLOYD_ITERS = Number(process.env.VORONOI_ITERS || 8)
// Border simplification tolerance in degrees — trims border vertex counts for
// fast clipping; error stays far below one shard so outlines still read exact.
const SIMPLIFY_TOL = Number(process.env.VORONOI_SIMPLIFY || 0.04)

function round(n, d = 4) { const f = 10 ** d; return Math.round(n * f) / f }

function latLngToVec3(lat, lng) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return [
    -Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ]
}

function toLinear(c) {
  const x = c / 255
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
}

async function loadDaymap() {
  const { data, info } = await sharp(DAYMAP_PATH).raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  return (lat, lng) => {
    const u = (lng + 180) / 360
    const v = (90 - lat) / 180
    const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)))
    const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)))
    const i = (y * width + x) * channels
    return [data[i], data[i + 1], data[i + 2]]
  }
}

// Douglas-Peucker simplify a [lng,lat][] ring, keeping it closed + valid.
function simplifyRing(ring) {
  if (ring.length <= 5) return ring
  const pts = ring.map(([x, y]) => ({ x, y }))
  const out = simplify(pts, SIMPLIFY_TOL, true).map((p) => [p.x, p.y])
  return out.length >= 4 ? out : ring
}

// Ray-casting point-in-polygon (lng=x, lat=y). polygon = [outer, ...holes].
function pointInRing(lng, lat, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1]
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
function pointInPolygon(lng, lat, polygon) {
  if (!pointInRing(lng, lat, polygon[0])) return false
  for (let h = 1; h < polygon.length; h += 1) if (pointInRing(lng, lat, polygon[h])) return false
  return true
}
// Inside ANY of the country's polygons (islands + mainland).
function pointInCountry(lng, lat, polys) {
  for (const poly of polys) if (pointInPolygon(lng, lat, poly)) return true
  return false
}

// Shoelace area (deg²) of a country's outer rings — used for density scaling.
function countryArea(polys) {
  let a = 0
  for (const poly of polys) {
    const ring = poly[0]
    let s = 0
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
      s += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]
    }
    a += Math.abs(s) / 2
  }
  return a
}

// Territories folded into another country's code (their shards + outline are
// attributed to the target country, not shown separately).
const MERGE = { TW: 'CN', 'CN-TW': 'CN' }

function loadCountries() {
  const raw = JSON.parse(fs.readFileSync(GEOJSON_PATH, 'utf8'))
  const byCode = new Map()
  for (const f of raw.features) {
    let iso2 = f.properties['ISO3166-1-Alpha-2']
    if (!iso2 || iso2 === '-99') continue
    iso2 = MERGE[iso2] || iso2
    const rawPolys = []
    const g = f.geometry
    if (g.type === 'Polygon') rawPolys.push(g.coordinates)
    else if (g.type === 'MultiPolygon') for (const p of g.coordinates) rawPolys.push(p)
    if (!rawPolys.length) continue
    const polygons = rawPolys.map((poly) => poly.map(simplifyRing))
    // Merge into an existing entry if this code already exists (e.g. TW->CN).
    const existing = byCode.get(iso2)
    if (existing) existing.polygons.push(...polygons)
    else byCode.set(iso2, { iso2, polygons })
  }

  const list = []
  for (const c of byCode.values()) {
    let latMin = 90, latMax = -90, lngMin = 180, lngMax = -180, sumLat = 0, sumLng = 0, n = 0
    for (const poly of c.polygons) for (const [lng, lat] of poly[0]) {
      latMin = Math.min(latMin, lat); latMax = Math.max(latMax, lat)
      lngMin = Math.min(lngMin, lng); lngMax = Math.max(lngMax, lng)
      sumLat += lat; sumLng += lng; n += 1
    }
    list.push({
      iso2: c.iso2,
      bbox: { latMin, latMax, lngMin, lngMax },
      center: { lat: sumLat / n, lng: sumLng / n },
      area: countryArea(c.polygons),
      polygons: c.polygons,
    })
  }
  return list
}

async function build() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const sampleColor = await loadDaymap()
  const countries = loadCountries()
  const totalArea = countries.reduce((s, c) => s + c.area, 0)
  console.log(`Loaded ${countries.length} countries, total area ${totalArea.toFixed(0)} deg²`)

  // Indexed-geometry accumulators.
  const positions = []
  const colors = []
  const cellId = []
  const country = []
  const indices = []
  const centers = []
  const used = new Map()
  let cellCount = 0
  let cellVertMap = null

  // Emit one clipped Voronoi cell (polygon-clipping "polygon" = [outer,...holes]).
  function emitPolygon(rings, lr, lg, lb, cidx, id) {
    const flat = []
    const holes = []
    for (let ri = 0; ri < rings.length; ri += 1) {
      if (ri > 0) holes.push(flat.length / 2)
      const ring = rings[ri]
      const end = ring.length > 1 &&
        ring[0][0] === ring[ring.length - 1][0] &&
        ring[0][1] === ring[ring.length - 1][1] ? ring.length - 1 : ring.length
      for (let k = 0; k < end; k += 1) flat.push(ring[k][0], ring[k][1])
    }
    if (flat.length < 6) return false
    const tri = earcut(flat, holes.length ? holes : null)
    if (!tri.length) return false
    const local = new Array(flat.length / 2)
    for (let vi = 0; vi < flat.length / 2; vi += 1) {
      const lng = flat[vi * 2], lat = flat[vi * 2 + 1]
      const key = `${lng},${lat}`
      let gi = cellVertMap.get(key)
      if (gi === undefined) {
        const p = latLngToVec3(lat, lng)
        gi = positions.length / 3
        positions.push(round(p[0]), round(p[1]), round(p[2]))
        colors.push(round(lr, 3), round(lg, 3), round(lb, 3))
        cellId.push(id)
        country.push(cidx)
        cellVertMap.set(key, gi)
      }
      local[vi] = gi
    }
    for (let t = 0; t < tri.length; t += 1) indices.push(local[tri[t]])
    return true
  }

  for (const c of countries) {
    const { bbox, polygons, area, iso2 } = c
    // Seed count ∝ area, at least 1, so global density is uniform.
    const nSeeds = Math.max(1, Math.round((area / totalArea) * TOTAL_SHARDS))

    // 1+2. Reject-sample seeds strictly inside the country's border.
    const seeds = []
    let tries = 0
    const maxTries = nSeeds * 60 + 200
    while (seeds.length < nSeeds * 2 && tries < maxTries) {
      tries += 1
      const lng = bbox.lngMin + Math.random() * (bbox.lngMax - bbox.lngMin)
      const lat = bbox.latMin + Math.random() * (bbox.latMax - bbox.latMin)
      if (pointInCountry(lng, lat, polygons)) seeds.push(lng, lat)
    }
    if (seeds.length < 2) {
      // Tiny country: emit its border directly as a single shard.
      const cidx = used.has(iso2) ? used.get(iso2) : used.set(iso2, used.size).get(iso2)
      const [r, g, b] = sampleColor(c.center.lat, c.center.lng)
      cellVertMap = new Map()
      let any = false
      for (const poly of polygons) any = emitPolygon(poly, toLinear(r), toLinear(g), toLinear(b), cidx, cellCount) || any
      if (any) { centers.push(round(c.center.lat, 2), round(c.center.lng, 2)); cellCount += 1 }
      continue
    }

    const pts = Float64Array.from(seeds)
    const vb = [bbox.lngMin, bbox.latMin, bbox.lngMax, bbox.latMax]
    let delaunay = new Delaunay(pts)
    let voronoi = delaunay.voronoi(vb)

    // 3. Lloyd relaxation, centroids kept inside the border.
    for (let it = 0; it < LLOYD_ITERS; it += 1) {
      for (let i = 0; i < pts.length / 2; i += 1) {
        const cell = voronoi.cellPolygon(i)
        if (!cell) continue
        let cx = 0, cy = 0, a = 0
        for (let k = 0, m = cell.length - 1; k < cell.length; m = k, k += 1) {
          const cross = cell[m][0] * cell[k][1] - cell[k][0] * cell[m][1]
          a += cross; cx += (cell[m][0] + cell[k][0]) * cross; cy += (cell[m][1] + cell[k][1]) * cross
        }
        if (Math.abs(a) < 1e-12) continue
        a *= 0.5; cx /= 6 * a; cy /= 6 * a
        if (pointInCountry(cx, cy, polygons)) { pts[i * 2] = cx; pts[i * 2 + 1] = cy }
      }
      delaunay.update()
      voronoi = delaunay.voronoi(vb)
    }

    // 4. Clip each interior cell to THIS country's border and emit.
    const cidx = used.has(iso2) ? used.get(iso2) : used.set(iso2, used.size).get(iso2)
    const countryMP = polygons // already MultiPolygon-shaped [[ring,...],...]
    for (let i = 0; i < pts.length / 2; i += 1) {
      const cell = voronoi.cellPolygon(i)
      if (!cell || cell.length < 4) continue
      const slng = pts[i * 2], slat = pts[i * 2 + 1]
      const [r, g, b] = sampleColor(slat, slng)
      const lr = toLinear(r), lg = toLinear(g), lb = toLinear(b)

      let inter
      try {
        inter = polygonClipping.intersection([[cell.map(([x, y]) => [x, y])]], countryMP)
      } catch { inter = [] }
      if (!inter || !inter.length) continue

      cellVertMap = new Map()
      let any = false
      for (const poly of inter) any = emitPolygon(poly, lr, lg, lb, cidx, cellCount) || any
      if (any) { centers.push(round(slat, 2), round(slng, 2)); cellCount += 1 }
    }
  }

  const byIndex = []
  for (const c of countries) if (used.has(c.iso2)) byIndex[used.get(c.iso2)] = c
  const countriesOut = {}
  byIndex.forEach((c, i) => { countriesOut[c.iso2] = { i, lat: round(c.center.lat, 2), lng: round(c.center.lng, 2) } })

  const data = {
    positions, colors, cellId, country, indices, centers, countries: countriesOut,
    vertexCount: positions.length / 3, indexCount: indices.length, cellCount,
  }
  const file = path.join(OUT_DIR, 'voronoi.js')
  const body =
    '// AUTO-GENERATED by scripts/gen-globe-voronoi.js - do not edit by hand.\n' +
    '// Run `npm run gen-voronoi` to regenerate.\n' +
    `export default ${JSON.stringify(data)}\n`
  fs.writeFileSync(file, body)
  const kb = (body.length / 1024).toFixed(0)
  console.log(`Wrote ${file} (${kb}KB, ${cellCount} cells, ${data.vertexCount} verts, ${indices.length / 3} tris, ${used.size} countries)`)
}

build().catch((err) => { console.error(err); process.exit(1) })
