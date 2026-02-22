import './App.css'
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'
import BlogsPage from './Components/BlogsPage'
import ContactPage from './Components/ContactPage'
import SupportPage from './Components/SupportPage'

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  const getPage = () => {
    if (currentPath === '/blogs') return <BlogsPage />
    if (currentPath === '/contact') return <ContactPage />
    if (currentPath === '/support') return <SupportPage />
    return <Body />
  }

  return (
    <div className="app-shell">
      <Header />
      {getPage()}
      <Footer />
    </div>
  )
}

export default App
