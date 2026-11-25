import { Link } from 'react-router-dom'
import { fmtDate } from '../../lib/format'
import { categoryLabels, destinations, type Milestone, type PendingRecord } from '../../data/journeyShared'
import Reveal from '../Reveal'
import { ArrowIcon } from '../Icons'

export function periodText(m: Milestone) {
  if (m.dateText) return m.dateText
  const end = m.end === 'present' ? 'Present' : fmtDate(m.end)
  return [fmtDate(m.start), end].filter(Boolean).join(' – ')
}

function Chips({ cats }: { cats: Milestone['categories'] }) {
  return (
    <ul className="jr-chips" aria-label="Experience category">
      {cats.map((c) => (
        <li key={c} className={`jr-chip jr-chip--${c}`}>{categoryLabels[c]}</li>
      ))}
    </ul>
  )
}

/** The link under a milestone: clickable only when the destination page exists. */
function Explore({ id }: { id: NonNullable<Milestone['explore']> }) {
  const d = destinations[id] as { label: string; path?: string }
  if (d.path) {
    return (
      <Link to={d.path} className="jr-link">
        Explore: {d.label}
        <ArrowIcon />
      </Link>
    )
  }
  return (
    <span className="jr-soon">
      {d.label}
      <em>Coming soon</em>
    </span>
  )
}

interface Props {
  label: string
  items: ({ kind: 'record'; record: Milestone } | { kind: 'pending'; record: PendingRecord })[]
  /** Shown when a record has no description. */
  missingDescription?: string
}

/** A vertical timeline. Used for both the professional and education journeys. */
export default function Timeline({ label, items, missingDescription = 'Details to be added.' }: Props) {
  return (
    <ol className="jr-line" aria-label={label}>
      {items.map((it, i) => (
        <li key={it.record.id} className={`jr-item${it.kind === 'pending' ? ' is-pending' : ''}`}>
          <span className="jr-dot" aria-hidden="true" />
          <Reveal delay={Math.min(i * 0.06, 0.2)}>
            {it.kind === 'record' ? (
              <article className="jr-card">
                <p className="jr-date">{periodText(it.record)}</p>
                <h4>{it.record.organization}</h4>
                <p className="jr-role">{it.record.role}</p>
                {(it.record.description || missingDescription) && (
                  <p className={`jr-desc${it.record.description ? '' : ' is-missing'}`}>{it.record.description ?? missingDescription}</p>
                )}
                <Chips cats={it.record.categories} />
                {it.record.explore && <Explore id={it.record.explore} />}
              </article>
            ) : (
              <article className="jr-card jr-card--pending">
                <p className="jr-date">Placeholder</p>
                <h4>{it.record.title}</h4>
                <p className="jr-desc is-missing">{it.record.note}</p>
                <Chips cats={it.record.categories} />
              </article>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
