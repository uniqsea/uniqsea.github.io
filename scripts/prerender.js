/**
 * Prerender every public route to static HTML after `vite build`:
 *   dist/projects/index.html, dist/publications/index.html, ...
 *   dist/sitemap.xml (generated from the same route list)
 *
 * Crawlers get real content and a 200 for each URL. In the browser, React
 * still mounts over the saved markup as usual.
 *
 * Usage: runs as part of `npm run build`.
 */

import fs from 'fs'
import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'
import { createServer, preview } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')
const ANIMATION_SETTLE_MS = 1500

// Source modules import images, so they have to be loaded through Vite.
async function loadData() {
  const vite = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true },
  })
  try {
    const [{ site, socials }, { projects }, { designs }, { slugify }] = await Promise.all([
      vite.ssrLoadModule('/src/data/site.js'),
      vite.ssrLoadModule('/src/data/projects.js'),
      vite.ssrLoadModule('/src/data/designs.js'),
      vite.ssrLoadModule('/src/utils/slug.js'),
    ])
    return { site, socials, projects, designs, slugify }
  } finally {
    await vite.close()
  }
}

function buildRoutes({ site, projects, designs, slugify }) {
  const { fullName: name } = site
  const about = `${name} is a Computer Science master's student at Aarhus University specializing in Human-Computer Interaction.`

  return [
    {
      // Copy for this route lives in index.html.
      path: '/',
    },
    {
      path: '/projects/',
      description: `Selected projects by ${name}. ${about}`,
    },
    {
      path: '/publications/',
      description: `Publications by ${name}. ${about}`,
    },
    {
      path: '/moments/',
      description: `Moments by ${name}. ${about}`,
    },
    {
      path: '/design/',
      description: `Design work by ${name}. ${about}`,
    },
    ...projects
      .filter(project => !project.hidden)
      .map(project => ({
        path: `/projects/${project.slug || slugify(project.title)}/`,
        description: project.summary,
      })),
    ...designs.map(design => ({
      path: `/design/${design.id}/`,
      description: `${design.title} (${design.subtitle}) by ${name}.`,
    })),
  ]
}

function buildPersonSchema({ site, socials }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    url: `https://${site.domain}/`,
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Aarhus University' },
    knowsAbout: 'Human-Computer Interaction',
    sameAs: socials.map(social => social.href).filter(href => href.startsWith('https://')),
  }
}

// Runs in the page. styled-components writes production CSS straight into the
// CSSOM, which page.content() can't see, so it is copied into a plain <style>.
function inlineStyledComponentsCss() {
  const tags = [...document.querySelectorAll('style[data-styled]')]
  const css = tags
    .flatMap(tag => [...tag.sheet.cssRules].map(rule => rule.cssText))
    .join('\n')
  tags.forEach(tag => tag.remove())

  const style = document.createElement('style')
  style.dataset.prerendered = ''
  style.textContent = css
  document.head.appendChild(style)
}

// Runs in the page.
function applyHead({ url, description, schema }) {
  const setContent = (selector, value) => {
    document.querySelector(selector).setAttribute('content', value)
  }

  document.querySelector('link[rel="canonical"]').href = url
  setContent('meta[property="og:url"]', url)

  // The app has already set document.title for this route.
  setContent('meta[property="og:title"]', document.title)
  setContent('meta[name="twitter:title"]', document.title)

  if (description) {
    setContent('meta[name="description"]', description)
    setContent('meta[property="og:description"]', description)
    setContent('meta[name="twitter:description"]', description)
  }

  if (schema) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  }
}

async function renderRoute(browser, baseUrl, siteUrl, route, schema) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // Videos never let the network go idle, and crawlers don't need them here.
  await page.setRequestInterception(true)
  page.on('request', request => {
    if (request.resourceType() === 'media') request.abort()
    else request.continue()
  })

  await page.goto(new URL(route.path, baseUrl).href, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise(resolve => setTimeout(resolve, ANIMATION_SETTLE_MS))

  const hasContent = await page.$eval('#root', root => root.innerText.trim().length > 0)
  if (!hasContent) throw new Error(`Prerender produced an empty page: ${route.path}`)

  await page.evaluate(inlineStyledComponentsCss)
  await page.evaluate(applyHead, {
    url: new URL(route.path, siteUrl).href,
    description: route.description,
    schema,
  })

  const html = await page.content()
  await page.close()
  return html
}

function writeSitemap(siteUrl, routes) {
  const urls = routes
    .map(route => `  <url>\n    <loc>${new URL(route.path, siteUrl).href}</loc>\n  </url>`)
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
}

async function main() {
  const data = await loadData()
  const siteUrl = `https://${data.site.domain}/`
  const routes = buildRoutes(data)
  const personSchema = buildPersonSchema(data)

  const server = await preview({ logLevel: 'silent' })
  // --no-sandbox: GitHub's Ubuntu runners block Chromium's sandbox. Only our own build is loaded.
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })

  try {
    const baseUrl = server.resolvedUrls.local[0]
    const pages = []

    // Render everything before writing, so each route loads the untouched index.html.
    for (const route of routes) {
      const schema = route.path === '/' ? personSchema : null
      pages.push({ route, html: await renderRoute(browser, baseUrl, siteUrl, route, schema) })
    }

    for (const { route, html } of pages) {
      const file = path.join(DIST, route.path, 'index.html')
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, html)
      console.log(`  prerendered ${route.path}`)
    }

    writeSitemap(siteUrl, routes)
    console.log(`  wrote sitemap.xml (${routes.length} urls)`)
  } finally {
    await browser.close()
    await server.close()
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
