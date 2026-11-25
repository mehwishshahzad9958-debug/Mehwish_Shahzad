import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { ghostStyle } from '../../../data/bookshelf'
import { buildBooks, buildEras } from './books'
import BookNote from './BookNote'
import BookSpine from './BookSpine'
import './bookshelf.css'

const GAP = 14
const SWIPE = 50
const NOTE_MAX = 330

const LEAVE_DELAY = 260
const DRAG = 8

/**
 * The professional journey as a row of upright books, one per experience.
 *
 * States: idle (nothing shown) -> preview (hover or keyboard focus shows that book's details)
 * -> selected (a click opens the chapter) -> back to idle when the visitor returns.
 * Hovering or focusing only previews. Only a click, Enter or a second tap opens a chapter.
 */
export default function Bookshelf() {
  const navigate = useNavigate()
  const books = useMemo(buildBooks, [])
  const eraGroups = useMemo(() => buildEras(books), [books])
  /** Real books plus one empty "next chapter" book. */
  const count = books.length + 1
  /** Book being previewed by hover or keyboard focus, or null when idle. */
  const [active, setActive] = useState<number | null>(null)
  /** Last previewed book, kept so the note can fade out with its content. */
  const [last, setLast] = useState(0)
  /** Book the shelf is centred on when it is wider than the screen. */
  const [pos, setPos] = useState(0)
  const [width, setWidth] = useState(1100)
  const [stageH, setStageH] = useState(880)
  const [noteH, setNoteH] = useState(290)

  const stageRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLElement>(null)
  const start = useRef<number | null>(null)
  const dragged = useRef(false)
  const pointer = useRef<string>('mouse')
  const leaveTimer = useRef<number>(0)

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => {
      setWidth(el.clientWidth)
      setStageH(el.clientHeight)
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const sizes = useMemo(() => [...books.map((b) => b.style), ghostStyle], [books])
  const geo = useMemo(() => {
    let x = 0
    return sizes.map((s) => {
      const g = { x, w: s.w, h: s.h }
      x += s.w + GAP
      return g
    })
  }, [sizes])
  const total = geo[geo.length - 1].x + geo[geo.length - 1].w
  /** Everything is visible at once: no horizontal browsing needed. */
  const fits = total <= width - 24

  const offset = fits
    ? (width - total) / 2
    : Math.max(Math.min(0, width - total - 40), Math.min(40, width / 2 - (geo[pos].x + geo[pos].w / 2)))

  const shown = active ?? last
  const shownCentre = geo[shown].x + geo[shown].w / 2

  useLayoutEffect(() => {
    if (noteRef.current) setNoteH(noteRef.current.offsetHeight)
  }, [shown, width])

  const clearLeave = () => window.clearTimeout(leaveTimer.current)
  const preview = useCallback((i: number) => {
    window.clearTimeout(leaveTimer.current)
    setActive(i)
    setLast(i)
  }, [])
  const leave = useCallback(() => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => setActive(null), LEAVE_DELAY)
  }, [])
  useEffect(() => () => window.clearTimeout(leaveTimer.current), [])

  const move = useCallback((i: number) => setPos(Math.max(0, Math.min(count - 1, i))), [count])

  /** Open a chapter: the only action that leaves the shelf. */
  const open = (i: number) => {
    const href = i < books.length ? books[i].href : '/next-chapter'
    if (href) navigate(href)
  }

  // A tap or Escape elsewhere returns a touch preview to idle.
  useEffect(() => {
    const onDown = (e: globalThis.PointerEvent) => {
      if (e.pointerType === 'mouse') return
      if (!(e.target as HTMLElement | null)?.closest('.bk-slot, .bk-note')) setActive(null)
    }
    const onEsc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onEsc)
    }
  }, [])

  // Horizontal wheel or trackpad swipe browses the shelf. Vertical scrolling is left to the page.
  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    let lock = 0
    const onWheel = (e: WheelEvent) => {
      if (fits) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
        e.preventDefault()
        const now = Date.now()
        if (now - lock < 350) return
        lock = now
        setPos((s) => Math.max(0, Math.min(count - 1, s + (e.deltaX > 0 ? 1 : -1))))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [count, fits])

  // Arrow keys move keyboard focus between books (focus previews the book). Enter opens it.
  const onKey = (e: KeyboardEvent) => {
    const buttons = Array.from(sceneRef.current?.querySelectorAll<HTMLButtonElement>('.bk-book') ?? [])
    const cur = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (cur < 0) return
    const go = (i: number) => {
      e.preventDefault()
      buttons[Math.max(0, Math.min(buttons.length - 1, i))]?.focus()
    }
    if (e.key === 'ArrowRight') go(cur + 1)
    else if (e.key === 'ArrowLeft') go(cur - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(buttons.length - 1)
  }
  const down = (e: PointerEvent) => {
    pointer.current = e.pointerType
    start.current = e.clientX
    dragged.current = false
  }
  const up = (e: PointerEvent) => {
    if (start.current === null) return
    const dx = e.clientX - start.current
    start.current = null
    if (Math.abs(dx) > DRAG) dragged.current = true
    if (!fits && Math.abs(dx) > SWIPE) move(pos + (dx < 0 ? 1 : -1))
  }
  const onBookClick = (i: number) => {
    if (dragged.current) { dragged.current = false; return }
    // Touch has no hover: the first tap previews, a second tap on the same book opens it.
    if (pointer.current === 'touch' && active !== i) { preview(i); return }
    open(i)
  }

  const noteW = Math.min(NOTE_MAX, width - 24)
  const noteLeft = Math.max(4, Math.min(width - noteW - 4, offset + shownCentre - noteW / 2 - 30))
  const cx = offset + shownCentre
  const x0 = Math.min(noteLeft + noteW - 60, Math.max(noteLeft + 40, cx))
  const y0 = 8 + noteH
  const y1 = Math.max(y0 + 16, stageH - 96 - geo[shown].h - 46)
  const leader = `M${x0} ${y0} C ${x0} ${y0 + 40}, ${cx + 26} ${y1 - 50}, ${cx} ${y1}`
  const selBook = shown < books.length ? books[shown] : undefined
  const state = active === null ? 'idle' : 'preview'

  return (
    <div className="bk" data-state={state}>
      <div className="bk__stage" ref={stageRef}>
        {/* Quiet prompt shown only while idle */}
        <p className="bk__idle" aria-hidden="true">
          <span className="bk__idle-hover">hover over a chapter</span>
          <span className="bk__idle-touch">tap a chapter</span>
        </p>
        <svg className="bk__leader" aria-hidden="true">
          <path d={leader} />
        </svg>
        <BookNote
          ref={noteRef}
          book={selBook}
          chapter={shown + 1}
          left={noteLeft}
          width={noteW}
          visible={active !== null}
          onPointerEnter={clearLeave}
          onPointerLeave={leave}
        />

        <div
          ref={sceneRef}
          className="bk__scene"
          role="group"
          aria-roledescription="carousel"
          aria-label="Professional journey bookshelf. Focus a book to read about it, press Enter to open it."
          onKeyDown={onKey}
          onPointerDown={down}
          onPointerUp={up}
          onPointerCancel={() => { start.current = null }}
        >
          <div className="bk__fade bk__fade--l" />
          <div className="bk__fade bk__fade--r" />
          <div className="bk__track" style={{ transform: `translateX(${offset}px)` }}>
            {[...books, null].map((b, i) => {
              const s = b ? b.style : ghostStyle
              const on = active === i
              const d = active === null ? 0 : i - active
              const opens = b ? Boolean(b.href) : true
              const slotStyle = {
                width: s.w,
                height: s.h,
                '--W': `${s.w}px`,
                '--D': `${s.d}px`,
                '--bg': s.bg,
                '--fg': s.fg,
                '--side': s.side,
                '--sway': `${(i * 0.9).toFixed(1)}s`,
                transform: on
                  ? 'translateZ(120px) translateY(-6px)'
                  : active === null
                    ? 'none'
                    : `rotateY(${Math.max(-22, Math.min(22, -d * 6))}deg)`,
                zIndex: on ? 5 : active === null ? 1 : Math.max(1, 4 - Math.abs(d)),
              } as CSSProperties
              const title = b ? b.organization : 'The next chapter'
              const year = b ? b.yearLabel : ''
              return (
                <div
                  key={b ? b.id : 'next'}
                  className={`bk-slot${on ? ' is-sel' : ''}${b?.pending ? ' is-pending' : ''}${b ? '' : ' is-ghost'}`}
                  style={slotStyle}
                  onPointerEnter={(e) => { if (e.pointerType !== 'touch') preview(i) }}
                  onPointerLeave={(e) => { if (e.pointerType !== 'touch') leave() }}
                >
                  <span className="bk-tag" aria-hidden="true">{b ? (b.startYear || '') : 'next'}</span>
                  <span className="bk-halo" />
                  <span className="bk-cast" />
                  <button
                    type="button"
                    className="bk-book"
                    style={{ width: s.w, height: s.h }}
                    aria-disabled={!opens}
                    aria-label={b ? `${title}${year ? `, ${year}` : ''}${b.pending ? ', details to be confirmed' : opens ? ', open chapter' : ', details page coming soon'}` : 'The next chapter, open'}
                    onFocus={(e) => {
                      // Keyboard focus previews like hover; a mouse click's focus does not.
                      if (e.currentTarget.matches(':focus-visible')) {
                        preview(i)
                        if (!fits) move(i)
                      }
                    }}
                    onBlur={() => setActive((a) => (a === i && pointer.current !== 'touch' ? null : a))}
                    onClick={() => onBookClick(i)}
                  >
                    <BookSpine style={s} title={title} year={year} ghost={!b} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bk__ledge" />
        <div className="bk__eras" aria-hidden="true">
          {eraGroups.map((g) => {
            const x1 = offset + geo[g.from].x
            const x2 = offset + geo[g.to].x + geo[g.to].w
            return (
              <div key={g.from} className="bk-era" style={{ left: x1, width: x2 - x1 }}>
                <svg viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0 2C0 8 4 9 8 9H92C96 9 100 8 100 2" vectorEffect="non-scaling-stroke" />
                </svg>
                <span>{g.range}</span>
                {g.label}
              </div>
            )
          })}
        </div>
      </div>

      {/* Browsing controls only when the shelf is wider than the screen */}
      {!fits && (
        <div className="bk__ctl">
          <button type="button" className="bk-arrow" onClick={() => move(pos - 1)} disabled={pos === 0} aria-label="Show earlier chapters">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="bk-knots">
            {[...books.map((b) => b.organization), 'Next chapter'].map((name, i) => (
              <button key={name} type="button" className={i === pos ? 'is-on' : ''} onClick={() => move(i)} aria-label={`Scroll the shelf to ${name}`} aria-current={i === pos}>
                <i />
              </button>
            ))}
          </div>
          <button type="button" className="bk-arrow" onClick={() => move(pos + 1)} disabled={pos === count - 1} aria-label="Show later chapters">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <span className="bk__hint">Scroll, drag or swipe the shelf</span>
        </div>
      )}
    </div>
  )
}
