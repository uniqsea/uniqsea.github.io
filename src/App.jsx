import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Publications from './pages/Publications.jsx'
import ProjectPage from './pages/ProjectPage.jsx'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      {/* <Route path="/publications" element={<Publications />} /> */}
      <Route path=":slug" element={<ProjectPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
