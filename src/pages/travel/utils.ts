import type { TravelEntry } from '../../data/travel'
import { fmtDate } from '../../lib/format'

const ISO = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/

/** Newest first. Entries without a date go to the end. */
export function sortEntries(list: TravelEntry[]) {
  return [...list].sort((a, b) => (b.dateStart ?? '').localeCompare(a.dateStart ?? ''))
}

export const yearOf = (e: TravelEntry) => e.dateStart?.match(ISO)?.[1] ?? 'Undated'

export { fmtDate }

export function fmtRange(start?: string, end?: string) {
  const a = fmtDate(start)
  const b = fmtDate(end)
  if (a && b && a !== b) return `${a}\u00a0– ${b}`
  return a ?? b
}

/** Short pieces for the postmark: ['MAR', '2026'] (or dashes when there is no date). */
export function postmarkParts(d?: string): [string, string] {
  const m = d?.match(ISO)
  if (!m) return ['— — —', '— — — —']
  const mon = m[2] ? new Date(2000, Number(m[2]) - 1, 1).toLocaleDateString('en-GB', { month: 'short' }).toUpperCase() : '—'
  return [mon, m[1]]
}

export const uniqueDestinations = (list: TravelEntry[]) => [...new Set(list.map((e) => e.destination))]
