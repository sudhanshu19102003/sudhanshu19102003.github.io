import { RESEARCH } from '../data'

export default function Research() {
  const { label, title, venue, desc, badge } = RESEARCH
  return (
    <section id="research">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">03</span>
          <h2 className="section-title">Research</h2>
        </div>
        <div className="research-card">
          <div>
            <div className="research-label">{label}</div>
            <h3 className="research-title">{title}</h3>
            <div className="research-venue">{venue}</div>
            <p className="research-desc">{desc}</p>
          </div>
          <div className="research-badge">
            <span className="research-badge-text">{badge.text}</span>
            <span className="research-badge-sub">{badge.sub}</span>
            <span className="research-badge-sub" style={{ marginTop: '0.75rem' }}>{badge.year}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
