import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GlobalStyle } from './GlobalStyle.js'
import { SitePreferencesProvider } from './context/SitePreferences.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SitePreferencesProvider>
        <GlobalStyle />
        <App />
      </SitePreferencesProvider>
    </BrowserRouter>
  </StrictMode>,
)
