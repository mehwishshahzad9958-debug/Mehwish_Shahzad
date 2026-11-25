import { journalPaths } from '../pages/journal/paths'

export type JournalSectionId = 'blogs' | 'travel' | 'vlogs' | 'gallery'

export interface JournalSection {
  id: JournalSectionId
  number: string
  /** Name used in navigation and headings. */
  title: string
  /** One word shown in the landing headline. */
  verb: string
  path: string
  description: string
  /** What the section holds, used for the empty-state counter. */
  unit: [singular: string, plural: string]
}

/** The four sections of the Journal. Edit the wording freely. */
export const journalSections: JournalSection[] = [
  {
    id: 'blogs',
    number: '01',
    title: 'Blogs',
    verb: 'Read',
    path: journalPaths.blogs,
    description: 'Written pieces: stories, thoughts, things I am learning and what I make of them.',
    unit: ['article', 'articles'],
  },
  {
    id: 'travel',
    number: '02',
    title: 'Travel Journal',
    verb: 'Wander',
    path: journalPaths.travel,
    description: 'A personal diary of places: photographs, tickets, cafés, doodles and the little things I found.',
    unit: ['trip', 'trips'],
  },
  {
    id: 'vlogs',
    number: '03',
    title: 'Vlogs',
    verb: 'Watch',
    path: journalPaths.vlogs,
    description: 'My videos, collected from Instagram. Every card opens the original post.',
    unit: ['video', 'videos'],
  },
  {
    id: 'gallery',
    number: '04',
    title: 'Gallery',
    verb: 'Look',
    path: journalPaths.gallery,
    description: 'A photography collection, grouped into collections you can browse and enlarge.',
    unit: ['photo', 'photos'],
  },
]

export const journalHero = {
  eyebrow: 'The Journal',
  lead: 'Four ways of keeping what I notice: things I write, places I wander, videos I film and photographs I take.',
}
