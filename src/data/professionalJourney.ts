/**
 * Professional timeline, oldest first (newest milestone last).
 * Only supplied facts appear here. To add a milestone, add an object in date order.
 * A missing `description` shows "Details to be added" rather than anything invented.
 */
import type { Milestone, PendingRecord } from './journeyShared'

export const professionalJourney: Milestone[] = [
  {
    id: 'miles2smile',
    organization: 'Miles2Smile',
    role: 'Volunteering and student development',
    start: '2020-01',
    end: '2020-07',
    categories: ['volunteering'],
  },
  {
    id: 'tamak',
    organization: 'TAMAK Coaching Centre',
    role: 'Coaching Centre Establishment, Teaching & Operations',
    // Only the year is known, so it is shown as a year. It is placed before CCE-PMT
    // because that job starts in January 2021. Reorder if the real order differs.
    dateText: '2021',
    start: '2021',
    description:
      'Established and ran a coaching centre with approximately 20 students, taking responsibility for both teaching and business operations.',
    categories: ['teaching', 'management'],
    explore: 'tamak',
  },
  {
    id: 'cce-pmt',
    organization: 'CCE-PMT',
    role: 'Junior Project Manager',
    start: '2021-01',
    end: '2022-03',
    categories: ['management'],
    explore: 'management',
  },
  {
    id: 'indus-towers',
    organization: 'Indus Towers',
    role: 'Project Lead, Agile Delivery',
    start: '2024-12',
    end: '2026-02',
    description:
      'Joined as an L1 NOC Engineer in Network Operations and progressed into a Project Lead role, leading 7 engineers and coordinating with 24 state stakeholders.',
    categories: ['technical', 'management'],
    explore: 'technical',
  },
  {
    id: 'peltown',
    organization: 'Peltown',
    role: 'Full Stack Developer and Business Analyst',
    start: '2026-07',
    end: 'present',
    description:
      'An independent role: client communication, requirements gathering, development and implementation, progress updates, and client feedback and approvals.',
    categories: ['technical'],
    explore: 'technical',
  },
]

/** Records waiting for real details. Move one into the list above once you have its dates. */
export const professionalPending: PendingRecord[] = [
  // Organisation names and years were supplied; role and details have not been confirmed yet.
  { id: 'sughar-public-school', title: 'Sughar Public School', dateText: '2019', note: 'Role and details to be added once confirmed.', categories: [] },
  { id: 'eureka-english', title: 'Eureka English', dateText: '2019', note: 'Role and details to be added once confirmed.', categories: [] },
  { id: 'talent-zone-school', title: 'Talent Zone School', dateText: '2024', note: 'Role and details to be added once confirmed.', categories: [] },
]
