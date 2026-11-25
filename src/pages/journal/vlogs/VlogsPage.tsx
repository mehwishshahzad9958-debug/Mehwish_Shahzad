import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import { vlogs, vlogsCopy } from '../../../data/vlogs'
import { availableSocials } from '../../../data/site'
import { fmtDate } from '../../../lib/format'
import { usePageTitle } from '../../../hooks'
import { journalPaths } from '../paths'
import { ArrowIcon } from '../../../components/Icons'
import { parseInstagram, type ParsedInstagram } from './instagram'
import VlogDialog from './VlogDialog'
import './vlogs.css'

interface Card {
  ig: ParsedInstagram
  title: string
  caption?: string
  date?: string
  thumb?: { src: string; alt: string }
}

export default function VlogsPage() {
  usePageTitle('Vlogs')
  const [open, setOpen] = useState<Card | null>(null)

  const cards = useMemo<Card[]>(() => {
    const out: Card[] = []
    for (const v of vlogs) {
      const ig = parseInstagram(v.url)
      if (!ig) {
        console.warn(`[vlogs] Skipped, not an Instagram post link: ${v.url}`)
        continue
      }
      out.push({ ig, title: v.title ?? ig.label, caption: v.caption, date: v.date, thumb: v.thumbnail })
    }
    return out
  }, [])

  const insta = availableSocials.find((s) => s.id === 'instagram')

  return (
    <article className="vl">
      <header className="vl-hero">
        <div className="container">
          <Link to={journalPaths.root} className="back-link"><ArrowIcon />The Journal</Link>
          <p className="vl-eyebrow">{vlogsCopy.eyebrow}</p>
          <h1>{vlogsCopy.title}</h1>
          <p className="vl-lead">{vlogsCopy.lead}</p>
          {insta?.url && (
            <a className="vl-follow" href={insta.url} target="_blank" rel="noopener noreferrer">
              Follow on Instagram <ArrowIcon />
            </a>
          )}
        </div>
      </header>

      <section className="vl-reel" aria-label="Videos">
        <div className="container">
          {cards.length === 0 ? (
            <div className="vl-empty">
              <div className="vl-empty__screens" aria-hidden="true">
                {[0, 1, 2].map((i) => <span key={i}><i /></span>)}
              </div>
              <div>
                <h2>{vlogsCopy.empty.title}</h2>
                <p>{vlogsCopy.empty.message}</p>
                <ol className="vl-steps">
                  {vlogsCopy.empty.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            </div>
          ) : (
            <ul className="vl-grid">
              {cards.map((c) => (
                <li key={c.ig.url} className="vl-card">
                  <a className="vl-card__poster" href={c.ig.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.title} (opens on Instagram, new tab)`}>
                    {c.thumb ? <img src={c.thumb.src} alt={c.thumb.alt} loading="lazy" /> : <span className="vl-card__fallback" aria-hidden="true" />}
                    <span className="vl-card__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
                    <span className="vl-card__badge" aria-hidden="true">{c.ig.kind === 'reel' ? 'Reel' : c.ig.kind === 'tv' ? 'Video' : 'Post'}</span>
                  </a>
                  <div className="vl-card__body">
                    <h3>{c.title}</h3>
                    {c.date && <p className="vl-card__date">{fmtDate(c.date)}</p>}
                    {c.caption && <p className="vl-card__cap">{c.caption}</p>}
                    <div className="vl-card__actions">
                      <a href={c.ig.url} target="_blank" rel="noopener noreferrer">Watch on Instagram <ArrowIcon /></a>
                      <button type="button" onClick={() => setOpen(c)}>Preview here</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {open && <VlogDialog item={open.ig} title={open.title} onClose={() => setOpen(null)} />}
    </article>
  )
}
