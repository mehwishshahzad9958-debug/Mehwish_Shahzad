import type { SpineIcon as Name } from '../../../data/bookshelf'

const paths: Record<Name, React.ReactNode> = {
  school: <path d="M4 14 17 6l13 8M7 14v12h20V14M14 26v-7h6v7" />,
  abc: <path d="M5 26 11 9l6 17M7.5 20h7M20 14c3-3 8-1 8 3s-5 6-8 4" />,
  smile: (
    <>
      <circle cx="17" cy="17" r="12" />
      <path d="M11 19c2 4 10 4 12 0M12.5 13v1.5M21.5 13v1.5" />
    </>
  ),
  chalk: (
    <>
      <rect x="5" y="7" width="24" height="16" rx="1.5" />
      <path d="M10 13h8M10 17h5M20 18l2 2 4-5M9 27h16" />
    </>
  ),
  gantt: <path d="M5 8h10M10 14h14M16 20h12M5 26h8M5 5v24" />,
  pencil: <path d="M6 28l2-7L24 5l5 5L13 26zM21 8l5 5M8 21l5 5" />,
  tower: (
    <>
      <path d="M17 12 10 30M17 12l7 18M13 22h8M15 18h4M17 12V8" />
      <path d="M12 7a6 6 0 0 0 0 8M22 7a6 6 0 0 1 0 8M8.5 4.5a10 10 0 0 0 0 13M25.5 4.5a10 10 0 0 1 0 13" />
    </>
  ),
  code: <path d="M12 11 5 17l7 6M22 11l7 6-7 6M19 8l-4 18" />,
  plus: <path d="M17 8v18M8 17h18" />,
}

/** Small hand-drawn style line icon for the top of a spine. */
export default function SpineIcon({ name }: { name: Name }) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  )
}
