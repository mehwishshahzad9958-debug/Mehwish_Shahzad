/**
 * Everything on the Travel Journal lives here.
 *
 * `travelEntries` starts EMPTY on purpose: the page shows designed empty states
 * until you add a real trip. Add an object to the array and a new page appears at
 * /journal/travel/<slug>, plus a card on the timeline, and its cafés, memorabilia
 * and doodles show up in the collection sections automatically.
 *
 * Example (copy, then fill in with your own real details):
 *
 *   {
 *     slug: 'my-first-trip',                    // used in the URL: /journal/travel/my-first-trip
 *     destination: 'Place name',
 *     region: 'Country or region',              // optional
 *     dateStart: '2026-03-12',                  // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'; optional
 *     dateEnd: '2026-03-18',                    // optional
 *     summary: 'One or two sentences for the card.',
 *     cover: { src: '/images/travel/place-cover.jpg', alt: 'What the photo shows', caption: 'Handwritten caption' },
 *     photos: [{ src: '/images/travel/place-2.jpg', alt: '...', caption: '...' }],
 *     story: ['First paragraph...', 'Second paragraph...'],
 *     things: [{ kind: 'cafe', name: 'Café name', note: 'Why I liked it' }],
 *     mementos: [{ kind: 'ticket', src: '/images/travel/ticket.jpg', alt: '...', caption: '...' }],
 *     doodles: [{ src: '/images/travel/doodle.jpg', alt: '...', caption: '...' }],
 *     notes: ['A short handwritten-style note for the margin.'],
 *     reflection: 'What this trip left me with.',
 *   }
 *
 * Every field except slug, destination and summary is optional; sections with no
 * content are simply left out of that entry's page.
 * Put image files in /public/images/travel/ and refer to them as '/images/travel/<file>'.
 */

export interface TravelPhoto {
  src: string
  alt: string
  caption?: string
}

export type ThingKind = 'cafe' | 'restaurant' | 'food' | 'place' | 'little-thing'

export interface TravelThing {
  kind: ThingKind
  name: string
  note?: string
}

export type MementoKind = 'ticket' | 'map' | 'postcard' | 'receipt' | 'other'

export interface Memento {
  kind: MementoKind
  src: string
  alt: string
  caption?: string
}

export interface TravelEntry {
  slug: string
  destination: string
  region?: string
  dateStart?: string
  dateEnd?: string
  summary: string
  cover?: TravelPhoto
  photos?: TravelPhoto[]
  story?: string[]
  things?: TravelThing[]
  mementos?: Memento[]
  doodles?: TravelPhoto[]
  notes?: string[]
  reflection?: string
}

/** ADD YOUR OWN trips here. */
export const travelEntries: TravelEntry[] = []

export const thingLabels: Record<ThingKind, string> = {
  cafe: 'Cafés',
  restaurant: 'Restaurants',
  food: 'Things I ate',
  place: 'Places I stumbled on',
  'little-thing': 'Little things',
}

export const mementoLabels: Record<MementoKind, string> = {
  ticket: 'Ticket',
  map: 'Map',
  postcard: 'Postcard',
  receipt: 'Receipt',
  other: 'Keepsake',
}

// ---------------------------------------------------------------- Page copy (draft wording, edit freely)

export const travelHero = {
  eyebrow: 'Travel Journal',
  beats: ['Wander.', 'Notice.', 'Write it down.'],
  lead: 'A visual diary of the places I go, the small things I find along the way, and the moments I want to keep.',
}

export const travelEmpty = {
  timeline: {
    title: 'No stops on the map yet.',
    message: 'When I add a trip, it becomes a page of its own: a destination, dates, photographs, a story and a few doodles.',
    prompts: ['Where to first?', 'What did I notice?', 'What did I bring home?'],
  },
  fields: ['Destination & dates', 'Photographs', 'The story', 'Cafés & food', 'Tickets & maps', 'Doodles & notes', 'A reflection'],
  things: {
    title: 'The menu is still blank.',
    message: 'Cafés, plates and little things worth remembering will be listed here, with the trip each one belongs to.',
    rows: ['A café I loved', 'Something I ate', 'A small thing that made me smile'],
  },
  mementos: {
    message: 'Tickets, maps, postcards and other paper keepsakes will be tucked in here once there are some to show.',
    slots: ['a ticket stub', 'a postcard', 'a folded map'],
  },
  sketchbook: {
    message: 'Doodles, sketches and handwritten margin notes will collect on these pages.',
  },
}

export const travelClosing = {
  statement: 'Some places you visit. Some you carry with you.',
  sub: 'Next stop: wherever curiosity points.',
}
