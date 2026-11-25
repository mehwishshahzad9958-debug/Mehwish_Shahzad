/**
 * Everything on the Creativity page lives here.
 *
 * Each discipline has an `entries` array that starts EMPTY on purpose: the page
 * shows a designed empty state until you add something real. To add a piece,
 * copy the example at the bottom of this comment into the right `entries` list.
 *
 *   {
 *     title: 'Sunday watercolour',
 *     date: '2026-03-14',                       // ISO date or free text ('Spring 2026')
 *     description: 'What it is and why I made it.',
 *     images: [
 *       { src: '/images/creativity/sunday-final.jpg', alt: 'Finished painting of ...', caption: 'Finished' },
 *       { src: '/images/creativity/sunday-wip.jpg', alt: 'Early washes ...', caption: 'First layer', process: true },
 *     ],
 *     details: [{ label: 'Medium', value: 'Watercolour' }],   // optional facts
 *     reflection: 'What I learned or how it felt.',            // optional
 *     tags: ['landscape'],                                      // optional
 *     href: 'https://...',                                      // optional link
 *   }
 *
 * Put image files in /public/images/creativity/ and refer to them as '/images/creativity/<file>'.
 * The first image is the cover. Images marked `process: true` appear as "process" shots.
 */

export type DisciplineId = 'painting' | 'crochet' | 'stitching' | 'cooking' | 'handmade' | 'experiments'

export interface CreativeImage {
  src: string
  alt: string
  caption?: string
  /** Mark a work-in-progress or step photo. */
  process?: boolean
  /** Natural pixel size. Optional, but lets the masonry board reserve the right height before the image loads. */
  width?: number
  height?: number
}

/**
 * A file attached to an entry. `url` must be the verified delivery URL of the file. Leave it out until
 * you have one: the card then shows a plain file-type tile instead of an invented picture.
 */
export type CreativeFile =
  | {
      kind: 'pdf'
      /** Shown on the file-type tile and as the viewer title. */
      title?: string
      /** Verified delivery URL of the PDF. */
      url?: string
      /** Optional verified image URL of the first page. For a Cloudinary image/upload PDF URL this is derived automatically. */
      thumbnail?: string
      /** Pixel size of the thumbnail, so the board reserves the right height before it loads. */
      width?: number
      height?: number
      /** Where the file is hosted. Documentation only: never used to build a URL. */
      source?: { provider: string; cloudName?: string; publicId?: string; folder?: string }
    }
  | { kind: 'video'; title?: string; url?: string; /** Poster frame or supplied thumbnail. */ poster?: string; width?: number; height?: number }
  | { kind: 'other'; title?: string; url?: string; /** File type label, e.g. "DOCX". */ label?: string; thumbnail?: string }

export interface CreativeEntry {
  title: string
  date?: string
  /** Optional: a photo or inspiration image can stand on its own and opens as a plain lightbox. */
  description?: string
  images?: CreativeImage[]
  details?: { label: string; value: string }[]
  reflection?: string
  tags?: string[]
  href?: string
  /** Optional filter label for the board. Defaults to the title of the discipline the entry is filed under. */
  category?: string
  /** 'book': clicking the card opens `pages` as an interactive page-turning storybook. */
  view?: 'book'
  /** For `view: 'book'`: the pages of the book, in order. */
  pages?: CreativeImage[]
  /** 'file': clicking the card opens `file.url` directly in a new tab, with no dialog. */
  openAs?: 'file'
  /** Optional short lines shown under the card's title on the board. */
  subtitle?: string
  meta?: string
  /** The actual file behind this entry (PDF, video or other). Its preview is generated from the file itself. */
  file?: CreativeFile
  /** Optional extras for a "story" entry: a card with a subtitle and a dialog written as a short narrative. */
  story?: StoryContent
}

export interface StoryContent {
  subtitle: string
  category: string
  audience: string
  /** A one-line honesty note shown at the top of the story. */
  disclaimer: string
  /** Narrative sections, in order. */
  sections: { heading: string; paragraphs: string[] }[]
  /** Closing line, shown as a pull quote. */
  closing: string
}

export interface Discipline {
  id: DisciplineId
  number: string
  title: string
  /** Short hand-written style note shown beside the title. */
  note: string
  blurb: string
  /** Text for the empty state. */
  empty: { title: string; message: string; prompts: string[] }
  /** ADD YOUR OWN entries here. */
  entries: CreativeEntry[]
}

// ---------------------------------------------------------------- Storybook pages from a PDF

/**
 * Page images of a PDF that Cloudinary hosts as image/upload. Cloudinary renders page N on request
 * (`pg_N`), so no files are converted or uploaded. `pdfUrl` must be the verified delivery URL of the PDF;
 * the page URLs are derived from it. Each page is requested at 1600 px wide with the PDF's own proportions.
 */
function pdfPageImages(pdfUrl: string, count: number, alt: string, size = { width: 1600, height: 900 }): CreativeImage[] {
  const m = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)\.pdf$/i.exec(pdfUrl)
  if (!m) return []
  return Array.from({ length: count }, (_, i) => ({
    src: `${m[1]}pg_${i + 1},w_${size.width}/${m[2]}.jpg`,
    alt: `${alt} ${i + 1} of ${count}`,
    width: size.width,
    height: size.height,
  }))
}

/** "The Enchanted Library – Choose Your Adventure!": the 13-page PDF on Cloudinary (page 14 is rejected, so 13 is verified). */
const LIBRARY_PDF = 'https://res.cloudinary.com/u91ecrbi/image/upload/LIBRARY.pdf'
const LIBRARY_PAGES = 13

export const creativityHero = {
  eyebrow: 'Dimension 02 · Creativity',
  headlineStart: 'Made by hand,',
  headlineEmphasis: 'finished by curiosity.',
  lead: 'Making things with my hands keeps me curious. Colour, thread, texture and flavour: all of it is a way of thinking.',
  annotations: ['colour', 'thread', 'texture', 'flavour'],
}

export const disciplines: Discipline[] = [
  {
    id: 'painting',
    number: '01',
    title: 'Painting',
    note: 'colour first, questions later',
    blurb: 'Washes, layers and happy accidents. Finished paintings, the sketches before them and what each one taught me.',
    empty: {
      title: 'The first canvas is still blank.',
      message: 'Paintings will be pinned up here, with process shots and notes.',
      prompts: ['What I painted', 'The palette I used', 'What went wrong (and right)'],
    },
    entries: [],
  },
  {
    id: 'crochet',
    number: '02',
    title: 'Crochet',
    note: 'one loop at a time',
    blurb: 'Stitch patterns, yarn experiments and finished pieces, with the pattern notes that made them work.',
    empty: {
      title: 'The yarn is waiting.',
      message: 'Finished pieces and works in progress will appear here once they are shared.',
      prompts: ['The yarn and hook', 'The pattern or stitch', 'How long it really took'],
    },
    entries: [
      {
        // A storybook: each image is a page, in order. Add another by copying this entry and listing its images.
        title: 'Crochet top, front and back',
        images: [
          {
            src: 'https://res.cloudinary.com/u91ecrbi/image/upload/v1795213882/nuhzpoykrpjqtxafqre5.png',
            alt: 'Crochet top, front view',
            caption: 'Front',
            width: 1792,
            height: 1344,
          },
          {
            src: 'https://res.cloudinary.com/u91ecrbi/image/upload/v1795214051/evo3uo10nxzltcpyvpii.png',
            alt: 'Crochet top, back view',
            caption: 'Back',
            width: 1792,
            height: 1344,
          },
        ],
      },
    ],
  },
  {
    id: 'stitching',
    number: '03',
    title: 'Stitching & sewing',
    note: 'small stitches, big patience',
    blurb: 'Hand stitching, embroidery and sewing projects: fabric choices, techniques and the satisfying last knot.',
    empty: {
      title: 'The needle is threaded.',
      message: 'Stitching and sewing projects will be tacked up here soon.',
      prompts: ['The fabric and thread', 'The stitch or technique', 'What I would unpick'],
    },
    entries: [],
  },
  {
    id: 'cooking',
    number: '04',
    title: 'Cooking',
    note: 'taste as you go',
    blurb: 'Dishes I cook, the ideas behind them and the small changes that made them mine.',
    empty: {
      title: 'No recipe cards yet.',
      message: 'Dishes and recipe notes will be filed here as they get cooked and written down.',
      prompts: ['The dish', 'What went in', 'What I would change next time'],
    },
    entries: [],
  },
  {
    id: 'handmade',
    number: '05',
    title: 'Handmade projects',
    note: 'made, mended, and made again',
    blurb: 'Everything else made by hand: gifts, home projects and craft ideas that do not fit one box.',
    empty: {
      title: 'The workbench is clear.',
      message: 'Handmade projects will be tagged and displayed here.',
      prompts: ['What I made', 'What it is made from', 'Who or what it is for'],
    },
    entries: [],
  },
  {
    id: 'experiments',
    number: '06',
    title: 'Creative experiments',
    note: 'results may vary',
    blurb: 'Things I am trying for the first time, including the ones that do not work out. Attempt, result, lesson.',
    empty: {
      title: 'The lab notebook is open.',
      message: 'Experiments will be logged here: what I tried, what happened, what I learned.',
      prompts: ['The question', 'The attempt', 'The result'],
    },
    entries: [
      {
        title: 'Learning Through Visual Stories',
        category: 'Learning Through Visual Stories',
        subtitle: 'Making learning more imaginative for young minds.',
        meta: 'Independent creative concept · Classes 4–5',
        // Opens as an interactive storybook. Each page is one page of the PDF below, taken from Cloudinary.
        view: 'book',
        pages: pdfPageImages(LIBRARY_PDF, LIBRARY_PAGES, 'The Enchanted Library, page'),
        // The original PDF: card thumbnail (its first page) and the open-original link. Both URLs were checked in a browser.
        file: {
          kind: 'pdf',
          title: 'LIBRARY',
          url: LIBRARY_PDF,
          thumbnail: 'https://res.cloudinary.com/u91ecrbi/image/upload/LIBRARY.jpg',
          width: 3000,
          height: 1688,
          source: {
            provider: 'cloudinary',
            cloudName: 'u91ecrbi',
            publicId: 'LIBRARY',
            folder: 'Portfolio/Documents',
          },
        },
        description:
          'An exploration of how colours, illustrations, storytelling and artificial intelligence could transform educational concepts into engaging visual learning experiences for young students.',
        tags: ['Education', 'Storytelling', 'Visual learning'],
        story: {
          subtitle: 'Making learning more imaginative for young minds.',
          category: 'Creative Experiment',
          audience: 'Students in Classes 4–5',
          disclaimer:
            'An independent creative concept inspired by my selection experience. It was not a Physics Wallah project and was never built, tested or used by students.',
          sections: [
            {
              heading: 'Where the idea began',
              paragraphs: [
                'This concept began during my selection process for a Research Trainee opportunity at Physics Wallah.',
                'The opportunity introduced me to the possibility of using artificial intelligence to make teaching more engaging and meaningful for students.',
              ],
            },
            {
              heading: 'The audience',
              paragraphs: [
                'I imagined creating learning experiences specifically for students in Classes 4 and 5.',
                'At this stage, curiosity, imagination and visual exploration can play an important role in how children engage with new concepts.',
              ],
            },
            {
              heading: 'The idea',
              paragraphs: [
                'Instead of explaining educational concepts only through conventional text, I wanted to explore transforming them into visual stories.',
                'The concept involved using expressive colours, illustrations and creative storytelling to make educational topics more engaging and easier for young students to explore and understand.',
              ],
            },
            {
              heading: 'The role of AI',
              paragraphs: [
                'I was interested in exploring how artificial intelligence could support the creation of these visual educational experiences and help turn learning concepts into imaginative visual narratives.',
              ],
            },
            {
              heading: 'What happened next',
              paragraphs: [
                'I progressed through the initial selection process for the opportunity. However, due to an unexpected circumstance, the opportunity did not result in employment.',
                'Although it did not become a formal role or completed organisational project, the idea remains an interesting creative direction that reflects my interest in education, imagination and visual communication.',
              ],
            },
          ],
          closing: 'What if a lesson could become a story that children could see, imagine and remember?',
        },
      },
    ],
  },
]

// ---------------------------------------------------------------- Margin notes

export interface MarginNote {
  title: string
  date?: string
  text: string
  /** Which discipline it relates to (optional). */
  discipline?: DisciplineId
}

/** ADD YOUR OWN personal reflections about making things here. */
export const marginNotes: MarginNote[] = []

/** Prompts shown while there are no notes. They are questions, not claims. */
export const marginPrompts = [
  'What does making with my hands do for my thinking?',
  'Which mistake turned into my favourite part?',
  'What am I too afraid to try yet?',
]

export const creativityClosing = {
  statement: 'Not everything has to be useful to be worth making.',
  sub: 'Keep the hands busy and the mind curious.',
}

// ---------------------------------------------------------------- Board (flat gallery)

export interface BoardItem {
  /** Stable id for React keys. */
  id: string
  entry: CreativeEntry
  /** Filter label: the entry's own category, else the discipline it is filed under. */
  category: string
  discipline: DisciplineId
}

/** Every entry from every discipline, in one list. */
export const boardItems: BoardItem[] = disciplines.flatMap((d) =>
  d.entries.map((entry) => ({
    id: `${d.id}-${entry.title.replace(/\W+/g, '-').toLowerCase()}`,
    entry,
    category: entry.category ?? d.title,
    discipline: d.id,
  })),
)

/** Filter labels: only categories that actually contain something, in page order. */
export const boardCategories: string[] = [...new Set(boardItems.map((i) => i.category))]
