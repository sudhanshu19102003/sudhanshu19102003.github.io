import { useEffect, useMemo, useState } from 'react'
import { GITHUB_USERNAME } from '../data'

const COLORS = ['#D8D4CC', '#6DB88A', '#4A9468', '#2A6B45', '#1A4229']
const GITHUB_HEADERS = { Accept: 'application/vnd.github+json' }

type ContribDay = [string, number, number] // [date, level, count]

interface ApiDay {
  date: string
  count: number
  level: number
}

interface ApiResponse {
  total: Record<string, number>
  contributions: ApiDay[]
}

interface GitHubUser {
  public_repos: number
  created_at: string
}

interface GitHubRepo {
  stargazers_count: number
}

interface PublicKpi {
  value: string
  label: string
}

function buildWeeks(contribs: ContribDay[]) {
  const weeks: ContribDay[][] = []
  let week: ContribDay[] = []
  for (const day of contribs) {
    const dow = new Date(day[0] + 'T00:00:00').getDay()
    if (dow === 0 && week.length > 0) {
      weeks.push(week)
      week = []
    }
    week.push(day)
  }
  if (week.length) weeks.push(week)
  return weeks
}

async function fetchPublicKpis(username: string): Promise<PublicKpi[]> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: GITHUB_HEADERS }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers: GITHUB_HEADERS }),
  ])
  if (!userRes.ok || !reposRes.ok) throw new Error('github fetch failed')

  const user = await userRes.json() as GitHubUser
  const repos = await reposRes.json() as GitHubRepo[]
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const yearsOnGithub = Math.max(
    1,
    Math.floor((Date.now() - new Date(user.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
  )

  return [
    { value: user.public_repos.toLocaleString(), label: 'public repos' },
    { value: totalStars.toLocaleString(), label: 'stars' },
    {
      value: yearsOnGithub.toLocaleString(),
      label: yearsOnGithub === 1 ? 'yr on GitHub' : 'yrs on GitHub',
    },
  ]
}

export default function GithubHeatmap() {
  const [contribs, setContribs] = useState<ContribDay[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [kpis, setKpis] = useState<PublicKpi[]>([])
  const [kpiStatus, setKpiStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then(r => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json() as Promise<ApiResponse>
      })
      .then(data => {
        const days: ContribDay[] = data.contributions.map(d => [d.date, d.level, d.count])
        setContribs(days)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    fetchPublicKpis(GITHUB_USERNAME)
      .then(setKpis)
      .then(() => setKpiStatus('ok'))
      .catch(() => setKpiStatus('error'))
  }, [])

  const weeks = useMemo(() => buildWeeks(contribs), [contribs])

  const cellSize = 10
  const gap = 3
  const step = cellSize + gap
  const topPad = 18
  const W = weeks.length * step
  const H = 7 * step + topPad
  const labelFontSize = 9

  const monthLabels: { x: number; label: string }[] = []
  let lastMonth = -1
  let lastLabelX = -999
  const minLabelGap = step * 3 // at least 3 weeks between labels
  weeks.forEach((wk, wi) => {
    const d = new Date(wk[0][0] + 'T00:00:00')
    const m = d.getMonth()
    const x = wi * step
    if (m !== lastMonth && x - lastLabelX >= minLabelGap) {
      monthLabels.push({ x, label: d.toLocaleString('default', { month: 'short' }) })
      lastMonth = m
      lastLabelX = x
    }
  })

  return (
    <div className="heatmap-wrap">
      <div className="heatmap-header">
        <span className="heatmap-label" style={{ fontSize: '12px' }}>GitHub contributions</span>
      </div>
      <div className="heatmap-svg-wrap">
        {status === 'loading' && (
          <div className="hm-skeleton" />
        )}
        {status === 'error' && (
          <div className="heatmap-status">—</div>
        )}
        {status === 'ok' && (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              maxHeight: '140px',
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {monthLabels.map(({ x, label }) => (
              <text
                key={label + x}
                x={x}
                y={topPad - 4}
                fontSize={labelFontSize}
                fontFamily="'DM Mono', monospace"
                fill="#8A8780"
              >
                {label}
              </text>
            ))}
            {weeks.map((wk, wi) => {
              const firstDow = new Date(wk[0][0] + 'T00:00:00').getDay()
              return wk.map((day, di) => {
                const row = firstDow + di
                if (row > 6) return null
                const [date, level, count] = day
                const delay = (wi * 18 + row * 4) / 1000
                return (
                  <rect
                    key={date}
                    x={wi * step}
                    y={row * step + topPad}
                    width={cellSize}
                    height={cellSize}
                    rx={3}
                    fill={COLORS[Math.min(level, 4)]}
                    className="hm-cell"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <title>{date}: {count} contribution{count !== 1 ? 's' : ''}</title>
                  </rect>
                )
              })
            })}
          </svg>
        )}
      </div>
      {kpiStatus !== 'error' && (
        <p className="heatmap-activity">
          {kpiStatus === 'loading' && 'Loading public stats…'}
          {kpiStatus === 'ok' && kpis.map((kpi, i) => (
            <span className="heatmap-activity-item" key={kpi.label}>
              {i > 0 && <span className="heatmap-activity-sep" aria-hidden="true">·</span>}
              <span className="heatmap-activity-value">{kpi.value}</span>{' '}
              <span className="heatmap-activity-label">{kpi.label}</span>
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
