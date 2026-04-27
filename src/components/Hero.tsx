import { useEffect, useState } from 'react'
import { HERO } from '../data'
import GithubHeatmap from './GithubHeatmap'

interface Stat {
  value: string
  label: string
  sublabel?: string
  highlight?: boolean
}

export default function Hero() {
  const [contributions, setContributions] = useState('...')

  useEffect(() => {
    // Fetch GitHub contributions
    fetch('https://github-contributions-api.jogruber.de/v4/sudhanshu19102003?y=last')
      .then(r => r.ok ? r.json() : null)
      .then((data: { total?: Record<string, number> } | null) => {
        if (data?.total) {
          const total = Object.values(data.total).reduce((a, b) => a + b, 0)
          setContributions(total.toLocaleString())
        }
      })
      .catch(() => setContributions('1,200+'))
  }, [])

  const STATS: Stat[] = [
    { value: '3+', label: 'Years building', highlight: true },
    { value: contributions, label: 'GitHub contributions', sublabel: 'Last 12 months' },
    { value: 'IEEE ICPCSN', label: ' Publication', sublabel: '2025' },
    { value: 'Jurisphere', label: 'Senior Engineer', sublabel: 'Current' },
  ]

  return (
    <section className="hero" id="top">

      {/* ── LEFT: intro ── */}
      <div className="hero-left">
        <div className="hero-left-content">
          <p className="hero-tag">{HERO.tag}</p>
          <h1 className="hero-name">
            {HERO.name[0]}<br />
            <em>{HERO.name[1]}</em>
          </h1>
          <p className="hero-desc">
            I build end-to-end AI systems — from LLM agent frameworks and RAG pipelines
            to production backends and cloud infrastructure. I care about how systems{' '}
            <em>think</em>, not just how they run.
          </p>
          <div className="hero-cta">
            <a href={`mailto:${HERO.email}`} className="btn-primary">Get in touch</a>
            <a href="#projects" className="btn-outline">View work</a>
          </div>
        </div>
        <div className="hero-location">{HERO.location}</div>
      </div>

      {/* ── RIGHT: checker panel ── */}
      <div className="hero-right">
        <div className="hero-right-inner">
          {/* Stats - at top */}
          <div className="hero-stats">
            {STATS.map(s => (
              <div className="stat-card" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <span className={`stat-value ${s.highlight ? 'stat-value--lg' : ''}`}>{s.value}</span>
                {s.sublabel && <span className="stat-sublabel">{s.sublabel}</span>}
              </div>
            ))}
          </div>
          {/* GitHub heatmap - at bottom */}
          <GithubHeatmap />
        </div>
      </div>

    </section>
  )
}
