import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { CreativeEntry } from '../../data/creativity'
import { CloseIcon, ArrowIcon } from '../../components/Icons'
import type { CreativeFile } from '../../data/creativity'
import Storybook from './Storybook'

/** Opens the real file: an embedded PDF viewer or video player, plus links to the original. Renders nothing until the file has a verified URL. */
function FileViewer({ file }: { file?: CreativeFile }) {
  if (!file?.url) return null
  const name = file.title ?? 'document'
  return (
    <div className="cg-viewer">
      {file.kind === 'pdf' && (
        <object className="cg-viewer__pdf" data={`${file.url}#view=FitH`} type="application/pdf" aria-label={`Preview of ${name}`}>
          <p>Your browser cannot show the PDF inline. Use the links below to read it.</p>
        </object>
      )}
      {file.kind === 'video' && <video className="cg-viewer__video" src={file.url} poster={file.poster} controls preload="metadata" />}
      <p className="cg-viewer__links">
        <a className="cr-link" href={file.url} target="_blank" rel="noopener noreferrer">
          Open original {file.kind === 'pdf' ? 'PDF' : file.kind === 'video' ? 'video' : 'file'} <ArrowIcon />
        </a>
        {file.kind !== 'video' && (
          <a className="cr-link" href={file.url} download>
            Download <ArrowIcon />
          </a>
        )}
      </p>
    </div>
  )
}

export interface EntryDialogHandle {
  open: () => void
}

export function fmtDate(d?: string) {
  if (!d) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (/^\d{4}-\d{2}$/.test(d)) {
    return new Date(d + '-01T00:00:00').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  }
  return d
}

/**
 * The detail view for one creative entry, in a native <dialog> (focus trap, Escape and the backdrop
 * come from the browser). Three shapes: a document or video viewer, a plain photo
 * lightbox (images only), and the project view (images, description, details, reflection).
 * Closing returns focus to whatever opened it, so the visitor lands back where they were.
 */
const EntryDialog = forwardRef<EntryDialogHandle, { entry: CreativeEntry }>(function EntryDialog({ entry }, ref) {
  const dialog = useRef<HTMLDialogElement>(null)
  const uid = entry.title.replace(/\W+/g, '-').toLowerCase()
  const book = entry.view === 'book' && !!entry.pages?.length
  const lightbox = !book && !!entry.images?.length && !entry.description && !entry.details?.length && !entry.reflection
  const [shot, setShot] = useState(0)
  // The storybook is mounted only while open, so its pages are fetched when someone actually opens it.
  const [isOpen, setIsOpen] = useState(false)

  // If the page changes while the dialog is open, make sure scrolling is unlocked again.
  useEffect(() => () => {
    document.body.style.overflow = ''
  }, [])

  useImperativeHandle(ref, () => ({
    open: () => {
      setShot(0)
      setIsOpen(true)
      dialog.current?.showModal()
      document.body.style.overflow = 'hidden'
    },
  }))

  const close = () => dialog.current?.close()

  const images = entry.images ?? []
  const step = (n: number) => setShot((i) => (i + n + images.length) % images.length)

  return (
    <dialog
      ref={dialog}
      className={`cr-dialog${lightbox ? ' cr-dialog--lightbox' : ''}${book ? ' cr-dialog--book' : ''}`}
      onKeyDown={(e) => {
        if (lightbox && images.length > 1) {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }
      }}
      aria-labelledby={`${uid}-title`}
      onClose={() => {
        document.body.style.overflow = ''
        setIsOpen(false)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="cr-dialog__inner">
        <button type="button" className="cr-dialog__close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>
        {book ? (
          // An interactive storybook: each image is a page, turned like paper.
          <>
            <h3 id={`${uid}-title`} className="cg-sr">{entry.title}</h3>
            {isOpen && <Storybook title={entry.title} pages={entry.pages ?? []} originalUrl={entry.file?.url} />}
          </>
        ) : lightbox ? (
          <figure className="cr-lightbox">
            <img src={images[shot].src} alt={images[shot].alt} />
            <figcaption>
              <h3 id={`${uid}-title`}>{entry.title}</h3>
              {images[shot].caption && <p>{images[shot].caption}</p>}
              {images.length > 1 && (
                <span className="cr-lightbox__nav">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous photo">‹</button>
                  <span aria-live="polite">{shot + 1} / {images.length}</span>
                  <button type="button" onClick={() => step(1)} aria-label="Next photo">›</button>
                </span>
              )}
            </figcaption>
          </figure>
        ) : (
        <>
        <p className="cr-kicker">{fmtDate(entry.date) ?? 'Handmade'}</p>
        <h3 id={`${uid}-title`}>{entry.title}</h3>

        {entry.images && entry.images.length > 0 && (
          <ul className="cr-gallery">
            {entry.images.map((img) => (
              <li key={img.src}>
                <figure className={img.process ? 'is-process' : ''}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  {(img.caption || img.process) && (
                    <figcaption>
                      {img.process && <span className="cr-card__badge">Process</span>} {img.caption}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        )}

        {!entry.images?.length && <FileViewer file={entry.file} />}

        {entry.description && <p className="cr-dialog__desc">{entry.description}</p>}

        {entry.details && entry.details.length > 0 && (
          <dl className="cr-details">
            {entry.details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {entry.reflection && (
          <blockquote className="cr-reflection">
            <span className="cr-reflection__label">What I took from it</span>
            {entry.reflection}
          </blockquote>
        )}

        {entry.tags && (
          <ul className="cr-tags">
            {entry.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {entry.href && (
          <a className="cr-link" href={entry.href} target="_blank" rel="noopener noreferrer">
            See more <ArrowIcon />
          </a>
        )}
        </>
        )}
      </div>
    </dialog>
  )
})

export default EntryDialog
