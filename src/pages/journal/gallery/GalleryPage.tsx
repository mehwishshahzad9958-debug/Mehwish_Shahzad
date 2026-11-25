import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import { galleryCollections, galleryCopy, galleryPhotos } from '../../../data/gallery'
import { usePageTitle } from '../../../hooks'
import { journalPaths } from '../paths'
import { ArrowIcon } from '../../../components/Icons'
import GalleryLightbox from './GalleryLightbox'
import './gallery.css'

export default function GalleryPage() {
  usePageTitle('Gallery')
  const [col, setCol] = useState('all')
  const [open, setOpen] = useState<number | null>(null)

  const collections = useMemo(
    () => galleryCollections.filter((c) => galleryPhotos.some((p) => p.collection === c.id)),
    [],
  )
  const shown = col === 'all' ? galleryPhotos : galleryPhotos.filter((p) => p.collection === col)
  const active = collections.find((c) => c.id === col)

  return (
    <article className="gl">
      <header className="gl-hero">
        <div className="container">
          <Link to={journalPaths.root} className="back-link"><ArrowIcon />The Journal</Link>
          <p className="gl-eyebrow">{galleryCopy.eyebrow}</p>
          <h1>{galleryCopy.title}</h1>
          <p className="gl-lead">{galleryCopy.lead}</p>
        </div>
      </header>

      <section className="gl-wall" aria-label="Photographs">
        <div className="container">
          {galleryPhotos.length === 0 ? (
            <div className="gl-empty">
              <div className="gl-empty__sheet" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => <span key={i} />)}
              </div>
              <div>
                <h2>{galleryCopy.empty.title}</h2>
                <p>{galleryCopy.empty.message}</p>
              </div>
            </div>
          ) : (
            <>
              {collections.length > 0 && (
                <div className="gl-filter" role="group" aria-label="Collections">
                  <button type="button" aria-pressed={col === 'all'} onClick={() => setCol('all')}>All</button>
                  {collections.map((c) => (
                    <button key={c.id} type="button" aria-pressed={col === c.id} onClick={() => setCol(c.id)}>{c.title}</button>
                  ))}
                </div>
              )}
              {active?.description && <p className="gl-collection-desc">{active.description}</p>}
              <ul className="gl-masonry">
                {shown.map((p, i) => (
                  <li key={p.src}>
                    <button type="button" onClick={() => setOpen(i)} aria-label={`Enlarge: ${p.alt}`}>
                      <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {open !== null && shown[open] && (
        <GalleryLightbox photos={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </article>
  )
}
