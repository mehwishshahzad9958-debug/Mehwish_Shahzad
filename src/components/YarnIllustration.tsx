/** A small hand-drawn ball of yarn with a trailing thread. Decorative only. */
export default function YarnIllustration({ className }: { className?: string }) {
  // Wraps are drawn as parallel curves, clipped to the ball and criss-crossed.
  const wraps = [-30, -15, 0, 15, 30].map((dy) => `M96 ${64 + dy} Q152 ${92 + dy} 208 ${64 + dy}`)
  return (
    <svg className={className} viewBox="0 0 230 140" aria-hidden="true" fill="none" stroke="#b9774d" strokeWidth="2" strokeLinecap="round">
      <defs>
        <clipPath id="yarn-ball">
          <circle cx="152" cy="64" r="46" />
        </clipPath>
      </defs>
      <circle cx="152" cy="64" r="46" fill="#f9dcc7" fillOpacity=".6" />
      <g clipPath="url(#yarn-ball)">
        <g transform="rotate(-35 152 64)">
          {wraps.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g transform="rotate(35 152 64)">
          {wraps.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      <circle cx="152" cy="64" r="46" />
      <path d="M110 86 C72 106 62 128 24 124 C12 123 6 116 10 109" />
    </svg>
  )
}
