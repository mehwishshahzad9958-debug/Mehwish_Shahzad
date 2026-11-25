import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  /** Called once the intro has finished (turned, skipped or dismissed). */
  onDone: () => void
}

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
 * Full-screen storybook opening: a closed book rises, opens, a sentence appears,
 * and the visitor turns the page to reach the page content underneath.
 * ~3.5s to the invitation. "Skip intro" (or Escape) is available at all times.
 */
export default function BookIntro({ onDone }: Props) {
  const reduced = useMemo(prefersReducedMotion, [])
  const [open, setOpen] = useState(reduced)
  const [text, setText] = useState(reduced)
  const [invite, setInvite] = useState(reduced)
  const [turn, setTurn] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const timers = useRef<number[]>([])
  const inviteRef = useRef<HTMLButtonElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const sparkles = useSparkles(34)

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  const finish = (delay = 700) => {
    setLeaving(true)
    later(onDone, reduced ? 0 : delay)
  }

  // Sequence: book rises, cover opens, sentence fades in, invitation appears.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    skipRef.current?.focus()
    if (!reduced) {
      later(() => setOpen(true), 700)
      later(() => setText(true), 2200)
      later(() => setInvite(true), 3300)
    }
    const t = timers.current
    return () => {
      t.forEach(clearTimeout)
      document.body.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (invite) inviteRef.current?.focus()
  }, [invite])

  const turnPage = () => {
    if (turn || leaving) return
    setTurn(true)
    if (reduced) finish(0)
    else later(() => finish(), 1250)
  }
  const skip = () => {
    if (leaving) return
    setOpen(true)
    setText(true)
    finish(reduced ? 0 : 450)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        skip()
        return
      }
      const onButton = (e.target as HTMLElement | null)?.tagName === 'BUTTON'
      if (invite && !onButton && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
        e.preventDefault()
        turnPage()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div
      className="nc-intro"
      data-open={open}
      data-text={text}
      data-invite={invite}
      data-turn={turn}
      data-leaving={leaving}
      role="dialog"
      aria-modal="true"
      aria-label="Opening the next chapter"
    >
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

      <button ref={skipRef} type="button" className="nc-skip" onClick={skip}>
        Skip intro
      </button>

      <div className="nc-scene">
        <div className="nc-book">
          <span className="nc-book__shadow" aria-hidden="true" />
          {/* left half: appears as the cover opens */}
          <div className="nc-left" aria-hidden="true">
            <span className="nc-board nc-board--l" />
            <span className="nc-page nc-page--l" />
          </div>
          {/* right half */}
          <span className="nc-board nc-board--r" aria-hidden="true" />
          <span className="nc-page nc-page--r" aria-hidden="true" />

          {/* the leaf that is turned: its front is the right-hand page with the sentence */}
          <div className="nc-leaf">
            <div className="nc-leaf__front">
              <p className="nc-line">
                <span>I wonder what</span> <span>the next chapter</span> <span>holds...</span>
              </p>
              <button ref={inviteRef} type="button" className="nc-invite" onClick={turnPage} tabIndex={invite ? 0 : -1} aria-hidden={!invite}>
                Turn the page to discover
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
            <div className="nc-leaf__back" aria-hidden="true">
              <svg className="nc-orn" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M50 14 L54 46 L86 50 L54 54 L50 86 L46 54 L14 50 L46 46 Z" />
                <circle cx="50" cy="50" r="30" strokeDasharray="1 5" />
              </svg>
            </div>
          </div>

          {/* front cover, opens from the spine to become the left-hand page */}
          <div className="nc-cover" aria-hidden="true">
            <div className="nc-cover__front">
              <span className="nc-cover__frame" />
              <svg className="nc-cover__star" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M50 12 L55 45 L88 50 L55 55 L50 88 L45 55 L12 50 L45 45 Z" />
                <circle cx="50" cy="50" r="34" strokeDasharray="1 5" />
              </svg>
            </div>
            <div className="nc-cover__back">
              <svg className="nc-orn" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M20 70 C 34 40, 66 40, 80 70" />
                <path d="M30 70 C 40 52, 60 52, 70 70" />
                <path d="M50 22 v8 M46 26 h8 M72 30 v6 M69 33 h6 M28 34 v6 M25 37 h6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
