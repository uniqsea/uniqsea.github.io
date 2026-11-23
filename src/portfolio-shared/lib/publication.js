// Paper metadata for a project, looked up in src/data/publications.js.
import { publications } from '../../data/publications.js'

export const SITE = 'https://haiyangxu.me'

export const pub = (id) => publications.find((p) => p.id === id)
export const stripTags = (html) => html.replace(/<[^>]+>/g, '')
const absolute = (link) => (link.internal || link.href.startsWith('/') ? SITE + link.href : link.href)

/* The part of a paper title after "Name: ". */
export const subtitle = (p) => p.title.split(': ').slice(1).join(': ')

/* Paper links (DOI, PDF, …) followed by the project's own extra links. */
export const projectLinks = (project) => [
  ...pub(project.pubId).links.map((l) => ({ label: l.label, href: absolute(l) })),
  ...(project.extraLinks || []),
]

/* Authors as HTML, with the equal-contribution note when the list carries one. */
export const authorsHtml = (p) =>
  p.authorsHtml + (p.authorsHtml.includes('<sup>') ? ' <span style="color:var(--muted)">(* equal contribution)</span>' : '')

/* Rows for the "More work" list: further papers first, then smaller projects. */
export const moreWorkRows = (moreWork) => [
  ...moreWork.pubIds.map((id) => {
    const p = pub(id)
    return {
      year: p.year,
      title: p.title,
      html: `${p.authorsHtml.replace(/<\/?strong>/g, '')} · ${stripTags(p.venueHtml)}`,
      links: p.links.map((l) => ({ label: l.label, href: absolute(l) })),
      image: moreWork.pubImages?.[id],
    }
  }),
  ...moreWork.projects,
]

/* CSS custom properties carrying a project's brand colours. */
export const brandVars = (project) => ({
  '--c': project.brand.c, '--c-deep': project.brand.deep, '--c-tint': project.brand.tint,
})
