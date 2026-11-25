/**
 * Everything on the Public Speaking page lives here.
 *
 * Nothing in the arrays marked "ADD YOUR OWN" is invented: they start empty and
 * the page shows a designed empty state. Add an object and it appears on the
 * page automatically, no other file needs to change.
 *
 * Images: put files in /public/images/speaking/ and reference them as
 * '/images/speaking/my-photo.jpg'.
 */

// ---------------------------------------------------------------- Hero

export const speakingHero = {
  eyebrow: 'Dimension 03 · Public Speaking',
  // The last word is set apart and animated, so keep it as its own field.
  headlineStart: 'Ideas are meant to be',
  headlineEmphasis: 'shared.',
  lead: 'A space for the ideas I present, the knowledge I share, and the conversations that help me grow.',
  /** Words that cycle in the hand-written line under the headline. */
  verbs: ['explain', 'simplify', 'question', 'listen', 'share'],
  themes: ['Speaking', 'Presentations', 'Ideas', 'Communication', 'Knowledge sharing'],
}

// ---------------------------------------------------- Presentations & knowledge sharing

export type ShelfKind = 'deck' | 'explainer' | 'workshop' | 'material' | 'topic'

export interface ShelfItem {
  kind: ShelfKind
  title: string
  description: string
  /** Optional cover image, e.g. '/images/speaking/deck-cover.jpg'. */
  image?: string
  imageAlt?: string
  /** Link to the deck, file, article or recording. */
  href?: string
  /** Label for the link, e.g. 'View slides' or 'Download PDF'. */
  linkLabel?: string
  /** Optional year or date text, e.g. '2026'. */
  date?: string
  tags?: string[]
}

export const shelves: { kind: ShelfKind; label: string; blurb: string; emptyMessage: string }[] = [
  {
    kind: 'deck',
    label: 'Presentation decks',
    blurb: 'Slides I have built to present an idea, with a link to view or download them.',
    emptyMessage: 'No decks have been added yet. Slides will be shared here.',
  },
  {
    kind: 'explainer',
    label: 'Educational explainers',
    blurb: 'Short, visual explanations that turn a tricky topic into something easy to follow.',
    emptyMessage: 'Explainers are on the way.',
  },
  {
    kind: 'workshop',
    label: 'Workshops',
    blurb: 'Hands-on sessions, with the activity, the outline and what people took away.',
    emptyMessage: 'Workshops will appear here when there is something real to show.',
  },
  {
    kind: 'material',
    label: 'Knowledge-sharing material',
    blurb: 'Notes, cheat-sheets and guides made so that others can learn faster.',
    emptyMessage: 'Shareable notes and guides are coming soon.',
  },
  {
    kind: 'topic',
    label: 'Topics presented',
    blurb: 'The subjects I have spoken or presented about.',
    emptyMessage: 'The list of topics will grow here.',
  },
]

/** ADD YOUR OWN presentation and knowledge-sharing items here. */
export const shelfItems: ShelfItem[] = []

// ---------------------------------------------------- Talks & speaking sessions

export interface Talk {
  /** Session or event title. */
  title: string
  topic: string
  /** ISO date ('2026-03-14') is best, free text also works ('Spring 2026'). */
  date: string
  /** Event or organisation. */
  event: string
  description: string
  /** A photograph from the session. */
  image?: string
  imageAlt?: string
  /** A recording (YouTube, Vimeo, etc.). */
  recordingUrl?: string
  /** Slides or other presentation material. */
  presentationUrl?: string
}

/** ADD YOUR OWN talks here. Only add sessions you have actually delivered. */
export const talks: Talk[] = []

/** What each entry will show once added (displayed beside the empty state). */
export const talkFields = [
  'Session or event title',
  'Topic',
  'Date',
  'Event or organisation',
  'Short description',
  'Photograph or recording',
  'Link to the presentation',
]

// ---------------------------------------------------- Communication & ideas

/** Draft wording: written as intentions, not achievements. Edit freely. */
export const communicationPrinciples = [
  {
    number: '01',
    title: 'Start with the question',
    text: 'Before explaining anything, I try to find the question the idea answers. People remember answers when they first feel the question.',
  },
  {
    number: '02',
    title: 'Make it concrete',
    text: 'An example, a sketch or a small story usually does more than a definition. I look for the picture before the paragraph.',
  },
  {
    number: '03',
    title: 'Build it in layers',
    text: 'Big idea first, detail second. Anyone should be able to stop at any layer and still walk away with something true.',
  },
  {
    number: '04',
    title: 'Check it lands',
    text: 'Explaining is a conversation. I ask, watch, and adjust, because clear to me is not the same as clear to you.',
  },
]

/** Subjects from the areas already on this portfolio. Edit freely. */
export const topicsToExplain = [
  'Agile & project delivery',
  'Software engineering',
  'Data & analytics',
  'Research thinking',
  'Learning how to learn',
  'Creative making',
]

export const knowledgeInterests = [
  'Visual explanations',
  'Storytelling with data',
  'Plain-language writing',
  'Teaching by doing',
  'Facilitation',
  'Slide design',
]

export interface Experiment {
  title: string
  description: string
  status?: string
  href?: string
}

/** ADD YOUR OWN communication experiments here (e.g. "Explaining X in 60 seconds"). */
export const experiments: Experiment[] = []

// ---------------------------------------------------- Reflections

export interface Reflection {
  title: string
  /** ISO date or free text. */
  date: string
  /** One or two sentences shown on the card. */
  summary: string
  /** The full text, one string per paragraph. Shown when the card is opened. */
  body?: string[]
  tags?: string[]
}

/** ADD YOUR OWN reflections here. */
export const reflections: Reflection[] = []

/** Prompts shown while there are no reflections. They are questions, not claims. */
export const reflectionPrompts = [
  'What did I wish I had said differently?',
  'What made an explanation finally click?',
  'What does nervousness teach me?',
  'Which question from an audience changed my mind?',
]

// ---------------------------------------------------- Closing

export const speakingClosing = {
  statement: 'If you can’t explain it simply, keep learning, then say it out loud.',
  sub: 'Speaking is how I find out what I really understand.',
}
