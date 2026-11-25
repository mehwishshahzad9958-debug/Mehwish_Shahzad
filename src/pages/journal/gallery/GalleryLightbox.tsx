import { useEffect, useRef } from 'react'
import type { GalleryPhoto } from '../../../data/gallery'
import { fmtDate } from '../../../lib/format'
import { ArrowIcon, CloseIcon } from '../../../components/Icons'

interface Props {
  photos: GalleryPhoto[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

/** Full-size viewer built on a native <dialog>: focus trap, Escape to close, arrow keys to move. */
export default function GalleryLightbox({ photos, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const p = photos[index]

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const go = (d: number) => onIndex((index + d + photos.length) % photos.length)

  return (
    <dialog
      ref={ref}
      className="gl-lb"
      aria-label="Photo viewer"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close() }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      }}
    >
      <button type="button" className="gl-lb__close" onClick={() => ref.current?.close()} aria-label="Close viewer"><CloseIcon /></button>
      <figure className="gl-lb__fig">
        <img src={p.src} alt={p.alt} />
        <figcaption>
          {p.caption && <span className="gl-lb__cap">{p.caption}</span>}
          <span className="gl-lb__meta">
            {[p.location, fmtDate(p.date)].filter(Boolean).join(' · ')}
            {photos.length > 1 && <span> {p.location || p.date ? '·' : ''} {index + 1} of {photos.length}</span>}
          </span>
        </figcaption>
      </figure>
      {photos.length > 1 && (
        <>
          <button type="button" className="gl-lb__nav gl-lb__nav--prev" onClick={() => go(-1)} aria-label="Previous photo"><ArrowIcon /></button>
          <button type="button" className="gl-lb__nav gl-lb__nav--next" onClick={() => go(1)} aria-label="Next photo"><ArrowIcon /></button>
        </>
      )}
      <span className="visually-hidden" aria-live="polite">Photo {index + 1} of {photos.length}{p.caption ? `: ${p.caption}` : ''}</span>
    </dialog>
  )
}
