import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Deterministic floating stars and dust, so the field looks the same on every render. */
function useSparkles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 97.13 + n * 13.7) * 10000
          return x - Math.floor(x)
        }
        return {
          id: i,
          left: `${(r(1) * 100).toFixed(1)}%`,
          top: `${(r(2) * 100).toFixed(1)}%`,
          size: 2 + r(3) * (i % 4 === 0 ? 9 : 4),
          delay: `${(r(4) * 6).toFixed(1)}s`,
          dur: `${(5 + r(5) * 7).toFixed(1)}s`,
          star: i % 4 === 0,
        }
      }),
    [count],
  )
}

/**
 * The Next Chapter book. It is already open when the page loads: an invitation sits on the
 * right-hand page. "Turn the page" turns the leaf to reveal the personal message; "Back" turns it
 * back. Nothing here navigates away from the route.
 */
export default function NextChapterBook() {
  const reduced = useMemo(prefersReducedMotion, [])
  const [ready, setReady] = useState(reduced)
  const [turned, setTurned] = useState(false)
  const turnBtn = useRef<HTMLButtonElement>(null)
  const backBtn = useRef<HTMLButtonElement>(null)
  const first = useRef(true)
  const sparkles = useSparkles(34)

  useEffect(() => {
    if (reduced) return
    const t = window.setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [reduced])

  // Move focus to the control on the page that has just been revealed.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const t = window.setTimeout(() => (turned ? backBtn : turnBtn).current?.focus({ preventScroll: true }), reduced ? 0 : 700)
    return () => clearTimeout(t)
  }, [turned, reduced])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const onButton = (e.target as HTMLElement | null)?.tagName === 'BUTTON' || (e.target as HTMLElement | null)?.tagName === 'A'
      if (e.key === 'ArrowRight' && !turned && ready) setTurned(true)
      if (e.key === 'ArrowLeft' && turned) setTurned(false)
      void onButton
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turned, ready])

  return (
    <section className="nc-intro" data-ready={ready} data-turn={turned} aria-label="The next chapter">
      <div className="nc-glow" aria-hidden="true" />
      <div className="nc-sparkles" aria-hidden="true">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className={`nc-spark${s.star ? ' nc-spark--star' : ''}`}
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }}
          />
        ))}
      </div>

      <Link to="/" className="nc-skip">
        Home
      </Link>

      <div className="nc-scene">
        <div className="nc-book">
          <span className="nc-book__shadow" aria-hidden="true" />
          <div className="nc-left" aria-hidden="true">
            <span className="nc-board nc-board--l" />
            <span className="nc-page nc-page--l">
              <svg className="nc-orn" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M20 70 C 34 40, 66 40, 80 70" />
                <path d="M30 70 C 40 52, 60 52, 70 70" />
                <path d="M50 22 v8 M46 26 h8 M72 30 v6 M69 33 h6 M28 34 v6 M25 37 h6" />
              </svg>
            </span>
          </div>
          <span className="nc-board nc-board--r" aria-hidden="true" />
          <span className="nc-page nc-page--r">
            {/* revealed when the leaf has turned */}
            <svg className="nc-orn" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M50 14 L54 46 L86 50 L54 54 L50 86 L46 54 L14 50 L46 46 Z" />
              <circle cx="50" cy="50" r="30" strokeDasharray="1 5" />
            </svg>
            <button ref={backBtn} type="button" className="nc-back" onClick={() => setTurned(false)} tabIndex={turned ? 0 : -1} aria-hidden={!turned}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              Back
            </button>
          </span>

          <div className="nc-leaf">
            <div className="nc-leaf__front" aria-hidden={turned}>
              <p className="nc-line">
                <span>I wonder what</span> <span>the next chapter</span> <span>holds...</span>
              </p>
              <button ref={turnBtn} type="button" className="nc-invite" onClick={() => setTurned(true)} tabIndex={ready && !turned ? 0 : -1} aria-hidden={!ready || turned}>
                Turn the page
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            <div className="nc-leaf__back" aria-hidden={!turned}>
              <p className="nc-message">It's in the hands of the author. We'll see what magic is still waiting for me.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
