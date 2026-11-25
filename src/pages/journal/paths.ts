/** Every Journal URL in one place, so links never drift out of sync with the route table in App.tsx. */
export const journalPaths = {
  root: '/journal',
  blogs: '/journal/blogs',
  travel: '/journal/travel',
  vlogs: '/journal/vlogs',
  gallery: '/journal/gallery',
} as const
