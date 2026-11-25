import { useId, useState } from 'react'
import { shelfItems, shelves, type ShelfItem, type ShelfKind } from '../../data/speaking'
import Reveal from '../../components/Reveal'
import { ArrowIcon } from '../../components/Icons'

function ShelfCard({ item }: { item: ShelfItem }) {
  return (
    <li>
      <article className="sp-shelfcard">
        <div className="sp-shelfcard__media">
          {item.image ? (
            <img src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
          ) : (
            <span aria-hidden="true" className="sp-shelfcard__letter">
              {item.title.charAt(0)}
            </span>
          )}
        </div>
        <div className="sp-shelfcard__body">
          {item.date && <p className="sp-meta">{item.date}</p>}
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          {item.tags && (
            <ul className="sp-tags">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          {item.href && (
            <a className="sp-link" href={item.href} target="_blank" rel="noopener noreferrer">
              {item.linkLabel ?? 'Open'}
              <ArrowIcon />
            </a>
          )}
        </div>
      </article>
    </li>
  )
}

/** Section 2: a tabbed shelf, one tab per kind of material. */
export default function Shelf() {
  const [active, setActive] = useState<ShelfKind>(shelves[0].kind)
  const uid = useId()
  const current = shelves.find((s) => s.kind === active)!
  const items = shelfItems.filter((i) => i.kind === active)

  const onKey = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % shelves.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + shelves.length) % shelves.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = shelves.length - 1
    else return
    e.preventDefault()
    setActive(shelves[next].kind)
    document.getElementById(`${uid}-tab-${shelves[next].kind}`)?.focus()
  }

  return (
    <section id="sp-presentations" className="sp-section sp-shelf" aria-labelledby="sp-presentations-title">
      <div className="container">
        <Reveal>
          <p className="sp-eyebrow sp-eyebrow--dark">01 — Share</p>
          <h2 id="sp-presentations-title" className="sp-h2">
            Presentations &amp; <em>knowledge sharing</em>
          </h2>
          <p className="sp-section__lead">
            Decks, explainers, workshops and notes: everything made so that an idea can travel further than the room it
            started in.
          </p>
        </Reveal>

        <div className="sp-tabs" role="tablist" aria-label="Types of material">
          {shelves.map((s, i) => {
            const count = shelfItems.filter((x) => x.kind === s.kind).length
            return (
              <button
                key={s.kind}
                id={`${uid}-tab-${s.kind}`}
                role="tab"
                type="button"
                aria-selected={active === s.kind}
                aria-controls={`${uid}-panel`}
                tabIndex={active === s.kind ? 0 : -1}
                className="sp-tab"
                onClick={() => setActive(s.kind)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="sp-tab__label">{s.label}</span>
                <span className="sp-tab__count">{count}</span>
              </button>
            )
          })}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="sp-panel">
          <p className="sp-panel__blurb">{current.blurb}</p>
          {items.length > 0 ? (
            <ul className="sp-shelfgrid">
              {items.map((it) => (
                <ShelfCard key={it.title} item={it} />
              ))}
            </ul>
          ) : (
            <div className="sp-shelfempty">
              <ul className="sp-ghosts" aria-hidden="true">
                <li />
                <li />
                <li />
              </ul>
              <p className="sp-empty__msg">{current.emptyMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
