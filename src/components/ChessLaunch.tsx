import { useEffect, useState } from 'react'
import { CHESS_LAUNCH as C } from '../data'

type Platform = 'unix' | 'windows'

export default function ChessLaunch() {
  const [open, setOpen] = useState(false)
  const [platform, setPlatform] = useState<Platform>(
    /win/i.test(navigator.platform) ? 'windows' : 'unix'
  )
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(C.storageKey)) return
    const t = setTimeout(() => setOpen(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    localStorage.setItem(C.storageKey, '1')
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const cmd = C.install[platform]
  const copy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }).catch(() => {})
  }

  return (
    <div className="launch-backdrop" onClick={close}>
      <div className="launch-modal" role="dialog" aria-modal="true" aria-labelledby="launch-title" onClick={e => e.stopPropagation()}>
        <button className="launch-close" onClick={close} aria-label="Close">×</button>
        <img src={C.screenshot} alt={`${C.name} gameplay`} className="launch-shot" />
        <div className="launch-body">
          <span className="launch-tag">{C.tagline}</span>
          <h3 id="launch-title" className="launch-title">{C.name}</h3>
          <p className="launch-desc">{C.desc}</p>

          <div className="launch-tabs">
            <button className={platform === 'unix' ? 'active' : ''} onClick={() => setPlatform('unix')}>macOS / Linux</button>
            <button className={platform === 'windows' ? 'active' : ''} onClick={() => setPlatform('windows')}>Windows</button>
          </div>
          <div className="launch-cmd">
            <code>{cmd}</code>
            <button onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <span className="launch-run-label">Then run</span>
          <div className="launch-cmd launch-cmd--run">
            <code><span className="launch-prompt">$</span> {C.run}</code>
          </div>

          <div className="launch-links">
            <a href={C.site} target="_blank" rel="noreferrer">Website →</a>
            <a href={C.github} target="_blank" rel="noreferrer">GitHub →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
