import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
    --bg: #f8f8f8;
    --bg-alt: #fafafa;
    --surface: #f8f8f8;
    --surface-hover: #f6f6f6;
    --fg: #111111;
    --muted: #5f6672;
    --accent: #252525; /* graphite signature accent */
    --accent-contrast: #ffffff;
    --signal-red: #ef4444;
    --border: rgba(17, 17, 17, 0.12);
    --shadow: transparent; /* minimal: no drop shadows */
    --shadow-lg: none;
    --glass: transparent;
    --glass-border: transparent;
    --icon-filter: none;
    --heading-font: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  :root[data-theme='dark'] {
      --bg: #0b0b0c;
      --bg-alt: #0f1115;
      --surface: #0f1115;
      --surface-hover: #14161b;
      --fg: #f3f4f6;
      --muted: #a6adb8;
      --accent: #dad6cc; /* dark graphite signature accent */
      --accent-contrast: #111111;
      --signal-red: #f87171;
      --border: rgba(243, 244, 246, 0.16);
      --shadow: transparent;
      --shadow-lg: none;
      --glass: transparent;
      --glass-border: transparent;
      --icon-filter: invert(1) brightness(1.08);
  }

  :root[data-theme='light'] {
    --bg: #f8f8f8;
    --bg-alt: #fafafa;
    --surface: #f8f8f8;
    --surface-hover: #f6f6f6;
    --fg: #111111;
    --muted: #5f6672;
    --accent: #252525;
    --accent-contrast: #ffffff;
    --signal-red: #ef4444;
    --border: rgba(17, 17, 17, 0.12);
    --icon-filter: none;
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
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, sans-serif; 
    background: var(--bg); 
    color: var(--fg); 
    line-height: 1.7; 
    font-size: 16px;
    font-weight: 400;
    overflow-x: hidden;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  h1, h2, h3, h4, h5, h6 { 
    font-family: var(--heading-font);
    font-weight: 600; 
    line-height: 1.2; 
    letter-spacing: -0.02em;
    margin: 0;
    color: var(--fg);
    font-feature-settings: "liga", "kern", "onum";
  }
  
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
    color: var(--accent-contrast); 
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
