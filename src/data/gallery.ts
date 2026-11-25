/**
 * Everything on the Gallery section lives here.
 *
 * `galleryPhotos` starts EMPTY on purpose, so the page shows an empty state until
 * you add real photographs. Each photo points at an image file and belongs to a collection.
 *
 * 1. Put image files in /public/images/gallery/
 * 2. (Optional) define collections below. Collections with no photos are hidden.
 * 3. Add photos:
 *
 *   {
 *     src: '/images/gallery/street-morning.jpg',
 *     alt: 'Describe the photograph for people who cannot see it',
 *     caption: 'Optional caption',
 *     collection: 'everyday',                  // the id of a collection below
 *     date: '2026-03-14',                      // optional
 *     location: 'Optional place name',         // optional
 *     width: 1600, height: 1067,               // optional, stops the layout jumping while images load
 *   }
 */

export interface GalleryCollection {
  id: string
  title: string
  description?: string
}

export interface GalleryPhoto {
  src: string
  alt: string
  caption?: string
  collection?: string
  date?: string
  location?: string
  width?: number
  height?: number
}

/** Rename or replace these collections to suit your photographs. */
export const galleryCollections: GalleryCollection[] = [
  { id: 'everyday', title: 'Everyday', description: 'Ordinary moments, looked at twice.' },
  { id: 'places', title: 'Places', description: 'Streets, landscapes and corners worth stopping for.' },
  { id: 'details', title: 'Details', description: 'Textures, colours and small things up close.' },
]

/** ADD YOUR OWN photographs here. */
export const galleryPhotos: GalleryPhoto[] = []

export const galleryCopy = {
  eyebrow: 'Journal · 04',
  title: 'Gallery',
  lead: 'A photography collection, hung for browsing. Pick a collection, then open any image to look closer.',
  empty: {
    title: 'The walls are bare, for now.',
    message: 'Photographs will be hung here, grouped into collections and ready to enlarge.',
  },
}
