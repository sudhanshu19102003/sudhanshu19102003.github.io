import { useState, useEffect, useRef } from 'react'
import { PROJECTS, ProjectItem } from '../data'

const COLS = 3
const REAL_PROJECTS = PROJECTS.filter(p => !p.muted)
const MUTED_PROJECT = PROJECTS.find(p => p.muted)!

const ROW1 = REAL_PROJECTS.slice(0, COLS)                        // Steam, Book, X-Ray
const ROW2 = [...REAL_PROJECTS.slice(COLS), MUTED_PROJECT]       // ShopSense, Crypto, BizAnalytics, Muted

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

interface FeaturedPreviewProps {
  activeIdx: number
  activeProject: ProjectItem
}

function FeaturedPreview({ activeIdx, activeProject }: FeaturedPreviewProps) {
  return (
    <div className="featured-preview">
      {REAL_PROJECTS.map((project, i) => (
        <ProjectMediaItem key={project.num} project={project} isActive={i === activeIdx} />
      ))}
      <div className="featured-info">
        <div>
          <span className="featured-num">{activeProject.num}</span>
          <span className="featured-name">{activeProject.name}</span>
        </div>
        <div className="featured-actions">
          {activeProject.streamlit && (
            <a href={activeProject.streamlit} target="_blank" rel="noreferrer" className="featured-live">
              Try it
            </a>
          )}
          <a href={activeProject.github} target="_blank" rel="noreferrer" className="featured-gh">
            GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  p,
  isActive,
  onHover,
}: {
  p: ProjectItem
  isActive: boolean
  onHover: () => void
}) {
  return (
    <div
      className={`project-card${p.muted ? ' project-card--muted' : ''}${isActive ? ' project-card--active' : ''}`}
      onMouseEnter={onHover}
    >
      <div className="project-card-body">
        <div className={`project-num${p.muted ? ' project-num--muted' : ''}`}>{p.num}</div>
        <h3 className={`project-name${p.muted ? ' project-name--muted' : ''}`}>{p.name}</h3>
        <p className="project-desc">{p.desc}</p>
        {p.tags.length > 0 && (
          <div className="project-tags">
            {p.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
          </div>
        )}
        <div className="project-links">
          <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
            {p.muted ? 'See all on GitHub' : 'GitHub'}
          </a>
          {p.streamlit && (
            <a href={p.streamlit} className="project-link project-link--demo" target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeProject = REAL_PROJECTS[activeIdx] ?? REAL_PROJECTS[0]
  const activeRow = activeIdx < COLS ? 0 : 1

  const previewProps = { activeIdx, activeProject }

  return (
    <section id="projects">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Things I've built</h2>
        </div>

        {/* Preview above row 1 when hovering row 1 cards */}
        {activeRow === 0 && <FeaturedPreview {...previewProps} />}

        {/* Grid row 1 */}
        <div className={`projects-grid${activeRow === 0 ? ' projects-grid--below-preview' : ''}`}>
          {ROW1.map(p => (
            <ProjectCard
              key={p.num}
              p={p}
              isActive={REAL_PROJECTS.indexOf(p) === activeIdx}
              onHover={() => setActiveIdx(REAL_PROJECTS.indexOf(p))}
            />
          ))}
        </div>

        {/* Preview between rows when hovering row 2 cards */}
        {activeRow === 1 && <FeaturedPreview {...previewProps} />}

        {/* Grid row 2 */}
        <div className={`projects-grid${activeRow === 1 ? ' projects-grid--below-preview' : ''}`}>
          {ROW2.map(p => (
            <ProjectCard
              key={p.num}
              p={p}
              isActive={REAL_PROJECTS.indexOf(p) === activeIdx}
              onHover={() => { if (!p.muted) setActiveIdx(REAL_PROJECTS.indexOf(p)) }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
