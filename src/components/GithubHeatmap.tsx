import { useEffect, useMemo, useState } from 'react'

const COLORS = ['#E0DDD6', '#A8C9B0', '#5A9E72', '#2A6B45', '#1A4229']

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

export default function GithubHeatmap() {
  const [contribs, setContribs] = useState<ContribDay[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/sudhanshu19102003?y=last')
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
        <span className="heatmap-label">GitHub contributions</span>
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
              maxHeight: '140px'
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
    </div>
  )
}
