// Tokens, page shell and layout primitives of the interactive portfolio.
// Same system as the deck (Manrope headings, Roboto body, graphite on white), set in px for screens.
import styled, { createGlobalStyle } from 'styled-components'

export const BP = { tablet: 900, phone: 600 }
export const media = {
  tablet: `@media (max-width: ${BP.tablet}px)`,
  phone: `@media (max-width: ${BP.phone}px)`,
}

/* The paper figures are drawn on white, so this page stays light in dark mode too. */
export const WebGlobal = createGlobalStyle`
  html, body { background: #ffffff !important; }
  html { scroll-behavior: smooth; overflow-anchor: none; } /* LangProvider keeps the reading position itself */
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

  /* Language switch (LangProvider): the old text fades out completely, then the new text fades in,
     so the two layouts never overlap as a double image. The top bar has its own layer and stays put. */
  @keyframes portfolio-lang-out { to { opacity: 0; } }
  @keyframes portfolio-lang-in { from { opacity: 0; } }
  ::view-transition-old(root) { animation: portfolio-lang-out 0.22s ease-in both; }
  ::view-transition-new(root) { animation: portfolio-lang-in 0.34s ease-out 0.22s both; }
  ::view-transition-group(portfolio-bar) { animation-duration: 0.3s; }
`

export const Page = styled.main`
  --fg: #111111;
  --muted: #5f6672;
  --line: rgba(17, 17, 17, 0.12);
  --paper: #ffffff;
  --alt: #f6f6f4;
  --body-font: Roboto, -apple-system, 'Segoe UI', sans-serif;
  --bar: 65px; /* set to the top bar's real height by TopBar */
  --c: #111111; --c-deep: #111111; --c-tint: #f6f6f4;
  color: var(--fg);
  background: var(--paper);
  font: 400 16px/1.65 var(--body-font);
  -webkit-font-smoothing: antialiased;

  p { margin: 0; max-width: none; text-wrap: pretty; }
  a, a:hover { color: inherit; text-decoration: none; }
  h1, h2, h3 { margin: 0; color: var(--fg); font-family: var(--heading-font); text-wrap: balance; letter-spacing: -0.02em; }
  ::selection { background: var(--c-tint); }

  /* Chinese: CJK fallbacks after the Latin faces, and no tight tracking or display leading on Han text. */
  &:lang(zh) {
    --cjk: 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
    --body-font: Roboto, -apple-system, var(--cjk);
    --heading-font: 'Manrope', -apple-system, var(--cjk);
    h2, h3 { letter-spacing: 0 !important; line-height: 1.3 !important; }
    p, li, figcaption, blockquote { line-height: 1.75; }
  }
`

export const Container = styled.div`
  width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 64px);
`

export const Label = styled.span`
  font: 500 12px/1.5 var(--body-font); letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
  &:lang(zh) { letter-spacing: 0.06em; }
`
