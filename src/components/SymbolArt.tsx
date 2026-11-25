import type { MotifId } from '../data/categories'
import { symbols } from '../data/symbols'

interface SymbolArtProps {
  motif: MotifId
  /** Stroke colour of the main lines. */
  color: string
  /** Stroke colour of the accent lines. */
  accent: string
  strokeWidth?: number
}

/** Static (non-animated) version of a symbol. Used on category pages and for reduced motion. */
export default function SymbolArt({ motif, color, accent, strokeWidth = 3 }: SymbolArtProps) {
  const s = symbols[motif]
  const common = { fill: 'none', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  return (
    <>
      {s.main.map((d) => (
        <path key={d} d={d} stroke={color} {...common} />
      ))}
      {s.accent.map((d) => (
        <path key={d} d={d} stroke={accent} {...common} />
      ))}
    </>
  )
}
