import { useId, type ReactNode } from 'react'

const clean = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, '')

/** A postage stamp with a perforated edge. Children are drawn inside a 100x120 box. */
export function Stamp({ children, className }: { children?: ReactNode; className?: string }) {
  const id = clean(useId())
  const holes: ReactNode[] = []
  for (let x = 5; x <= 95; x += 10) {
    holes.push(<circle key={`t${x}`} cx={x} cy={0} r={3.6} />, <circle key={`b${x}`} cx={x} cy={120} r={3.6} />)
  }
  for (let y = 10; y <= 110; y += 10) {
    holes.push(<circle key={`l${y}`} cx={0} cy={y} r={3.6} />, <circle key={`r${y}`} cx={100} cy={y} r={3.6} />)
  }
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <mask id={id}>
          <rect width="100" height="120" fill="#fff" />
          <g fill="#000">{holes}</g>
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <rect width="100" height="120" fill="#fffaf0" />
        <rect x="9" y="9" width="82" height="102" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {children}
      </g>
    </svg>
  )
}

/** Little scene for the face of a stamp: a sun over hills and water. */
export function StampScene() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="64" cy="38" r="9" stroke="var(--tj-red)" />
      <path d="M14 82 L38 52 L56 74 L68 62 L86 82 Z" />
      <path d="M16 92 q8 -5 16 0 t16 0 t16 0 t16 0" stroke="var(--tj-blue)" />
      <path d="M16 100 q8 -5 16 0 t16 0 t16 0 t16 0" stroke="var(--tj-blue)" />
    </g>
  )
}

/** A circular postmark with wavy cancellation lines. */
export function Postmark({ top, bottom, className }: { top: string; bottom: string; className?: string }) {
  const id = clean(useId())
  return (
    <svg className={className} viewBox="0 0 200 120" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <defs>
        <path id={id} d="M30 60 A30 30 0 1 1 90 60 A30 30 0 1 1 30 60" />
      </defs>
      <g transform="translate(0,0)">
        <circle cx="60" cy="60" r="50" />
        <circle cx="60" cy="60" r="40" strokeWidth="1.2" />
        <text fontSize="11" fill="currentColor" stroke="none" letterSpacing="2.2" fontFamily="ui-monospace, 'Courier New', monospace" fontWeight="700">
          <textPath href={`#${id}`} startOffset="0">
            PERSONAL · JOURNAL · DIARY ·
          </textPath>
        </text>
        <text x="60" y="58" textAnchor="middle" fontSize="14" fill="currentColor" stroke="none" fontWeight="700" fontFamily="ui-monospace, 'Courier New', monospace">
          {top}
        </text>
        <text x="60" y="73" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="ui-monospace, 'Courier New', monospace">
          {bottom}
        </text>
      </g>
      <path d="M118 36 q10 -8 20 0 t20 0 t20 0" />
      <path d="M118 52 q10 -8 20 0 t20 0 t20 0" />
      <path d="M118 68 q10 -8 20 0 t20 0 t20 0" />
      <path d="M118 84 q10 -8 20 0 t20 0 t20 0" />
    </svg>
  )
}

/** A blank, hand-drawn map with a dotted route that has not been travelled yet. */
export function BlankMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 360" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* folds */}
      <path d="M187 0 V360 M373 0 V360" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
      {/* landmasses */}
      <path
        d="M40 120 C60 70 120 56 170 80 C210 98 232 140 210 176 C186 214 130 224 90 206 C48 188 28 156 40 120 Z"
        fill="var(--tj-olive)"
        fillOpacity=".18"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M300 70 C350 40 430 52 470 90 C500 118 488 170 450 190 C410 210 370 196 340 176 C300 150 280 98 300 70 Z"
        fill="var(--tj-blue)"
        fillOpacity=".14"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M170 250 C210 234 270 248 290 280 C306 306 270 332 224 330 C176 328 140 300 146 274 C148 262 156 254 170 250 Z"
        fill="var(--tj-red)"
        fillOpacity=".12"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* the route */}
      <path className="tj-route" d="M96 150 C170 110 214 210 262 190 S340 110 392 142 S456 250 292 292" stroke="var(--tj-red)" strokeWidth="3" strokeDasharray="2 10" />
      <circle cx="96" cy="150" r="8" fill="var(--tj-red)" />
      <path d="M284 284 l16 16 M300 284 l-16 16" stroke="var(--tj-red)" strokeWidth="4" />
      {/* compass */}
      <g transform="translate(480 290)" stroke="currentColor" strokeWidth="2">
        <circle r="26" />
        <path d="M0 -22 L6 0 L0 22 L-6 0 Z" fill="currentColor" fillOpacity=".25" />
        <path d="M-22 0 H22" strokeOpacity=".5" />
      </g>
      <text x="474" y="256" fontSize="16" fill="currentColor" stroke="none" fontFamily="var(--font-serif)" fontStyle="italic">
        N
      </text>
      {/* question marks where nothing has been marked yet */}
      <text x="372" y="124" fontSize="34" fill="var(--tj-red)" stroke="none" fontFamily="var(--font-script)">
        ?
      </text>
      <text x="196" y="302" fontSize="34" fill="var(--tj-blue)" stroke="none" fontFamily="var(--font-script)">
        ?
      </text>
    </svg>
  )
}

/** Outline illustrations for the empty "pocket of paper" slots. */
export function EphemeraArt({ kind }: { kind: 'ticket' | 'postcard' | 'map' }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'ticket')
    return (
      <svg viewBox="0 0 140 90" aria-hidden="true" {...p}>
        <path d="M10 14 H130 V34 a9 9 0 0 0 0 22 V76 H10 V56 a9 9 0 0 0 0 -22 Z" />
        <path d="M96 14 V76" strokeDasharray="3 6" />
        <path d="M24 34 H78 M24 48 H64" />
      </svg>
    )
  if (kind === 'postcard')
    return (
      <svg viewBox="0 0 140 90" aria-hidden="true" {...p}>
        <rect x="10" y="12" width="120" height="66" rx="3" />
        <path d="M70 20 V70" />
        <path d="M20 34 H60 M20 46 H60 M20 58 H48" />
        <rect x="90" y="22" width="28" height="22" />
        <path d="M82 58 H120 M82 66 H120" />
      </svg>
    )
  return (
    <svg viewBox="0 0 140 90" aria-hidden="true" {...p}>
      <path d="M12 20 L46 12 L94 24 L128 14 V70 L94 80 L46 68 L12 78 Z" />
      <path d="M46 12 V68 M94 24 V80" strokeOpacity=".55" />
      <path d="M22 54 C40 40 52 56 70 42 S104 36 116 30" strokeDasharray="2 6" />
    </svg>
  )
}

/** Photo corners: the little paper triangles that hold a photo into an album page. */
export function Corners() {
  return (
    <>
      <i className="tj-corner tj-corner--tl" aria-hidden="true" />
      <i className="tj-corner tj-corner--tr" aria-hidden="true" />
      <i className="tj-corner tj-corner--bl" aria-hidden="true" />
      <i className="tj-corner tj-corner--br" aria-hidden="true" />
    </>
  )
}
