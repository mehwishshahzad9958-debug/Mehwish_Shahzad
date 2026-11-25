import { Link } from 'react-router-dom'
import { mementoLabels, thingLabels, travelEmpty, type ThingKind, type TravelEntry } from '../../data/travel'
import Reveal from '../../components/Reveal'
import { EphemeraArt } from './Decor'
import Gallery from './Gallery'
import { journalPaths } from '../journal/paths'
import { sortEntries } from './utils'

/** Section 2: every café, plate and little thing, collected from all entries. */
export function Things({ entries }: { entries: TravelEntry[] }) {
  const all = sortEntries(entries).flatMap((e) => (e.things ?? []).map((t) => ({ ...t, entry: e })))
  const kinds = (Object.keys(thingLabels) as ThingKind[]).filter((k) => all.some((t) => t.kind === k))
  return (
    <section id="tj-things" className="tj-section tj-things" aria-labelledby="tj-things-title">
      <div className="container tj-things__inner">
        <Reveal className="tj-things__head">
          <p className="tj-kicker">02 — Worth remembering</p>
          <h2 id="tj-things-title" className="tj-h2">
            Cafés, plates &amp; <em>little things</em>
          </h2>
          <p className="tj-lead">The corner café, the dish I keep thinking about, the small details nobody else would notice.</p>
        </Reveal>

        <Reveal className="tj-menu">
          <p className="tj-menu__title">
            <span>Menu</span>
          </p>
          {all.length === 0 ? (
            <>
              <h3 className="tj-menu__empty">{travelEmpty.things.title}</h3>
              <p className="tj-menu__msg">{travelEmpty.things.message}</p>
              <ul className="tj-menu__rows" aria-label="What will be listed">
                {travelEmpty.things.rows.map((r) => (
                  <li key={r}>
                    <span>{r}</span>
                    <i aria-hidden="true" />
                    <span aria-hidden="true">—</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            kinds.map((k) => (
              <div key={k} className="tj-menu__group">
                <h3>{thingLabels[k]}</h3>
                <ul className="tj-menu__rows">
                  {all
                    .filter((t) => t.kind === k)
                    .map((t) => (
                      <li key={t.name + t.entry.slug}>
                        <span>
                          {t.name}
                          {t.note && <small>{t.note}</small>}
                        </span>
                        <i aria-hidden="true" />
                        <Link to={`${journalPaths.travel}/${t.entry.slug}`}>{t.entry.destination}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </Reveal>
      </div>
    </section>
  )
}

/** Section 3: tickets, maps, postcards and other paper keepsakes, laid out on a dark desk. */
export function Pocket({ entries }: { entries: TravelEntry[] }) {
  const all = sortEntries(entries).flatMap((e) => (e.mementos ?? []).map((m) => ({ ...m, entry: e })))
  return (
    <section id="tj-pocket" className="tj-section tj-pocket" aria-labelledby="tj-pocket-title">
      <div className="container">
        <Reveal>
          <p className="tj-kicker tj-kicker--light">03 — Kept</p>
          <h2 id="tj-pocket-title" className="tj-h2 tj-h2--light">
            A pocket <em>full of paper</em>
          </h2>
          <p className="tj-lead tj-lead--light">Tickets, maps, postcards and receipts: the paper that proves it happened.</p>
        </Reveal>

        {all.length === 0 ? (
          <div className="tj-slots">
            {(['ticket', 'postcard', 'map'] as const).map((k, i) => (
              <Reveal key={k} delay={i * 0.08} className="tj-slot">
                <EphemeraArt kind={k} />
                <p>{travelEmpty.mementos.slots[i]}</p>
              </Reveal>
            ))}
            <p className="tj-slots__msg">{travelEmpty.mementos.message}</p>
          </div>
        ) : (
          <ul className="tj-keepsakes">
            {all.map((m) => (
              <li key={m.src}>
                <figure className="tj-keepsake">
                  <span className="tj-keepsake__kind">{mementoLabels[m.kind]}</span>
                  <img src={m.src} alt={m.alt} loading="lazy" />
                  <figcaption>
                    {m.caption && <span className="tj-script">{m.caption}</span>}
                    <Link to={`${journalPaths.travel}/${m.entry.slug}`}>{m.entry.destination}</Link>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/** Section 4: doodles and handwritten margin notes from every trip. */
export function Sketchbook({ entries }: { entries: TravelEntry[] }) {
  const doodles = sortEntries(entries).flatMap((e) => e.doodles ?? [])
  const notes = sortEntries(entries).flatMap((e) => (e.notes ?? []).map((n) => ({ text: n, entry: e })))
  const empty = doodles.length === 0 && notes.length === 0
  return (
    <section id="tj-sketchbook" className="tj-section tj-sketch" aria-labelledby="tj-sketch-title">
      <div className="container">
        <Reveal>
          <p className="tj-kicker">04 — In the margins</p>
          <h2 id="tj-sketch-title" className="tj-h2">
            Sketchbook &amp; <em>handwritten notes</em>
          </h2>
        </Reveal>
        {empty ? (
          <Reveal className="tj-page tj-page--empty">
            <svg viewBox="0 0 200 90" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 60 C40 10 90 80 120 36 S170 20 186 50" strokeDasharray="1 8" />
              <path d="M176 36 L190 52 L170 56" />
              <circle cx="30" cy="68" r="10" />
              <path d="M24 68 H36 M30 62 V74" />
            </svg>
            <p className="tj-script tj-page__msg">{travelEmpty.sketchbook.message}</p>
          </Reveal>
        ) : (
          <>
            {doodles.length > 0 && <Gallery photos={doodles} label="Doodles and sketches" />}
            {notes.length > 0 && (
              <ul className="tj-notes">
                {notes.map((n, i) => (
                  <li key={n.text} style={{ ['--r' as string]: `${[-2, 1.5, -1][i % 3]}deg` }}>
                    <p className="tj-script">{n.text}</p>
                    <Link to={`${journalPaths.travel}/${n.entry.slug}`}>{n.entry.destination}</Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  )
}
