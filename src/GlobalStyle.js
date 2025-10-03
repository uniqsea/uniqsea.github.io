import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
    --bg: #f8f8f8;
    --bg-alt: #fafafa;
    --surface: #f8f8f8;
    --surface-hover: #f6f6f6;
    --fg: #111111;
    --muted: #6b7280;
    --accent: #ef4444; /* minimal accent: soft red */
    --border: rgba(17, 17, 17, 0.12);
    --shadow: transparent; /* minimal: no drop shadows */
    --shadow-lg: none;
    --glass: transparent;
    --glass-border: transparent;
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0b0b0c;
      --bg-alt: #0f1115;
      --surface: #0f1115;
      --surface-hover: #14161b;
      --fg: #f3f4f6;
      --muted: #9aa3af;
      --accent: #f87171; /* dark accent */
      --border: rgba(243, 244, 246, 0.16);
      --shadow: transparent;
      --shadow-lg: none;
      --glass: transparent;
      --glass-border: transparent;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    html { scroll-behavior: auto; }
  }

  * { box-sizing: border-box; }
  
  html { 
    -webkit-font-smoothing: antialiased; 
    text-rendering: optimizeLegibility; 
    scroll-behavior: smooth;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
  
  body { 
    margin: 0; 
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
    background: var(--bg); 
    color: var(--fg); 
    line-height: 1.7; 
    font-size: 16px;
    font-weight: 400;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 { 
    font-weight: 600; 
    line-height: 1.2; 
    letter-spacing: -0.02em;
    margin: 0;
    color: var(--fg);
    font-feature-settings: "liga", "kern", "onum";
  }
  /* Minimal: keep a single sans family throughout */
  h1, h2, h3 { font-family: inherit; }
  
  h1 { font-size: clamp(2.6rem, 5vw, 3.8rem); letter-spacing: -0.035em; }
  h2 { font-size: clamp(2rem, 4vw, 2.5rem); }
  h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); }
  
  p { 
    margin: 0 0 1em; 
    max-width: 65ch; 
    line-height: 1.7;
  }
  
  a { 
    color: inherit; 
    text-decoration: none; 
    transition: all 0.2s ease;
  }
  
  a:hover { text-decoration: underline; text-underline-offset: 3px; }
  
  img { 
    max-width: 100%; 
    height: auto;
    display: block; 
  }
  
  ::selection { background: rgba(0,0,0,0.12); color: inherit; text-shadow: none; }
  
  :focus-visible { 
    outline: 2px solid var(--accent); 
    outline-offset: 2px; 
    border-radius: 4px; 
  }
  
  /* Minimal: leave hooks but avoid heavy motion by default */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fadeInUp 0.35s ease-out forwards; }
  
  /* Accessible skip link */
  .skip-link { 
    position: fixed; 
    left: 16px; 
    top: -60px; 
    padding: 12px 16px; 
    background: var(--accent); 
    color: #fff; 
    border-radius: 8px; 
    z-index: 1000; 
    text-decoration: none; 
    font-size: 14px;
    font-weight: 500;
    box-shadow: var(--shadow-lg);
    transition: top 0.3s ease;
  }
  
  .skip-link:focus { 
    top: 16px; 
  }
`
