import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'
import ProjectsPage from './Components/ProjectsPage'
import ContactPage from './Components/ContactPage'
import SupportPage from './Components/SupportPage'
import ServicesPage from './Components/ServicesPage'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('site-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('site-theme', theme)
  }, [theme])

  const getPage = () => {
    if (currentPath === '/services') return <ServicesPage />
    if (currentPath === '/projects' || currentPath === '/blogs') return <ProjectsPage />
    if (currentPath === '/contact') return <ContactPage />
    if (currentPath === '/support') return <SupportPage />
    return <Body />
  }

  return (
    <div className="app-shell">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      />
      {getPage()}
      <Footer />
    </div>
  )
}

export default App
