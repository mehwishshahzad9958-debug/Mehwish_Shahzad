import { Link } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import { tamak } from '../../data/tamak'
import { usePageTitle } from '../../hooks'
import { ArrowIcon } from '../../components/Icons'
import './teaching.css'

/** Teaching and Management: where the experiences that combine education and running things live. */
export default function TeachingManagementPage() {
  usePageTitle('Teaching and Management')
  return (
    <article className="tk">
      <header className="tk-hero tk-hero--short">
        <div className="container">
          <Link to="/" className="back-link"><ArrowIcon />Home</Link>
          <p className="tk-eyebrow">Experience</p>
          <h1>Teaching and Management</h1>
          <p className="tk-lead">Experiences where education and running things come together.</p>
        </div>
      </header>
      <section className="tk-sec" aria-label="Experiences">
        <div className="container tk-list">
          <Link to="/teaching-management/tamak" className="tk-entry">
            <span className="tk-entry__meta">{tamak.year} · {tamak.duration}</span>
            <strong>{tamak.name}</strong>
            <span>Founded and ran a coaching centre of {tamak.students} students: teaching, operations, marketing and parent communication.</span>
            <span className="tk-entry__go">Read the story <ArrowIcon /></span>
          </Link>
          <div className="tk-ph tk-ph--wide">
            <span className="tk-ph__frame" aria-hidden="true" />
            <p><strong>More to come</strong>Other teaching and management experiences will be added here.</p>
          </div>
        </div>
      </section>
    </article>
  )
}
