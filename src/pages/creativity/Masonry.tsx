import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export interface MasonryItem {
  id: string
  /** Width divided by height of the item's media. */
  ratio: number
}

/** Columns for the available width: two on phones, three on tablets, four on desktop. */
function columnsFor(width: number) {
  if (width < 560) return 2
  if (width < 900) return 3
  return 4
}

/**
 * A Pinterest-style masonry: items keep their own heights and are dealt, in order,
 * to whichever column is currently shortest. That keeps reading order roughly
 * left-to-right and balances the columns, with no layout library.
 */
export default function Masonry<T extends MasonryItem>({ items, render }: { items: T[]; render: (item: T) => ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(4)

  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const read = () => setCols(columnsFor(el.clientWidth))
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const columns = useMemo(() => {
    const out: T[][] = Array.from({ length: cols }, () => [])
    const heights = new Array(cols).fill(0)
    for (const item of items) {
      const c = heights.indexOf(Math.min(...heights))
      out[c].push(item)
      heights[c] += 1 / item.ratio + 0.1
    }
    return out
  }, [items, cols])

  return (
    <div ref={wrap} className="cg-board" style={{ ['--cols' as string]: cols }}>
      {columns.map((col, i) => (
        <ul key={i} className="cg-col">
          {col.map((item) => (
            <li key={item.id}>{render(item)}</li>
          ))}
        </ul>
      ))}
    </div>
  )
}
