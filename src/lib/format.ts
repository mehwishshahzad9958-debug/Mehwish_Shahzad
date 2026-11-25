const ISO = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/

/** '2026-03-12' -> '12 March 2026', '2026-03' -> 'March 2026', '2026' -> '2026'. Free text is left as written. */
export function fmtDate(d?: string) {
  if (!d) return undefined
  const m = d.match(ISO)
  if (!m) return d
  const [, y, mo, da] = m
  if (!mo) return y
  const date = new Date(Number(y), Number(mo) - 1, da ? Number(da) : 1)
  return date.toLocaleDateString('en-GB', da ? { day: 'numeric', month: 'long', year: 'numeric' } : { month: 'long', year: 'numeric' })
}
