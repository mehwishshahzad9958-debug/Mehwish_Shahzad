import type { Discipline } from '../../data/creativity'
import Reveal from '../../components/Reveal'
import EntryCard from './EntryCard'
import { DisciplineArt, Squiggle } from './Illustrations'

/** One creative discipline = one visually distinct section (styled by `.cr-disc--<id>`). */
export default function DisciplineSection({ d }: { d: Discipline }) {
  const headingId = `cr-${d.id}-title`
  return (
    <section id={`cr-${d.id}`} className={`cr-disc cr-disc--${d.id}`} aria-labelledby={headingId}>
      <div className="container">
        <Reveal className="cr-disc__head">
          <div className="cr-disc__titles">
            <p className="cr-disc__num" aria-hidden="true">
              {d.number}
            </p>
            <h2 id={headingId}>{d.title}</h2>
            <p className="cr-note">{d.note}</p>
            <Squiggle className="cr-disc__squiggle" />
            <p className="cr-disc__blurb">{d.blurb}</p>
          </div>
          <DisciplineArt id={d.id} className="cr-disc__art" />
        </Reveal>

        {d.entries.length > 0 ? (
          <ul className="cr-grid">
            {d.entries.map((e) => (
              <EntryCard key={e.title} entry={e} discipline={d.id} />
            ))}
          </ul>
        ) : (
          <Reveal className={`cr-empty cr-empty--${d.id}`}>
            <div className="cr-empty__main">
              <DisciplineArt id={d.id} className="cr-empty__art" />
              <h3>{d.empty.title}</h3>
              <p>{d.empty.message}</p>
            </div>
            <ul className="cr-empty__prompts" aria-label="What each entry will include">
              {d.empty.prompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}
