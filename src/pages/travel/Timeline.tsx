import { useState } from 'react'
import { Link } from 'react-router-dom'
import { travelEmpty, type TravelEntry } from '../../data/travel'
import Reveal from '../../components/Reveal'
import { ArrowIcon } from '../../components/Icons'
import { BlankMap, Corners, Postmark } from './Decor'
import { journalPaths } from '../journal/paths'
import { fmtRange, postmarkParts, sortEntries, uniqueDestinations, yearOf } from './utils'

function Card({ e, i }: { e: TravelEntry; i: number }) {
  const [m, y] = postmarkParts(e.dateStart)
  const range = fmtRange(e.dateStart, e.dateEnd)
  const count = (e.cover ? 1 : 0) + (e.photos?.length ?? 0)
  return (
    <li className={`tj-stop ${i % 2 ? 'is-right' : ''}`}>
      <span className="tj-stop__pin" aria-hidden="true" />
      <Reveal>
        <Link to={`${journalPaths.travel}/${e.slug}`} className="tj-card">
          <span className="tj-card__photo">
            <Corners />
            {e.cover ? <img src={e.cover.src} alt={e.cover.alt} loading="lazy" /> : <span className="tj-card__blank" aria-hidden="true">✈</span>}
            <Postmark top={m} bottom={y} className="tj-card__mark" />
          </span>
          <span className="tj-card__body">
            {range && <span className="tj-script">{range}</span>}
            <span className="tj-card__dest">{e.destination}</span>
            {e.region && <span className="tj-card__region">{e.region}</span>}
            <span className="tj-card__sum">{e.summary}</span>
            <span className="tj-card__open">
              {count > 0 ? `Open the page · ${count} ${count === 1 ? 'photo' : 'photos'}` : 'Open the page'}
              <ArrowIcon />
            </span>
          </span>
        </Link>
      </Reveal>
    </li>
  )
}

/** Section 1: the timeline of trips (newest first), filterable by destination. */
export default function Timeline({ entries }: { entries: TravelEntry[] }) {
  const [dest, setDest] = useState<string | null>(null)
  const destinations = uniqueDestinations(entries)
  const shown = sortEntries(entries).filter((e) => !dest || e.destination === dest)
  const years = [...new Set(shown.map(yearOf))]

  return (
    <section id="tj-timeline" className="tj-section tj-timeline" aria-labelledby="tj-timeline-title">
      <div className="container">
        <Reveal>
          <p className="tj-kicker">01 — The route so far</p>
          <h2 id="tj-timeline-title" className="tj-h2">
            One page for <em>every place</em>
          </h2>
          <p className="tj-lead">Each trip gets its own spread: photographs, a story, the little finds and whatever I kept.</p>
        </Reveal>

        {entries.length === 0 ? (
          <div className="tj-emptymap">
            <BlankMap className="tj-emptymap__art" />
            <div className="tj-emptymap__text">
              <h3>{travelEmpty.timeline.title}</h3>
              <p>{travelEmpty.timeline.message}</p>
              <ul className="tj-prompts" aria-label="Questions each page will answer">
                {travelEmpty.timeline.prompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="tj-tagline">Each page will hold</p>
              <ul className="tj-fields">
                {travelEmpty.fields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            {destinations.length > 1 && (
              <div className="tj-filters" role="group" aria-label="Filter by destination">
                <button type="button" aria-pressed={dest === null} onClick={() => setDest(null)}>
                  All places
                </button>
                {destinations.map((d) => (
                  <button key={d} type="button" aria-pressed={dest === d} onClick={() => setDest(d)}>
                    {d}
                  </button>
                ))}
              </div>
            )}
            {years.map((y) => (
              <div key={y} className="tj-year">
                <h3 className="tj-year__label">{y}</h3>
                <ol className="tj-stops">
                  {shown
                    .filter((e) => yearOf(e) === y)
                    .map((e, i) => (
                      <Card key={e.slug} e={e} i={i} />
                    ))}
                </ol>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
