# visitor-globe

A self-contained interactive piece: a rotating 3D Earth drawn entirely in
particles. Resolve the visitor's country from their IP, then turn the globe to
that country and light its borders aglow. Drag to spin, scroll to zoom.

This folder is intentionally self-contained so it can later be extracted into a
standalone open-source repo / npm package.

## Files

- `VisitorGlobe.jsx` — main component. Resolves country, lazy-loads the particle
  data, sets up the `@react-three/fiber` canvas (stars, bloom, OrbitControls)
  and the greeting.
- `ParticleGlobe.jsx` — the `THREE.Points` cloud + custom shader (soft round
  sprites, fresnel rim glow, gentle drift/twinkle). Eases rotation so the
  focused country faces the camera and flips an `aHighlight` attribute on that
  country's particles.
- `useVisitorCountry.js` — hook that resolves `{ status, code, name }` from IP
  via a chain of free, key-less, CORS-enabled providers (geojs -> ipapi.co ->
  ipwho.is). Country-level only; nothing is persisted.
- `data/particles.js` — **auto-generated** land-particle field: unit-sphere
  positions, per-particle lat/lng, a per-particle country index, and a compact
  `countries` lookup (index + centroid per ISO-2). Do not edit by hand.

## Regenerating particle data

Particles are precomputed at build time (high-density sampling + per-particle
point-in-polygon is too expensive for the browser). To change density or the
country attribution, edit `scripts/gen-globe-particles.js` and run:

```bash
npm run gen-globe
```

Inputs:
- dotted-map's bundled world geometry, sampled at `HEIGHT` (dot density; higher
  = finer + larger payload), for the land particle positions.
- `scripts/data/countries.geojson` — world borders (ISO-2 tagged) for precise
  point-in-polygon country attribution. Committed; sourced from
  [datasets/geo-countries](https://github.com/datasets/geo-countries). Override
  the path with the `GLOBE_GEOJSON` env var.

## How it fits together

```
IP  -useVisitorCountry-> country code
                            |
                  countries[code] -> { index, centroid }
                            |
              +-------------+-------------+
              v                           v
     turn globe to centroid     highlight particles whose
        (target longitude)        country index == this index
```

## Runtime dependencies

- `three`, `@react-three/fiber`, `@react-three/drei`,
  `@react-three/postprocessing` — rendering, controls, and bloom. Lazy-loaded
  into this page only, so they don't weigh on the rest of the site.
- The browser ships only `data/particles.js`; no geometry is computed at
  runtime.

## Privacy

The visitor's IP is sent to a third-party geo provider only to pick which
country to turn toward. It is used transiently and never stored.
