/**
 * Content for the Technical & Career workspace.
 * Only facts supplied by Mehwish appear here. Anything not supplied is left empty
 * on purpose, and the page shows a designed empty state instead.
 *
 * To update later:
 *  - Add a case study: push an object into an experience's `projects` array.
 *  - Add a tool: push a string into `tools`.
 *  - Add an outcome: push into `achievements` (add `figure` only for a real, measured number).
 *  - Photos live in a separate file: src/data/experience-photos.ts
 */

export type ExperienceId = 'indus' | 'peltown'

export interface CaseStudy {
  title: string
  problem?: string
  responsibility?: string
  approach?: string
  stakeholders?: string[]
  outcome?: string
}

export interface Achievement {
  text: string
  /** Only for a real, supplied number. Example: { value: '7', label: 'engineers led' } */
  figure?: { value: string; label: string }
}

export interface Experience {
  id: ExperienceId
  /** Name shown on the editor tab and in the Explorer. */
  fileName: string
  company: string
  role: string
  /** Leave undefined if no location was supplied. */
  location?: string
  period: string
  current?: boolean
  summary: string
  progression: { label: string; note?: string }[]
  /** Short sentence explaining the working context, when there is no promotion path. */
  roleContext?: string
  responsibilities: string[]
  projects: CaseStudy[]
  tools: string[]
  achievements: Achievement[]
  learnings: string[]
}

export const experiences: Experience[] = [
  {
    id: 'indus',
    fileName: 'Indus Towers.ts',
    company: 'Indus Towers',
    role: 'Project Lead, Agile Delivery',
    location: 'Gurugram',
    period: 'December 2024 – February 2026',
    summary:
      'Joined in Network Operations as an L1 NOC Engineer and progressed into a Project Lead role, leading delivery work across engineers and state stakeholders.',
    progression: [
      { label: 'L1 NOC Engineer', note: 'Network Operations' },
      { label: 'Project Lead', note: 'Agile Delivery' },
    ],
    responsibilities: [
      'Led a team of 7 engineers',
      'Coordinated with 24 state stakeholders',
      'Worked on ticket automation and workflow improvements',
      'Prepared BRDs and end-to-end SOPs',
      'Coordinated UAT',
      'Worked with Power BI dashboards and operational reporting',
    ],
    projects: [],
    tools: ['Power BI'],
    achievements: [
      { text: 'Led a team of 7 engineers.', figure: { value: '7', label: 'engineers led' } },
      { text: 'Coordinated with 24 state stakeholders.', figure: { value: '24', label: 'state stakeholders' } },
      { text: 'Contributed to improvements in operational accuracy and ticket closure.' },
    ],
    learnings: [],
  },
  {
    id: 'peltown',
    fileName: 'Peltown.ts',
    company: 'Peltown',
    role: 'Full Stack Developer and Business Analyst',
    period: 'July 2026 – Present',
    current: true,
    summary:
      'An independent role: working directly with clients, from gathering requirements through development and implementation to progress updates and approvals.',
    progression: [],
    roleContext: 'Works independently. Not a team-management role.',
    responsibilities: [
      'Client communication',
      'Requirements gathering',
      'Development and implementation',
      'Progress updates',
      'Client feedback and approvals',
    ],
    projects: [],
    tools: [],
    achievements: [],
    learnings: [],
  },
]

export const getExperience = (id: string) => experiences.find((e) => e.id === id)

/** The labelled sections of an experience, in the order they appear. */
export const experienceSections = [
  { id: 'overview', label: 'Career story' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'learnings', label: 'Learnings' },
  { id: 'gallery', label: 'Gallery' },
] as const
export type ExperienceSectionId = (typeof experienceSections)[number]['id']
