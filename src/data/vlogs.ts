/**
 * Everything on the Vlogs section lives here.
 *
 * Vlogs are Instagram posts and reels. You never upload video files: paste the
 * link to each post and the page builds a card for it. Clicking a card opens the
 * original post on Instagram. A "Preview here" button can also show the embedded
 * post, and if the embed does not load the card still links to Instagram.
 *
 * To add a video, add one line to `vlogs`. Only `url` is required:
 *
 *   { url: 'https://www.instagram.com/reel/XXXXXXXXXXX/' },
 *
 * Optional extras make the card nicer:
 *
 *   {
 *     url: 'https://www.instagram.com/reel/XXXXXXXXXXX/',
 *     title: 'A short title',                    // otherwise the card says "Instagram reel"
 *     caption: 'One sentence about the video.',
 *     date: '2026-03-14',
 *     thumbnail: { src: '/images/vlogs/xxxx.jpg', alt: 'What the cover shows' },  // a screenshot/cover you saved
 *   },
 *
 * Accepted links: instagram.com/reel/…, instagram.com/p/…, instagram.com/tv/…
 * (with or without the username in the path, with or without ?query parts).
 * Anything that is not an Instagram post link is skipped, with a warning in the browser console.
 * Put thumbnail images in /public/images/vlogs/.
 */

export interface VlogEntry {
  url: string
  title?: string
  caption?: string
  date?: string
  thumbnail?: { src: string; alt: string }
}

/** ADD YOUR OWN Instagram links here. */
export const vlogs: VlogEntry[] = []

export const vlogsCopy = {
  eyebrow: 'Journal · 03',
  title: 'Vlogs',
  lead: 'Moving pictures from my Instagram: a growing reel of the things I film and share.',
  empty: {
    title: 'The projector is warmed up.',
    message: 'Instagram videos will be lined up here as soon as the links are added. Each card opens the original post.',
    steps: ['Copy the link of an Instagram post or reel', 'Paste it into src/data/vlogs.ts', 'The card appears on this page'],
  },
}
