/**
 * Education timeline, oldest first.
 * School education and certifications have no supplied details yet, so they are
 * shown as clearly marked placeholders. Do not fill in names or dates until confirmed.
 * To add a record, add an object to `educationJourney` and remove the matching placeholder.
 */
import type { Milestone, PendingRecord } from './journeyShared'

export type EducationItem =
  | { kind: 'record'; order: number; record: Milestone }
  | { kind: 'pending'; order: number; record: PendingRecord }

export const educationTimeline: EducationItem[] = [
  {
    kind: 'pending',
    order: 1,
    record: { id: 'school', title: 'School education', note: 'School details to be added.', categories: ['education'] },
  },
  {
    kind: 'record',
    order: 2,
    record: {
      id: 'btech',
      organization: 'Noida Institute',
      role: 'Bachelor of Technology',
      dateText: 'Graduated 2025',
      categories: ['education'],
      explore: 'education',
    },
  },
  {
    kind: 'pending',
    order: 3,
    record: { id: 'certs', title: 'Certifications and professional learning', note: 'Certifications to be added once confirmed.', categories: ['education'] },
  },
]
