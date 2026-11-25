import { useEffect, useRef, useState } from 'react'

interface Props {
  categories: string[]
  value: string
  onChange: (v: string) => void
}

/** Horizontal category pills. Scrolls sideways when it must; arrows appear only if there is overflow. */
export default function FilterBar({ categories, value, onChange }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ left: false, right: false })

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const read = () => setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
    read()
    el.addEventListener('scroll', read, { passive: true })
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', read)
      ro.disconnect()
    }
  }, [categories.length])

  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })
  const all = ['All', ...categories]

  return (
    <div className="cg-filters">
      {edge.left && (
        <button type="button" className="cg-filters__arrow cg-filters__arrow--l" onClick={() => nudge(-1)} aria-label="Scroll categories left">
          ‹
        </button>
      )}
      <div ref={scroller} className="cg-filters__row" role="group" aria-label="Filter by category">
        {all.map((c) => (
          <button key={c} type="button" className={`cg-chip${c === value ? ' is-on' : ''}`} aria-pressed={c === value} onClick={() => onChange(c)}>
            {c}
          </button>
        ))}
      </div>
      {edge.right && (
        <button type="button" className="cg-filters__arrow cg-filters__arrow--r" onClick={() => nudge(1)} aria-label="Scroll categories right">
          ›
        </button>
      )}
    </div>
  )
}
