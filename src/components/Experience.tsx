import { EXPERIENCE } from '../data'

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="experience-list">
          {EXPERIENCE.map(({ period, company, role, points }) => (
            <div key={company} className="exp-item">
              <div className="exp-meta">
                <div className="exp-period">{period}</div>
                <div className="exp-company">{company}</div>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">{role}</h3>
                <ul className="exp-points">
                  {points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
