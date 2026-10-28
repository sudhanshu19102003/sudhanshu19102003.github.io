import { useState, useEffect, useRef } from 'react'
import { PROJECTS, ProjectItem } from '../data'

const REAL_PROJECTS = PROJECTS

function ProjectMediaItem({ project, isActive }: { project: ProjectItem; isActive: boolean }) {
  const [slide, setSlide] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { setSlide(0) }, [project.num])

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || !project.images || project.images.length <= 1) return
    const t = setInterval(() => setSlide(s => (s + 1) % project.images!.length), 3500)
    return () => clearInterval(t)
  }, [isActive, project.images])

  return (
    <div className={`featured-media-item${isActive ? ' featured-media-item--active' : ''}`}>
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted loop playsInline
          preload="auto"
          className="featured-video"
        />
      )}
      {!project.video && project.images && project.images.map((src, i) => (
        <img
          key={i}
          src={src}
          loading="eager"
          alt={`${project.name} preview`}
          className={`featured-img${i === slide ? ' featured-img--active' : ''}`}
        />
      ))}
      {!project.video && !project.images && (
        <div className="featured-empty">
          <span className="featured-empty-label">No preview available</span>
        </div>
      )}
      {isActive && project.images && project.images.length > 1 && (
        <div className="featured-dots">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`featured-dot${i === slide ? ' featured-dot--active' : ''}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FeaturedPreview({ activeIdx }: { activeIdx: number }) {
  return (
    <div className="featured-preview">
      {REAL_PROJECTS.map((project, i) => (
        <ProjectMediaItem key={project.num} project={project} isActive={i === activeIdx} />
      ))}
    </div>
  )
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [touched, setTouched] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const activeProject = REAL_PROJECTS[activeIdx] ?? REAL_PROJECTS[0]
  const count = REAL_PROJECTS.length

  const step = (dir: 1 | -1) => setActiveIdx(i => (i + dir + count) % count)

  // Keep the active card visible inside the scrolling list
  useEffect(() => {
    const list = listRef.current
    const card = list?.querySelector<HTMLElement>(`[data-project="${activeProject.num}"]`)
    if (!list || !card) return
    if (card.offsetTop < list.scrollTop || card.offsetTop + card.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: card.offsetTop - 8, behavior: 'smooth' })
    }
  }, [activeProject.num])

  // Autoplay only runs once the section is actually on screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // While the section is pinned on desktop, scrolling steps through the projects
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    let last = -1
    const onScroll = () => {
      const pin = pinRef.current
      if (!pin || !desktop.matches) return
      const rect = pin.getBoundingClientRect()
      const travel = rect.height - (window.innerHeight - 60)
      if (travel <= 0 || rect.top > 60 || rect.bottom < window.innerHeight) return
      const idx = Math.min(count - 1, Math.max(0, Math.floor((-(rect.top - 60) / travel) * count)))
      if (idx !== last) {
        last = idx
        setActiveIdx(idx)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [count])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); step(1) }
    if (e.key === 'ArrowUp') { e.preventDefault(); step(-1) }
  }

  return (
    <div className="projects-pin" ref={pinRef} style={{ ['--steps' as string]: count }}>
    <section id="projects" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Things I've built</h2>
        </div>

        <div
          className={`projects-showcase${touched ? ' projects-showcase--manual' : ''}${inView ? '' : ' projects-showcase--idle'}`}
          onTouchStart={() => setTouched(true)}
        >
          <div className="showcase-list" ref={listRef} onKeyDown={onKeyDown}>
            {REAL_PROJECTS.map((p, i) => (
              <article
                key={p.num}
                data-project={p.num}
                tabIndex={0}
                className={`pcard${i === activeIdx ? ' pcard--active' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
              >
                {/* Autoplay timer: fills, then the next card becomes active */}
                {i === activeIdx && <span className="project-progress" onAnimationEnd={() => step(1)} />}
                <div className="pcard-title">
                  <span className="project-num">{p.num}</span>
                  <h3 className="pcard-name">{p.name}</h3>
                </div>
                <p className="pcard-desc">{p.desc}</p>
              </article>
            ))}
          </div>

          <div className="showcase-main">
            <FeaturedPreview activeIdx={activeIdx} />
            <div className="showcase-meta" key={activeProject.num}>
              <div className="project-tags">
                {activeProject.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
              <div className="project-links">
                <a href={activeProject.github} className="project-link" target="_blank" rel="noreferrer">GitHub</a>
                {activeProject.streamlit && (
                  <a href={activeProject.streamlit} className="project-link project-link--demo" target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
