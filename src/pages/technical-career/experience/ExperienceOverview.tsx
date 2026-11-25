import { experiences, experienceSections, getExperience, type ExperienceId, type ExperienceSectionId } from '../../../data/experience'
import type { FileId } from '../../../data/workspace'
import { AchievementsSection, LearningsSection, ProjectsSection, StorySection } from './ExperienceSections'
import ExperienceGallery from './ExperienceGallery'

export interface OverviewState {
  employer: ExperienceId
  section: ExperienceSectionId
}

interface Props {
  state: OverviewState
  onChange: (s: OverviewState) => void
  onOpenFile: (id: FileId) => void
}

/** "My Professional Experience": pick an employer, then browse its story, projects, achievements, learnings and gallery. */
export default function ExperienceOverview({ state, onChange, onOpenFile }: Props) {
  const exp = getExperience(state.employer)!
  const body = {
    overview: <StorySection exp={exp} />,
    projects: <ProjectsSection exp={exp} />,
    achievements: <AchievementsSection exp={exp} />,
    learnings: <LearningsSection exp={exp} />,
    gallery: <ExperienceGallery exp={exp} />,
  }[state.section]

  return (
    <div className="tc-doc">
      <p className="tc-code" aria-hidden="true"><span className="k">// </span>Experience</p>
      <h2 className="tc-title">My Professional Experience</h2>
      <p className="tc-lead">Two chapters so far: moving from network operations into delivery leadership, and now working independently with clients. Choose one to explore.</p>

      <div className="tc-seg" role="group" aria-label="Employer">
        {experiences.map((e) => (
          <button key={e.id} type="button" aria-pressed={state.employer === e.id} onClick={() => onChange({ ...state, employer: e.id })}>
            {e.company}
          </button>
        ))}
      </div>

      <div className="tc-card">
        <p className="tc-card__role">{exp.role}</p>
        <ul className="tc-meta">
          {exp.location && <li>{exp.location}</li>}
          <li>{exp.period}</li>
          {exp.current && <li className="is-live">Current</li>}
        </ul>
        <h3 className="tc-h4">Highlights</h3>
        <ul className="tc-list">{exp.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>

      <nav className="tc-outline" aria-label="Experience sections">
        {experienceSections.map((s) => (
          <button key={s.id} type="button" aria-pressed={state.section === s.id} onClick={() => onChange({ ...state, section: s.id })}>
            {s.label}
          </button>
        ))}
      </nav>
      <section className="tc-sec" aria-live="polite">
        <h3><span>{exp.company}</span>{experienceSections.find((s) => s.id === state.section)!.label}</h3>
        {body}
      </section>
      <button type="button" className="tc-btn tc-btn--ghost" onClick={() => onOpenFile(exp.id)}>
        Open {exp.fileName}
      </button>
    </div>
  )
}
