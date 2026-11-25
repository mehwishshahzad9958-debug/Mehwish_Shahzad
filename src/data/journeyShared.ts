/**
 * Shared types for the "My Journey" homepage section.
 *
 * DESTINATIONS: a link only becomes clickable when `path` is set. Leave `path` out
 * while a page does not exist yet, and the timeline shows a non-clickable
 * "coming soon" label instead of a broken link. When you build a page, add its path here.
 */
export type JourneyCategory = 'technical' | 'management' | 'teaching' | 'volunteering' | 'education'

export const categoryLabels: Record<JourneyCategory, string> = {
  technical: 'Technical and project',
  management: 'Management',
  teaching: 'Teaching',
  volunteering: 'Volunteering',
  education: 'Education',
}

export interface JourneyDestination {
  label: string
  /** Set ONLY when the page exists. */
  path?: string
}

export const destinations = {
  technical: { label: 'Technical and project experience', path: '/technical-career' },
  management: { label: 'Management experience' },
  teaching: { label: 'Teaching experience' },
  tamak: { label: 'Teaching and management: TAMAK', path: '/teaching-management/tamak' },
  education: { label: 'Education milestones' },
  careerEvolution: { label: 'Career evolution' },
} satisfies Record<string, JourneyDestination>

export type DestinationKey = keyof typeof destinations

/** A single milestone on either timeline. */
export interface Milestone {
  id: string
  organization: string
  /** Position or experience type. */
  role: string
  /** 'YYYY' or 'YYYY-MM'. Use 'present' as `end` for a current role. */
  start?: string
  end?: string | 'present'
  /** Free text for records with only a year, e.g. graduation year. */
  dateText?: string
  /** Only supplied facts. Leave out until you have them. */
  description?: string
  categories: JourneyCategory[]
  /** Which page this milestone's link points to. */
  explore?: DestinationKey
}

/** Records that exist but are missing their real details. Shown as clearly marked placeholders. */
export interface PendingRecord {
  id: string
  title: string
  note: string
  categories: JourneyCategory[]
  /** Optional year text, e.g. '2019'. Shown on the bookshelf spine. Only set when the year was supplied. */
  dateText?: string
}
