import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { Link, useParams } from 'react-router-dom'
import { mementoLabels, thingLabels, travelEntries, type ThingKind } from '../../data/travel'
import { usePageTitle } from '../../hooks'
import NotFoundPage from '../NotFoundPage'
import { ArrowIcon } from '../../components/Icons'
import Reveal from '../../components/Reveal'
import { Corners, Postmark } from './Decor'
import Gallery from './Gallery'
import { fmtRange, postmarkParts, sortEntries } from './utils'
import { journalPaths } from '../journal/paths'
import './travel.css'

/** One destination = one spread. The URL slug picks the entry from data/travel.ts. */
export default function TravelEntryPage() {
  const { slug } = useParams()
  const sorted = sortEntries(travelEntries)
  const index = sorted.findIndex((e) => e.slug === slug)
  const e = index >= 0 ? sorted[index] : undefined
  usePageTitle(e ? `${e.destination} · Travel Journal` : undefined)

  if (!e) return <NotFoundPage />

  const [m, y] = postmarkParts(e.dateStart)
  const range = fmtRange(e.dateStart, e.dateEnd)
  const newer = sorted[index - 1]
  const older = sorted[index + 1]
  const kinds = (Object.keys(thingLabels) as ThingKind[]).filter((k) => e.things?.some((t) => t.kind === k))

  return (
    <article className="tj tj--entry">
      <header className="tj-entry__hero">
        <div className="container tj-entry__hero-inner">
          <div>
            <Link to={journalPaths.travel} className="tj-back">
              <ArrowIcon />
              Travel Journal
            </Link>
            {e.region && <p className="tj-kicker">{e.region}</p>}
            <h1 className="tj-entry__title">{e.destination}</h1>
            {range && <p className="tj-script tj-entry__date">{range}</p>}
            <p className="tj-entry__summary">{e.summary}</p>
          </div>
          <div className="tj-entry__cover">
            <Postmark top={m} bottom={y} className="tj-entry__mark" />
            {e.cover ? (
              <figure className="tj-photo tj-photo--cover">
                <Corners />
                <img src={e.cover.src} alt={e.cover.alt} />
                {e.cover.caption && <figcaption className="tj-photo__cap">{e.cover.caption}</figcaption>}
              </figure>
            ) : (
              <div className="tj-card__blank tj-entry__blank" aria-hidden="true">
                ✈
              </div>
            )}
          </div>
        </div>
        <div className="tj-airmail" aria-hidden="true" />
      </header>

      {(e.story || e.notes) && (
        <section className="tj-section tj-story" aria-label="The story">
          <div className="container tj-story__inner">
            {e.story && (
              <Reveal className="tj-story__text">
                {e.story.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Reveal>
            )}
            {e.notes && (
              <aside className="tj-margin" aria-label="Margin notes">
                {e.notes.map((n, i) => (
                  <p key={n} className="tj-script" style={{ ['--r' as string]: `${[-3, 2, -1.5][i % 3]}deg` }}>
                    {n}
                  </p>
                ))}
              </aside>
            )}
          </div>
        </section>
      )}

      {e.photos && e.photos.length > 0 && (
        <section className="tj-section tj-album" aria-labelledby="tj-album-title">
          <div className="container">
            <h2 id="tj-album-title" className="tj-h2">
              From the <em>album</em>
            </h2>
            <Gallery photos={e.photos} label={`Photographs from ${e.destination}`} />
          </div>
        </section>
      )}

      {kinds.length > 0 && (
        <section className="tj-section tj-things" aria-labelledby="tj-fav-title">
          <div className="container tj-things__inner">
            <div className="tj-things__head">
              <h2 id="tj-fav-title" className="tj-h2">
                Little <em>things</em>
              </h2>
              <p className="tj-lead">Cafés, food and small finds worth remembering from {e.destination}.</p>
            </div>
            <div className="tj-menu">
              <p className="tj-menu__title">
                <span>Menu</span>
              </p>
              {kinds.map((k) => (
                <div key={k} className="tj-menu__group">
                  <h3>{thingLabels[k]}</h3>
                  <ul className="tj-menu__rows">
                    {e.things!.filter((t) => t.kind === k).map((t) => (
                      <li key={t.name}>
                        <span>
                          {t.name}
                          {t.note && <small>{t.note}</small>}
                        </span>
                        <i aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {e.mementos && e.mementos.length > 0 && (
        <section className="tj-section tj-pocket" aria-labelledby="tj-kept-title">
          <div className="container">
            <h2 id="tj-kept-title" className="tj-h2 tj-h2--light">
              What I <em>kept</em>
            </h2>
            <ul className="tj-keepsakes">
              {e.mementos.map((k) => (
                <li key={k.src}>
                  <figure className="tj-keepsake">
                    <span className="tj-keepsake__kind">{mementoLabels[k.kind]}</span>
                    <img src={k.src} alt={k.alt} loading="lazy" />
                    {k.caption && (
                      <figcaption>
                        <span className="tj-script">{k.caption}</span>
                      </figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {e.doodles && e.doodles.length > 0 && (
        <section className="tj-section tj-sketch" aria-labelledby="tj-doodle-title">
          <div className="container">
            <h2 id="tj-doodle-title" className="tj-h2">
              Doodles &amp; <em>sketches</em>
            </h2>
            <Gallery photos={e.doodles} label={`Doodles from ${e.destination}`} />
          </div>
        </section>
      )}

      {e.reflection && (
        <section className="tj-section tj-reflection" aria-labelledby="tj-refl-title">
          <div className="container">
            <Reveal>
              <h2 id="tj-refl-title" className="tj-kicker">
                What it left me with
              </h2>
              <blockquote className="tj-script tj-reflection__quote">{e.reflection}</blockquote>
            </Reveal>
          </div>
        </section>
      )}

      <nav className="tj-pager" aria-label="Other journeys">
        <div className="container tj-pager__inner">
          {older ? (
            <Link to={`${journalPaths.travel}/${older.slug}`} className="tj-pager__link">
              <span>Earlier</span>
              {older.destination}
            </Link>
          ) : (
            <span />
          )}
          <Link to={journalPaths.travel} className="tj-btn">
            All journeys
          </Link>
          {newer ? (
            <Link to={`${journalPaths.travel}/${newer.slug}`} className="tj-pager__link tj-pager__link--next">
              <span>Later</span>
              {newer.destination}
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  )
}
