import { useEffect, useRef } from 'react'

const THUMB_H = 44

/** Thin green line with a rectangle that travels down it; replaces the native page scrollbar. */
export default function ScrollBar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const track = trackRef.current
      const thumb = thumbRef.current
      if (!track || !thumb) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      thumb.style.transform = `translateY(${p * (track.clientHeight - THUMB_H)}px)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Click or drag anywhere on the track to scroll the page
  const seek = (clientY: number) => {
    const track = trackRef.current
    if (!track) return
    const r = track.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (clientY - r.top - THUMB_H / 2) / (r.height - THUMB_H)))
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: p * max, behavior: 'instant' })
  }

  return (
    <div
      ref={trackRef}
      className="page-scrollbar"
      onPointerDown={e => {
        e.currentTarget.setPointerCapture(e.pointerId)
        seek(e.clientY)
      }}
      onPointerMove={e => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) seek(e.clientY)
      }}
      aria-hidden="true"
    >
      <div className="page-scrollbar-thumb" ref={thumbRef} style={{ height: THUMB_H }} />
    </div>
  )
}
