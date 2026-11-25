import { Link } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { capabilities, perspectives, tamak } from '../../data/tamak'
import { usePageTitle } from '../../hooks'
import { ArrowIcon } from '../../components/Icons'
import Reveal from '../../components/Reveal'
import OperatingDiagram from './OperatingDiagram'
import ArtefactGallery from './ArtefactGallery'
import './teaching.css'

/** TAMAK Coaching Centre: the detail view inside Teaching and Management. */
export default function TamakPage() {
  usePageTitle('TAMAK Coaching Centre')
  return (
    <article className="tk">
      <header className="tk-hero">
        <div className="container">
          <Link to="/teaching-management" className="back-link"><ArrowIcon />Teaching and Management</Link>
          <p className="tk-eyebrow">{tamak.eyebrow}</p>
          <h1>{tamak.name}</h1>
          <p className="tk-lead">{tamak.lead}</p>
          <dl className="tk-facts">
            <div><dt>Year</dt><dd>{tamak.year}</dd></div>
            <div><dt>Duration</dt><dd>{tamak.duration}</dd></div>
            <div className="is-key"><dt>Students</dt><dd>{tamak.students}</dd><small>{tamak.studentsNote}</small></div>
            <div><dt>Role</dt><dd>{tamak.role}</dd><small>{tamak.roleNote}</small></div>
          </dl>
        </div>
      </header>

      <section className="tk-sec" aria-labelledby="tk-how">
        <div className="container">
          <Reveal>
            <p className="tk-kicker">01 · The centre at work</p>
            <h2 id="tk-how">One person, two jobs: educator and founder.</h2>
            <OperatingDiagram />
          </Reveal>
        </div>
      </section>

      <section className="tk-sec tk-sec--tint" aria-labelledby="tk-areas">
        <div className="container">
          <Reveal>
            <p className="tk-kicker">02 · Four perspectives</p>
            <h2 id="tk-areas">What the work actually involved.</h2>
          </Reveal>
          <div className="tk-areas">
            {perspectives.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.08}>
                <article className={`tk-area is-${p.id}`}>
                  <span className="tk-area__letter" aria-hidden="true">{p.letter}</span>
                  <h3>{p.title}</h3>
                  <p className="tk-area__sum">{p.summary}</p>
                  <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="tk-sec" aria-labelledby="tk-skills">
        <div className="container">
          <Reveal>
            <p className="tk-kicker">03 · Capabilities developed</p>
            <h2 id="tk-skills">What this experience taught me to do.</h2>
            <p className="tk-note">These are capabilities built through the work above, not claims of expertise.</p>
          </Reveal>
          <ul className="tk-caps">
            {capabilities.map((c) => (
              <li key={c.title}><h3>{c.title}</h3><p>{c.developedBy}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tk-sec tk-sec--tint" aria-labelledby="tk-arte">
        <div className="container">
          <Reveal>
            <p className="tk-kicker">04 · From the centre</p>
            <h2 id="tk-arte">Photographs, advertisements and course materials.</h2>
            <p className="tk-note">Only original assets from the centre will be shown here.</p>
          </Reveal>
          <ArtefactGallery />
        </div>
      </section>
    </article>
  )
}
