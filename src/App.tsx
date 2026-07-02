import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Research from './components/Research'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrefetchVideos from './components/PrefetchVideos'

export default function App() {
  return (
    <>
      <PrefetchVideos />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Research />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
