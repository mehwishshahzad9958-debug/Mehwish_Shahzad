import type { CSSProperties } from 'react'
import type { BookStyle, SpinePattern } from '../../../data/bookshelf'
import SpineIcon from './SpineIcon'

function patternStyle(kind: SpinePattern, c: string): CSSProperties {
  switch (kind) {
    case 'dots':
      return { backgroundImage: `radial-gradient(${c} 1.4px, transparent 1.5px)`, backgroundSize: '14px 14px', opacity: 0.35 }
    case 'rules':
      return { backgroundImage: `repeating-linear-gradient(0deg, ${c} 0 1px, transparent 1px 16px)`, opacity: 0.28 }
    case 'bars':
      return { background: `linear-gradient(90deg, transparent 18%, ${c} 18% 22%, transparent 22% 40%, ${c} 40% 43%, transparent 43%)`, opacity: 0.25 }
    case 'arcs':
      return { backgroundImage: `repeating-radial-gradient(circle at 50% 108%, transparent 0 22px, ${c} 22px 23.5px)`, opacity: 0.3 }
    case 'grid':
      return { backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '18px 18px', opacity: 0.22 }
  }
}

interface Props {
  style: BookStyle
  title: string
  year: string
  ghost?: boolean
}

/** The visible faces of one upright book: front spine, side, side and top. */
export default function BookSpine({ style, title, year, ghost }: Props) {
  const fs = style.fs ?? (title.length > 14 ? 20 : 24)
  return (
    <>
      <span className="bk-face bk-face--r" />
      <span className="bk-face bk-face--l" />
      <span className="bk-face bk-face--t" />
      <span className="bk-front">
        {!ghost && <span className="bk-pat" style={patternStyle(style.pattern, style.fg)} />}
        {style.frame && <span className="bk-frame" />}
        <span className="bk-spine">
          <SpineIcon name={style.icon} />
          <span className="bk-nm" style={{ fontSize: fs }}>{title}</span>
          {year && <span className="bk-yr">{year}</span>}
        </span>
      </span>
      {!ghost && <span className="bk-ribbon" />}
    </>
  )
}
