import { ABOUT_PARAGRAPHS, SKILLS } from '../data'

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2 className="section-title">How I think</h2>
        </div>
        <div className="about-grid">
          <div
            className="about-text"
            dangerouslySetInnerHTML={{
              __html: ABOUT_PARAGRAPHS.map(p => `<p>${p}</p>`).join(''),
            }}
          />
          <div className="skills-block">
            {SKILLS.map(({ category, tags }) => (
              <div key={category} className="skill-category">
                <div className="skill-cat-name">{category}</div>
                <div className="skill-tags">
                  {tags.map(tag => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
