/**
 * Everything on the Blogs section lives here.
 *
 * `blogPosts` starts EMPTY on purpose, so the page shows an empty state until you
 * publish something real. Add an object and the article appears on the Blogs page
 * and gets its own page at /journal/blogs/<slug>.
 *
 * Example (copy, then fill in your own writing):
 *
 *   {
 *     slug: 'my-first-post',                       // used in the URL
 *     title: 'The title',
 *     date: '2026-03-14',                          // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'
 *     category: 'Learning',                        // used for the filter buttons
 *     description: 'One or two sentences for the card.',
 *     cover: { src: '/images/blog/my-first-post.jpg', alt: 'What the cover shows' },
 *     body: [
 *       { type: 'p', text: 'A paragraph.' },
 *       { type: 'h2', text: 'A heading' },
 *       { type: 'quote', text: 'A pull quote.', cite: 'Optional source' },
 *       { type: 'image', src: '/images/blog/figure.jpg', alt: '...', caption: 'Optional caption' },
 *       { type: 'list', items: ['One', 'Two'] },
 *     ],
 *     tags: ['optional', 'tags'],
 *   }
 *
 * Put image files in /public/images/blog/ and refer to them as '/images/blog/<file>'.
 */

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  description: string
  cover?: { src: string; alt: string }
  body: BlogBlock[]
  tags?: string[]
}

/** ADD YOUR OWN articles here. */
export const blogPosts: BlogPost[] = []

export const blogsCopy = {
  eyebrow: 'Journal · 01',
  title: 'Blogs',
  lead: 'Stories, thoughts, things I am learning and the reflections that come after.',
  strip: ['Stories', 'Thoughts', 'Learning', 'Reflections'],
  empty: {
    title: 'The first story is still being written.',
    message: 'Articles will be published here, each with a cover image, a date, a category and a page of its own.',
  },
}
