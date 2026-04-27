import { PROJECTS } from '../data'

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Things I've built</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(({ num, name, desc, tags, link, linkLabel, muted }) => (
            <div
              key={num}
              className={`project-card${muted ? ' project-card--muted' : ''}`}
            >
              <div className={`project-num${muted ? ' project-num--muted' : ''}`}>{num}</div>
              <h3 className={`project-name${muted ? ' project-name--muted' : ''}`}>{name}</h3>
              <p className="project-desc">{desc}</p>
              {tags.length > 0 && (
                <div className="project-tags">
                  {tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              )}
              <a href={link} className="project-link" target="_blank" rel="noreferrer">
                {linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
