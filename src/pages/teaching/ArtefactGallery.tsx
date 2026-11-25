import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { tamakArtefactGroups, tamakArtefacts, type Artefact } from '../../data/tamak'
import { CloseIcon } from '../../components/Icons'

/** Real assets only. Each group shows a placeholder until it has images; images open in a viewer. */
export default function ArtefactGallery() {
  const [view, setView] = useState<{ list: Artefact[]; i: number } | null>(null)
  const ref = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!view) return
    const d = ref.current
    if (d && !d.open) d.showModal()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [view])

  const go = (d: number) => setView((v) => (v ? { ...v, i: (v.i + d + v.list.length) % v.list.length } : v))
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }
  const cur = view ? view.list[view.i] : null

  return (
    <div className="tk-arte">
      {tamakArtefactGroups.map((g) => {
        const list = tamakArtefacts[g.id]
        return (
          <section key={g.id} className="tk-arte__group" aria-labelledby={`tk-a-${g.id}`}>
            <h3 id={`tk-a-${g.id}`}>{g.title}</h3>
            {list.length === 0 ? (
              <div className="tk-ph">
                <span className="tk-ph__frame" aria-hidden="true" />
                <p><strong>Not added yet</strong>{g.hint}. Original assets will appear here once provided.</p>
              </div>
            ) : (
              <ul className="tk-arte__grid">
                {list.map((a, i) => (
                  <li key={a.src}>
                    <button type="button" onClick={(e) => { opener.current = e.currentTarget; setView({ list, i }) }} aria-label={`Enlarge: ${a.alt}`}>
                      <img src={a.src} alt={a.alt} loading="lazy" />
                      {a.caption && <span>{a.caption}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
      {view && cur && (
        <dialog
          ref={ref}
          className="tk-lb"
          aria-label="Artefact viewer"
          onClose={() => { setView(null); opener.current?.focus() }}
          onClick={(e) => { if (e.target === ref.current) ref.current?.close() }}
          onKeyDown={onKey}
        >
          <button type="button" className="tk-lb__x" onClick={() => ref.current?.close()} aria-label="Close viewer"><CloseIcon size={18} /></button>
          <figure>
            <img src={cur.src} alt={cur.alt} />
            <figcaption>{cur.caption}<small>{view.i + 1} of {view.list.length}</small></figcaption>
          </figure>
          {view.list.length > 1 && (
            <>
              <button type="button" className="tk-lb__n is-prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
              <button type="button" className="tk-lb__n is-next" onClick={() => go(1)} aria-label="Next">›</button>
            </>
          )}
        </dialog>
      )}
    </div>
  )
}
