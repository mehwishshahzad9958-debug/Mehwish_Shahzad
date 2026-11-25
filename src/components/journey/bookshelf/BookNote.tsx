import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../../Icons'
import type { Book } from './books'

interface Props {
  book?: Book
  /** 1-based chapter number. */
  chapter: number
  left: number
  width: number
  /** Shown only while a book is being previewed (hover or keyboard focus). */
  visible: boolean
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

/** The editorial annotation for the selected book. A paper slip, not a card. */
const BookNote = forwardRef<HTMLElement, Props>(function BookNote({ book, chapter, left, width, visible, onPointerEnter, onPointerLeave }, ref) {
  const label = `chapter ${String(chapter).padStart(2, '0')}`
  return (
    <aside ref={ref} className={`bk-note${visible ? ' is-visible' : ''}`} style={{ left, width }} aria-live="polite" aria-hidden={!visible} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className="bk-note__paper">
        {!book ? (
          <>
            <p className="bk-note__chap">still being written</p>
            <p className="bk-note__txt is-missing">New chapters will be shelved here.</p>
            <Link to="/next-chapter" className="bk-note__go" tabIndex={visible ? 0 : -1}>
              Open the next chapter
              <ArrowIcon />
            </Link>
          </>
        ) : (
          <>
            <p className="bk-note__chap">{label}</p>
            <p className="bk-note__yr">
              {book.startYear || ''}
              {book.endYear && book.endYear !== book.startYear && <small>–{book.endYear}</small>}
              {book.isCurrent && <small>–Present</small>}
            </p>
            <h4 className="bk-note__org">{book.organization}</h4>
            <p className="bk-note__role">{book.role ?? 'Role to be confirmed'}</p>
            {book.period && <p className="bk-note__period">{book.period}</p>}
            <p className={`bk-note__txt${book.description ? '' : ' is-missing'}`}>
              {book.description ?? book.note ?? 'Details to be added.'}
            </p>
            {book.categories.length > 0 && (
              <ul className="bk-note__chips" aria-label="Experience category">
                {book.categories.map((c) => (
                  <li key={c} className="bk-chip">{c}</li>
                ))}
              </ul>
            )}
            {book.href ? (
              <Link to={book.href} className="bk-note__go" tabIndex={visible ? 0 : -1}>
                Explore details
                <ArrowIcon />
              </Link>
            ) : (
              <span className="bk-note__soon">Details page coming soon</span>
            )}
          </>
        )}
      </div>
    </aside>
  )
})

export default BookNote
