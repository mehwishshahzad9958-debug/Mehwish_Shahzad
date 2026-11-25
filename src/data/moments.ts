export interface Moment {
  image: string
  alt: string
  caption: string
}

/**
 * Recent Moments. The photos are placeholders — replace the files in
 * public/images and update the captions with real ones.
 */
export const moments: Moment[] = [
  { image: '/images/moment-1.jpg', alt: 'Hands working on a laptop beside a notebook', caption: 'Workspace moments' },
  { image: '/images/moment-2.jpg', alt: 'Watercolor palette and a painting in progress', caption: 'Colour and canvas' },
  { image: '/images/moment-3.jpg', alt: 'Crocheted pieces in a basket', caption: 'Yarn and thread' },
  { image: '/images/moment-4.jpg', alt: 'Mountain valley with low clouds', caption: 'Out exploring' },
]
