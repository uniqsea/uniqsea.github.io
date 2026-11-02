import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Publications from './pages/Publications.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import Moments from './pages/Moments.jsx'
import Design from './pages/Design.jsx'
import DesignDetail from './pages/DesignDetail.jsx'
import { getPageTitle } from './utils/pageTitle.js'

// Heavy three.js page — code-split so the rest of the site never loads it.
const VisitorGlobePage = lazy(() => import('./pages/VisitorGlobePage.jsx'))

export default function App(){
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = getPageTitle(pathname)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/moments" element={<Moments />} />
      <Route path="/design" element={<Design />} />
      <Route path="/design/:designId" element={<DesignDetail />} />
      <Route
        path="/design/visitor-globe"
        element={
          <Suspense fallback={null}>
            <VisitorGlobePage />
          </Suspense>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
