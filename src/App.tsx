import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Research from './components/Research'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChessLaunch from './components/ChessLaunch'
import ScrollBar from './components/ScrollBar'
import PrefetchVideos from './components/PrefetchVideos'

export default function App() {
  return (
    <>
      <PrefetchVideos />
      <ScrollBar />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Research />
      <Projects />
      <Contact />
      <Footer />
      <ChessLaunch />
    </>
  )
}
