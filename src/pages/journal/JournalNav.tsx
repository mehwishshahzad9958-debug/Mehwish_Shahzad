import { NavLink } from 'react-router-dom'
import { journalSections } from '../../data/journal'
import { journalPaths } from './paths'
import './journal.css'

/** Section switcher shown across every page inside the Journal. */
export default function JournalNav() {
  return (
    <nav className="jn" aria-label="Journal sections">
      <div className="container jn__inner">
        <NavLink to={journalPaths.root} end className="jn__link">
          Overview
        </NavLink>
        {journalSections.map((s) => (
          <NavLink key={s.id} to={s.path} className="jn__link">
            {s.title}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
