// Portfolio content, shared by the interactive page (/portfolio, public but unlisted) and the
// PDF page (/portfolio-static, local-only in src/local/).
// Paper metadata (title, authors, venue, links, award) comes from src/data/publications.js;
// everything here is page copy, quoted or lightly adapted from each paper and the authors' sources.

/*
  Each project: brand tokens from its own logo, an opener, then content pages.

  A page is composed freely on the 12-column grid, sized around its figures:
    page  = { section, rows: [row] }
    row   = { cells: [cell], align?, push?, tight?, template? }
              align     vertical alignment of the cells (default 'start'); 'stretch' lets
                        a cell pin its `bottom` blocks to the foot of the row
              tight     stays attached to the row above (rows are otherwise spread
                        over the full height of the page)
              template  custom grid-template-columns instead of the 12 columns
    cell  = { cols: [first, last], stack: [block], bottom?: [block] }
    block = { h } | { lead, columns? } | { p, columns? } | { label } | { bullets } | { ordered } | { findings }
          | { stats } | { note } | { step } | { quote, by } | { cap } | { fig, cap }
  **text** inside a paragraph is set bold.
  Figures are always shown whole at their own ratio: width = the cell, height follows.
  Figure files and captions are taken from the papers (and the authors' Figma sources).
*/

import teethmark from './projects/teethmark.js'
import echomind from './projects/echomind.js'
import magheart from './projects/magheart.js'

export { asset } from './assets.js'
export { contact, cover } from './profile.js'
export { moreWork } from './more.js'
export const projects = [teethmark, echomind, magheart]
