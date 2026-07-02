import { useEffect } from 'react'
import { PROJECTS } from '../data'

/** Warm the HTTP cache for project demo videos as soon as the app loads. */
export default function PrefetchVideos() {
  useEffect(() => {
    const videos = PROJECTS
      .filter((p): p is typeof p & { video: string } => Boolean(p.video))
      .map(p => {
        const el = document.createElement('video')
        el.preload = 'auto'
        el.muted = true
        el.src = p.video
        el.load()
        return el
      })

    return () => {
      videos.forEach(el => {
        el.removeAttribute('src')
        el.load()
      })
    }
  }, [])

  return null
}
