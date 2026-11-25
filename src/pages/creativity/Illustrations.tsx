import type { DisciplineId } from '../../data/creativity'

/**
 * Small hand-drawn style line illustrations, one per discipline.
 * They use `currentColor` for the main line and CSS variables for the accent.
 */
export function DisciplineArt({ id, className }: { id: DisciplineId; className?: string }) {
  const common = {
    viewBox: '0 0 160 160',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  }
  const accent = { stroke: 'var(--cr-accent, #b5552e)' }
  switch (id) {
    case 'painting':
      return (
        <svg {...common}>
          {/* palette */}
          <path d="M80 28 C42 28 22 54 24 82 C26 112 52 128 78 126 C94 125 90 110 100 106 C112 101 134 112 138 92 C144 58 120 28 80 28 Z" />
          <circle cx="58" cy="62" r="7" {...accent} />
          <circle cx="82" cy="48" r="7" />
          <circle cx="108" cy="58" r="7" {...accent} />
          <circle cx="52" cy="92" r="7" />
          {/* brush */}
          <path d="M120 128 L150 70" {...accent} />
          <path d="M150 70 C146 60 138 58 134 62 C136 70 142 74 150 70 Z" />
        </svg>
      )
    case 'crochet':
      return (
        <svg {...common}>
          {/* yarn ball */}
          <circle cx="70" cy="86" r="44" />
          <path d="M34 70 C54 84 86 84 106 66" />
          <path d="M28 90 C52 108 90 108 112 88" />
          <path d="M40 120 C60 104 84 100 100 112" />
          <path d="M50 52 C70 62 92 56 104 44" />
          {/* hook + loose thread */}
          <path d="M104 112 C130 126 136 142 150 148" {...accent} />
          <path d="M136 36 L112 100" />
          <path d="M136 36 C140 28 130 24 130 32" />
        </svg>
      )
    case 'stitching':
      return (
        <svg {...common}>
          {/* embroidery hoop */}
          <circle cx="76" cy="84" r="52" />
          <circle cx="76" cy="84" r="43" strokeDasharray="2 7" />
          <rect x="64" y="22" width="24" height="14" rx="3" />
          {/* running stitch and needle */}
          <path d="M40 90 H52 M60 90 H72 M80 90 H92 M100 90 H112" {...accent} />
          <path d="M44 66 C58 52 74 76 92 62 S112 56 114 60" strokeDasharray="1 8" />
          <path d="M120 128 L150 98" />
          <ellipse cx="122" cy="126" rx="2" ry="5" transform="rotate(45 122 126)" />
        </svg>
      )
    case 'cooking':
      return (
        <svg {...common}>
          {/* pot with steam */}
          <path d="M34 78 H126 V108 C126 124 112 134 96 134 H64 C48 134 34 124 34 108 Z" />
          <path d="M24 78 H34 M126 78 H136" />
          <path d="M60 60 C52 50 68 44 60 32" {...accent} />
          <path d="M82 60 C74 50 90 44 82 32" {...accent} />
          <path d="M104 60 C96 50 112 44 104 32" {...accent} />
          {/* whisk-like spoon */}
          <path d="M138 138 L150 112" />
          <ellipse cx="154" cy="104" rx="6" ry="9" transform="rotate(25 154 104)" />
        </svg>
      )
    case 'handmade':
      return (
        <svg {...common}>
          {/* scissors + tag + ribbon */}
          <path d="M42 36 L100 104" />
          <path d="M96 36 L38 104" />
          <circle cx="36" cy="112" r="14" />
          <circle cx="104" cy="112" r="14" />
          <path d="M112 30 H148 V66 L130 84 L112 66 Z" {...accent} />
          <circle cx="130" cy="44" r="3" {...accent} />
          <path d="M130 84 C124 104 140 116 132 138" {...accent} />
        </svg>
      )
    case 'experiments':
      return (
        <svg {...common}>
          {/* flask with bubbles and spark */}
          <path d="M64 24 H96 M70 24 V62 L34 128 C30 136 36 142 44 142 H116 C124 142 130 136 126 128 L90 62 V24" />
          <path d="M48 112 H112" {...accent} />
          <circle cx="76" cy="92" r="5" {...accent} />
          <circle cx="94" cy="80" r="3.5" />
          <circle cx="84" cy="108" r="3" />
          <path d="M132 40 V64 M120 52 H144 M124 44 L140 60 M140 44 L124 60" {...accent} />
        </svg>
      )
  }
}

/** A looping hand-drawn scribble used as a divider. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 24" preserveAspectRatio="none" aria-hidden="true" fill="none">
      <path
        d="M2 14 C 14 2, 26 2, 34 12 S 54 24, 66 12 S 90 2, 102 12 S 126 24, 138 12 S 162 2, 174 12 S 198 24, 210 12 S 232 4, 238 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/**
 * Placeholder artwork for "Learning Through Visual Stories": an open book with colour washes,
 * a sun and sparkles rising from its pages. It is a stand-in, not a finished illustration.
 */
export function StoryArt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* colour washes */}
      <circle cx="100" cy="82" r="46" fill="var(--cr-mustard)" fillOpacity=".38" stroke="none" />
      <path d="M30 126 C 44 60, 156 60, 170 126 L 150 126 C 140 82, 60 82, 50 126 Z" fill="var(--cr-rose)" fillOpacity=".34" stroke="none" />
      <path d="M44 126 C 54 84, 146 84, 156 126 L 140 126 C 132 98, 68 98, 60 126 Z" fill="var(--cr-sage)" fillOpacity=".4" stroke="none" />
      {/* rainbow arcs */}
      <path d="M30 126 C 44 60, 156 60, 170 126" stroke="var(--cr-rose-dk)" />
      <path d="M50 126 C 60 82, 140 82, 150 126" stroke="var(--cr-sage-dk)" />
      <path d="M70 126 C 76 104, 124 104, 130 126" stroke="var(--cr-sky-dk)" />
      {/* open book */}
      <path d="M20 148 C 50 138, 82 140, 100 156 C 118 140, 150 138, 180 148 L 180 208 C 150 198, 118 200, 100 214 C 82 200, 50 198, 20 208 Z" fill="#fffdf8" />
      <path d="M100 156 L 100 214" />
      <path d="M36 164 C 56 160, 76 162, 90 172 M36 178 C 56 174, 76 176, 90 186" stroke="var(--cr-ink)" strokeDasharray="1 7" />
      <path d="M110 172 C 124 162, 144 160, 164 164" stroke="var(--cr-terra)" />
      <path d="M110 186 C 124 176, 144 174, 164 178" stroke="var(--cr-terra)" strokeDasharray="1 7" />
      {/* sparkles */}
      <path d="M40 40 v14 M33 47 h14" stroke="var(--cr-terra)" />
      <path d="M164 30 v10 M159 35 h10" stroke="var(--cr-sky-dk)" />
      <path d="M176 78 v8 M172 82 h8" stroke="var(--cr-rose-dk)" />
      <circle cx="26" cy="92" r="3" fill="var(--cr-sky-dk)" stroke="none" />
      <circle cx="136" cy="24" r="3" fill="var(--cr-mustard)" stroke="none" />
    </svg>
  )
}
