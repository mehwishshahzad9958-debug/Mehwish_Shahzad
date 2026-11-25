import type { Entry } from '../data/categories'
import EmptyState from './EmptyState'

/** Renders real entries when there are any, otherwise a friendly empty state. */
export default function EntryList({ items, emptyMessage }: { items: Entry[]; emptyMessage: string }) {
  if (items.length === 0) return <EmptyState message={emptyMessage} />
  return (
    <ul className="entries">
      {items.map((e) => (
        <li key={e.title} className="entries__item">
          {e.meta && <p className="eyebrow">{e.meta}</p>}
          <h3>{e.href ? <a href={e.href}>{e.title}</a> : e.title}</h3>
          {e.description && <p>{e.description}</p>}
        </li>
      ))}
    </ul>
  )
}
