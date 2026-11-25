/**
 * TAMAK Coaching Centre: content for the detail page at /teaching-management/tamak.
 * Only supplied facts appear. Photographs, advertisements, course materials and
 * other artefacts are EMPTY on purpose: the page shows placeholders until you add real assets.
 *
 * To add an artefact: put the file in /public/images/tamak/ and add an object to the matching
 * list in `tamakArtefacts` below, for example:
 *   { src: '/images/tamak/poster.jpg', alt: 'Describe the image', caption: 'Optional caption' }
 * Do not use stock or AI-generated images.
 */

export const tamak = {
  name: 'TAMAK Coaching Centre',
  year: '2021',
  duration: 'Less than one year',
  /** Approximate, as supplied. */
  students: '≈ 20',
  studentsNote: 'students, taught directly',
  role: 'Founder',
  roleNote: 'Multi-functional responsibilities',
  eyebrow: 'Teaching and Management · 2021',
  lead: 'This was not simply a teaching assignment. I established a coaching centre, ran it, and delivered the teaching myself, taking responsibility for both the education and the business behind it.',
}

export type PerspectiveId = 'teaching' | 'operations' | 'marketing' | 'communication'

export interface Perspective {
  id: PerspectiveId
  letter: string
  title: string
  summary: string
  points: string[]
}

export const perspectives: Perspective[] = [
  {
    id: 'teaching',
    letter: 'A',
    title: 'Teaching and curriculum',
    summary: 'The classroom side: what was taught and how it was structured.',
    points: [
      'Taught Science and Mathematics',
      'Designed courses and learning structures',
      'Worked directly with approximately 20 students',
    ],
  },
  {
    id: 'operations',
    letter: 'B',
    title: 'Centre management and operations',
    summary: 'The business side: keeping the centre running day to day.',
    points: [
      'Established and operated the coaching centre',
      'Managed student admissions',
      'Handled fee collection and financial management',
      'Managed scheduling and daily operations',
      'Hired or managed other teachers',
    ],
  },
  {
    id: 'marketing',
    letter: 'C',
    title: 'Marketing and creative work',
    summary: 'Making the centre visible.',
    points: [
      'Designed advertisement materials',
      'Created marketing and promotional materials for the centre',
    ],
  },
  {
    id: 'communication',
    letter: 'D',
    title: 'Communication and stakeholder management',
    summary: 'Keeping parents informed and involved.',
    points: [
      'Communicated with parents',
      'Handled parent interactions related to students and the centre',
    ],
  },
]

/** The picture of how the centre ran: who it worked with, and what was run. All drawn from the lists above. */
export const operatingModel = {
  people: [
    { label: 'Students', note: 'about 20', feeds: 'teaching' as PerspectiveId },
    { label: 'Parents', note: 'ongoing communication', feeds: 'communication' as PerspectiveId },
    { label: 'Other teachers', note: 'hired or managed', feeds: 'operations' as PerspectiveId },
  ],
}

export interface Capability {
  title: string
  /** How it was developed, tied to a supplied activity. */
  developedBy: string
}

export const capabilities: Capability[] = [
  { title: 'Entrepreneurship and initiative', developedBy: 'Developed by establishing the centre and taking it from idea to daily operation.' },
  { title: 'Teaching and knowledge delivery', developedBy: 'Developed by teaching Science and Mathematics directly to about 20 students.' },
  { title: 'Curriculum and course design', developedBy: 'Developed by designing the courses and learning structures used at the centre.' },
  { title: 'Operations management', developedBy: 'Developed by managing admissions, scheduling and daily operations.' },
  { title: 'Financial administration', developedBy: 'Developed by handling fee collection and financial management.' },
  { title: 'People management', developedBy: 'Developed by hiring or managing other teachers.' },
  { title: 'Marketing and communication', developedBy: 'Developed by designing promotional materials and communicating with parents.' },
]

export interface Artefact {
  src: string
  alt: string
  caption?: string
}

export const tamakArtefactGroups = [
  { id: 'photos', title: 'Photographs', hint: 'Photos of the centre, classes and events' },
  { id: 'ads', title: 'Advertisements', hint: 'Posters and promotional material I designed' },
  { id: 'course', title: 'Course materials', hint: 'Course outlines, notes and learning structures' },
  { id: 'other', title: 'Other artefacts', hint: 'Anything else from the centre' },
] as const
export type ArtefactGroupId = (typeof tamakArtefactGroups)[number]['id']

/** ADD YOUR OWN real assets here. Empty until you supply them. */
export const tamakArtefacts: Record<ArtefactGroupId, Artefact[]> = {
  photos: [],
  ads: [],
  course: [],
  other: [],
}
