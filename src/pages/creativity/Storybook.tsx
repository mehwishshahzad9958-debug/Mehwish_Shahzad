import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CreativeImage } from '../../data/creativity'
import './storybook.css'

/**
 * A small digital storybook. Every image is one page; turning a page swings that leaf around the spine
 * (CSS 3D, no library) and reveals the next page underneath. Pages keep their own proportions: the book
 * takes the shape of the first image and any other size is letterboxed on the paper, never cropped.
 *
 * Controls: Previous / Next buttons, clicking the page (right side turns forward, the left edge turns
 * back), a swipe, and the arrow keys. Escape and the close button belong to the surrounding dialog.
 */
export default function Storybook({ title, pages, originalUrl }: { title: string; pages: CreativeImage[]; originalUrl?: string }) {
  const [cur, setCur] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [failed, setFailed] = useState(false)
  const swipe = useRef<number | null>(null)
  /** A swipe also ends in a click on the tap zones; that click must not turn a second page. */
  const swiped = useRef(false)
  const n = pages.length
  const ready = loaded >= n
  const first = pages[0]
  const ratio = useMemo(() => (first?.width && first?.height ? first.width / first.height : 4 / 3), [first])

  const go = useCallback(
    (to: number) => {
      if (!ready) return
      setCur((c) => Math.max(0, Math.min(n - 1, typeof to === 'number' ? to : c)))
    },
    [n, ready],
  )
  const next = useCallback(() => go(cur + 1), [go, cur])
  const prev = useCallback(() => go(cur - 1), [go, cur])

  // Arrow keys turn pages while the book is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Preload every page so a turn never reveals an empty one.
  useEffect(() => {
    let alive = true
    let done = 0
    pages.forEach((p) => {
      const im = new Image()
      const finish = () => {
        if (!alive) return
        done += 1
        setLoaded(done)
      }
      im.onload = finish
      im.onerror = () => {
        if (alive) setFailed(true)
        finish()
      }
      im.src = p.src
    })
    return () => { alive = false }
  }, [pages])

  return (
    <div className="sb" style={{ '--sb-ratio': String(ratio) } as React.CSSProperties}>
      <div className="sb__stage">
        <div
          className="sb__book"
          data-ready={ready}
          role="group"
          aria-roledescription="book"
          aria-label={title}
          onPointerDown={(e) => { swipe.current = e.clientX; swiped.current = false }}
          onPointerUp={(e) => {
            if (swipe.current === null) return
            const dx = e.clientX - swipe.current
            swipe.current = null
            if (Math.abs(dx) > 50) swiped.current = true
            if (dx < -50) next()
            else if (dx > 50) prev()
          }}
        >
          <span className="sb__board" aria-hidden="true" />
          {pages.map((p, i) => {
            const flipped = i < cur
            return (
              <div key={p.src} className="sb__leaf" data-flipped={flipped} aria-hidden={i !== cur} style={{ zIndex: flipped ? n + i + 1 : n - i }}>
                <div className="sb__face sb__face--front">
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} draggable={false} />
                  <span className="sb__spine" aria-hidden="true" />
                  <span className="sb__shade" aria-hidden="true" />
                </div>
                <div className="sb__face sb__face--back" aria-hidden="true" />
              </div>
            )
          })}
          {!ready && !failed && <span className="sb__loading" role="status">Opening the book…</span>}
          {failed && <span className="sb__loading" role="alert">This page could not be loaded. Please close the book and try again.</span>}
          {/* Tap zones on the page itself: left edge turns back, the rest turns forward. */}
          <button type="button" className="sb__zone sb__zone--prev" onClick={() => (swiped.current ? (swiped.current = false) : prev())} tabIndex={-1} aria-hidden="true" disabled={cur === 0} />
          <button type="button" className="sb__zone sb__zone--next" onClick={() => (swiped.current ? (swiped.current = false) : next())} tabIndex={-1} aria-hidden="true" disabled={cur === n - 1} />
        </div>
      </div>

      <div className="sb__bar">
        <button type="button" className="sb__btn" onClick={prev} disabled={!ready || cur === 0} aria-label="Previous page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <p className="sb__count" aria-live="polite">
          Page {cur + 1} of {n}
        </p>
        <button type="button" className="sb__btn" onClick={next} disabled={!ready || cur === n - 1} aria-label="Next page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        {originalUrl && (
          <a className="sb__orig" href={originalUrl} target="_blank" rel="noopener noreferrer">
            Open original PDF ↗
          </a>
        )}
      </div>
    </div>
  )
}
