/**
 * Photographs for the Experience Gallery. Each employer has its OWN list, kept
 * separate from the personal Journal Gallery (src/data/gallery.ts).
 *
 * Lists start EMPTY on purpose. Until you add real photographs the gallery shows
 * a designed empty state. Do not use stock or AI-generated images here.
 *
 * To add photos:
 *  1. Put image files in /public/images/experience/<company>/
 *  2. Add objects to the matching list below:
 *
 *   {
 *     src: '/images/experience/indus-towers/team-day.jpg',
 *     alt: 'Describe the photo for people who cannot see it',
 *     caption: 'Optional caption',
 *   },
 */
import type { ExperienceId } from './experience'

export interface ExperiencePhoto {
  src: string
  alt: string
  caption?: string
}

export const experiencePhotos: Record<ExperienceId, ExperiencePhoto[]> = {
  indus: [],
  peltown: [],
}
