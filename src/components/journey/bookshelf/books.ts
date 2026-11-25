import { professionalJourney, professionalPending } from '../../../data/professionalJourney'
import { bookStyles, eras, fallbackStyles, type BookStyle } from '../../../data/bookshelf'
import { categoryLabels, destinations, type JourneyCategory, type Milestone, type PendingRecord } from '../../../data/journeyShared'
import { periodText } from '../Timeline'

export interface Book {
  id: string
  pending: boolean
  organization: string
  role?: string
  /** Short year text on the spine, e.g. "2021–2022". */
  yearLabel: string
  startYear: number
  endYear?: number
  isCurrent: boolean
  /** Longer period text, shown only when it adds to the year. */
  period?: string
  description?: string
  note?: string
  categories: string[]
  /** Link target, only when the destination page exists. */
  href?: string
  era: number
  style: BookStyle
}

const yearOf = (s?: string) => (s ? Number.parseInt(s.slice(0, 4), 10) : 0)
const monthOf = (s?: string) => (s && s.length >= 7 ? Number.parseInt(s.slice(5, 7), 10) : 0)
const eraOf = (year: number) => eras.findIndex((e) => year <= e.until)

function fromRecord(m: Milestone): Omit<Book, 'style' | 'era'> {
  const startYear = yearOf(m.start)
  const isCurrent = m.end === 'present'
  const endYear = isCurrent || !m.end ? undefined : yearOf(m.end)
  const yearLabel = isCurrent ? `${startYear}–Present` : endYear && endYear !== startYear ? `${startYear}–${endYear}` : `${startYear}`
  const period = periodText(m)
  const dest = m.explore ? (destinations[m.explore] as { path?: string }) : undefined
  return {
    id: m.id,
    pending: false,
    organization: m.organization,
    role: m.role,
    yearLabel,
    startYear,
    endYear,
    isCurrent,
    period: period !== String(startYear) ? period : undefined,
    description: m.description,
    categories: m.categories.map((c: JourneyCategory) => categoryLabels[c]),
    href: dest?.path,
  }
}

function fromPending(p: PendingRecord): Omit<Book, 'style' | 'era'> {
  const startYear = yearOf(p.dateText)
  return {
    id: p.id,
    pending: true,
    organization: p.title,
    yearLabel: p.dateText ?? '',
    startYear,
    isCurrent: false,
    note: p.note,
    categories: p.categories.map((c) => categoryLabels[c]),
  }
}

/** Every professional record and pending record, oldest first, each mapped to one book. */
export function buildBooks(): Book[] {
  const raw = [
    ...professionalPending.map((p, i) => ({ r: fromPending(p), key: yearOf(p.dateText) * 100, i })),
    ...professionalJourney.map((m, i) => ({ r: fromRecord(m), key: yearOf(m.start) * 100 + monthOf(m.start), i: i + 1000 })),
  ]
  raw.sort((a, b) => a.key - b.key || a.i - b.i)
  let fb = 0
  return raw.map(({ r }) => ({
    ...r,
    era: Math.max(0, eraOf(r.startYear)),
    style: bookStyles[r.id] ?? fallbackStyles[fb++ % fallbackStyles.length],
  }))
}

export interface EraGroup { label: string; range: string; from: number; to: number }

/** Contiguous groups of books by era, with a date range computed from the books' own years. */
export function buildEras(books: Book[]): EraGroup[] {
  const groups: EraGroup[] = []
  books.forEach((b, i) => {
    const g = groups[groups.length - 1]
    const last = i > 0 ? books[i - 1] : undefined
    if (g && last && last.era === b.era) {
      g.to = i
    } else {
      groups.push({ label: eras[b.era].label, range: '', from: i, to: i })
    }
  })
  groups.forEach((g) => {
    const slice = books.slice(g.from, g.to + 1)
    const lo = Math.min(...slice.map((b) => b.startYear))
    const hi = Math.max(...slice.map((b) => b.endYear ?? b.startYear))
    g.range = slice.some((b) => b.isCurrent) ? `${lo} →` : lo === hi ? `${lo}` : `${lo}–${hi}`
  })
  return groups
}
