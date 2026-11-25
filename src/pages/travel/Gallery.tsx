import { useEffect, useRef, useState } from 'react'
import type { TravelPhoto } from '../../data/travel'
import { Corners } from './Decor'
import { ArrowIcon, CloseIcon } from '../../components/Icons'

/**
 * A scatter of photographs held in with photo corners. Each opens in a
 * lightbox (native <dialog>: focus trap, Escape and backdrop come for free).
 */
export default function Gallery({ photos, label }: { photos: TravelPhoto[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const current = photos[index]

  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    [],
  )

  const open = (i: number) => {
    setIndex(i)
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length)

  return (
    <>
      <ul className="tj-gallery" aria-label={label}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" className="tj-photo" onClick={() => open(i)} aria-haspopup="dialog" aria-label={`Open photo: ${p.alt}`}>
              <Corners />
              <img src={p.src} alt={p.alt} loading="lazy" />
              {p.caption && <span className="tj-photo__cap">{p.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="tj-lightbox"
        aria-label="Photograph"
        onClose={() => {
          document.body.style.overflow = ''
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {current && (
          <figure>
            <img src={current.src} alt={current.alt} />
            <figcaption>
              {current.caption}
              <span className="tj-lightbox__count">
                {index + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="tj-lightbox__close" onClick={() => dialog.current?.close()} aria-label="Close photo">
          <CloseIcon />
        </button>
        {photos.length > 1 && (
          <>
            <button type="button" className="tj-lightbox__nav tj-lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
              <ArrowIcon />
            </button>
            <button type="button" className="tj-lightbox__nav tj-lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
              <ArrowIcon />
            </button>
          </>
        )}
      </dialog>
    </>
  )
}
