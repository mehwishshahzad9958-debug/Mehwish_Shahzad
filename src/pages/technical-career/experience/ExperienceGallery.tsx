import { useContext, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { experiencePhotos } from '../../../data/experience-photos'
import type { Experience } from '../../../data/experience'
import { EditorHost } from '../components/EditorHost'
import { CloseIcon } from '../components/Icons'

/**
 * Employer-specific photos. Nothing is shown until the visitor presses
 * "View Experience Photos". The viewer opens inside the editor pane.
 */
export default function ExperienceGallery({ exp }: { exp: Experience }) {
  const photos = experiencePhotos[exp.id]
  const host = useContext(EditorHost)
  const [shown, setShown] = useState(false)
  const [index, setIndex] = useState<number | null>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const viewer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (index !== null) viewer.current?.focus()
  }, [index])

  if (photos.length === 0) {
    return (
      <div className="tc-empty">
        <p className="tc-empty__title">No photos yet</p>
        <p>Photographs from {exp.company} will appear here once they are added.</p>
      </div>
    )
  }

  const close = () => {
    setIndex(null)
    trigger.current?.focus()
  }
  const go = (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length))

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.stopPropagation(); close() }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    else if (e.key === 'Tab') {
      const f = viewer.current?.querySelectorAll<HTMLElement>('button')
      if (!f?.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  const p = index !== null ? photos[index] : null

  return (
    <div>
      {!shown ? (
        <button type="button" className="tc-btn" onClick={() => setShown(true)} aria-expanded="false">
          View Experience Photos
        </button>
      ) : (
        <>
          <button type="button" className="tc-btn tc-btn--ghost" onClick={() => setShown(false)} aria-expanded="true">
            Hide photos
          </button>
          <ul className="tc-photos">
            {photos.map((ph, i) => (
              <li key={ph.src}>
                <button
                  type="button"
                  ref={i === 0 ? trigger : undefined}
                  onClick={(e) => { trigger.current = e.currentTarget; setIndex(i) }}
                  aria-label={`Enlarge: ${ph.alt}`}
                >
                  <img src={ph.src} alt={ph.alt} loading="lazy" />
                  {ph.caption && <span>{ph.caption}</span>}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {p && host &&
        createPortal(
          <div ref={viewer} className="tc-viewer" role="dialog" aria-modal="true" aria-label={`${exp.company} photo viewer`} tabIndex={-1} onKeyDown={onKey}>
            <button type="button" className="tc-viewer__close" onClick={close} aria-label="Close viewer"><CloseIcon size={18} /></button>
            <figure>
              <img src={p.src} alt={p.alt} />
              <figcaption>
                {p.caption && <span>{p.caption}</span>}
                <small>{index! + 1} of {photos.length}</small>
              </figcaption>
            </figure>
            {photos.length > 1 && (
              <>
                <button type="button" className="tc-viewer__nav is-prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
                <button type="button" className="tc-viewer__nav is-next" onClick={() => go(1)} aria-label="Next photo">›</button>
              </>
            )}
          </div>,
          host,
        )}
    </div>
  )
}
