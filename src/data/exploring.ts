export interface ExploringItem {
  label: string
  /** Matches a category slug — used to colour the dot. */
  category: string
}

/** What I'm currently exploring. Edit freely. */
export const exploringNow: ExploringItem[] = [
  { label: 'New techniques in AI', category: 'technical-career' },
  { label: 'A cozy crochet project', category: 'creativity' },
  { label: 'Ideas for my next talk', category: 'public-speaking' },
]
