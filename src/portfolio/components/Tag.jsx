// A small pill for venues and awards, matching the site's Badge (src/components/Badge.jsx).
// Colours come from the portfolio's own tokens, since this page stays light in dark mode.
import styled from 'styled-components'

const Tag = styled.span`
  display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px;
  font: 600 11px/1 var(--body-font); letter-spacing: 0.01em; white-space: nowrap; vertical-align: middle;
  color: var(--muted); border: 1px solid var(--line); background: transparent;
  &.accent { color: #fff; background: var(--c-deep); border-color: transparent; }
`

export const Tags = styled.span`
  display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px;
`

export default Tag
