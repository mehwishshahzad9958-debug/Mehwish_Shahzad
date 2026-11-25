import { useRef } from 'react'
import type { CreativeEntry, DisciplineId } from '../../data/creativity'
import { DisciplineArt, StoryArt } from './Illustrations'
import EntryDialog, { fmtDate as fmt, type EntryDialogHandle } from './EntryDialog'

/**
 * One piece of work. The card is a button; activating it opens a native <dialog>
 * (focus trapping, Escape-to-close and the backdrop come from the browser)
 * that shows every image, the details and the reflection.
 */
export default function EntryCard({ entry, discipline }: { entry: CreativeEntry; discipline: DisciplineId }) {
  const dialog = useRef<EntryDialogHandle>(null)
  const cover = entry.images?.[0]
  const processCount = entry.images?.filter((i) => i.process).length ?? 0
  const story = entry.story
  const open = () => dialog.current?.open()

  return (
    <li>
      <button type="button" className={`cr-card cr-card--${discipline}${story ? ' cr-card--story' : ''}`} onClick={open} aria-haspopup="dialog">
        <span className="cr-tape" aria-hidden="true" />
        <span className="cr-card__photo">
          {story && !cover ? (
            <>
              <StoryArt className="cr-card__art cr-card__art--story" />
              <span className="cr-card__soon">Artwork to come</span>
            </>
          ) : cover ? (
            <img src={cover.src} alt={cover.alt} loading="lazy" />
          ) : (
            <DisciplineArt id={discipline} className="cr-card__art" />
          )}
        </span>
        <span className="cr-card__caption">
          {story && <span className="cr-card__cat">{story.category}</span>}
          <span className="cr-card__title">{entry.title}</span>
          {story && <span className="cr-card__sub">{story.subtitle}</span>}
          {story && <span className="cr-card__aud">For {story.audience.charAt(0).toLowerCase() + story.audience.slice(1)}</span>}
          {entry.date && <span className="cr-card__date">{fmt(entry.date)}</span>}
          {processCount > 0 && <span className="cr-card__badge">{processCount} process {processCount === 1 ? 'photo' : 'photos'}</span>}
        </span>
      </button>

      <EntryDialog ref={dialog} entry={entry} />
    </li>
  )
}
