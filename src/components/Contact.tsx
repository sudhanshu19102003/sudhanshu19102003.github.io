import { CONTACT_LINKS, CERTS } from '../data'

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-num">05</span>
          <h2 className="section-title">Let's talk</h2>
        </div>
        <div className="contact-grid">
          <div>
            <h3 className="contact-heading">
              Have a hard<br /><em>problem?</em>
            </h3>
            <p className="contact-sub">
              I'm always interested in work that involves AI systems, research, or building
              infrastructure that has to actually hold up. Drop me a message.
            </p>
            <div className="contact-links">
              {CONTACT_LINKS.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link-item"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span className="contact-link-label">{label}</span>
                  <span className="contact-link-value">{value}</span>
                  <span className="contact-link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-right">
            <p className="cert-section-label">Certifications</p>
            {CERTS.map(({ title, issuer, id, light }) => (
              <div key={id} className={`cert-card${light ? ' cert-card--light' : ''}`}>
                <div className="cert-title">{title}</div>
                <div className="cert-issuer">{issuer}</div>
                <div className="cert-id">{id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
