export type MotifId = 'code' | 'brush' | 'wave' | 'compass'

export interface Entry {
  title: string
  description?: string
  meta?: string
  href?: string
}

export interface CategorySection {
  title: string
  description: string
  /** Add real entries here. While empty, a friendly empty state is shown. */
  items: Entry[]
  emptyMessage: string
}

export interface Category {
  slug: string
  number: string
  title: string
  cardDescription: string
  image: string
  imageAlt: string
  /** Visual personality of the category page. */
  theme: { base: string; soft: string; accent: string; onBase: string }
  motif: MotifId
  eyebrow: string
  intro: string
  focusAreas: string[]
  sections: CategorySection[]
  /** Show a button to my LinkedIn profile on this page. */
  showLinkedIn?: boolean
}

export const categories: Category[] = [
  {
    slug: 'technical-career',
    number: '01',
    title: 'Technical & Career',
    cardDescription: 'Engineering, research, projects, analytics and professional journey.',
    image: '/images/technical-career.jpg',
    imageAlt: 'Laptop showing code beside a coffee mug',
    theme: { base: '#3A2318', soft: '#EBDDCB', accent: '#E59A6C', onBase: '#FFFFFF' },
    motif: 'code',
    showLinkedIn: true,
    eyebrow: 'Dimension 01',
    intro:
      'Where I turn problems into working solutions — through project management, engineering, research and analysis.',
    focusAreas: [
      'Project management & Agile delivery',
      'Software engineering & development',
      'Research & problem-solving',
      'Business analysis',
      'Data analytics & technical projects',
      'Professional experience & career journey',
    ],
    sections: [
      {
        title: 'Projects',
        description: 'Technical and delivery projects, with the problem, the approach and what I learned.',
        items: [],
        emptyMessage: 'Projects will be added here soon.',
      },
      {
        title: 'Research & analytics',
        description: 'Research notes, analyses and the thinking behind them.',
        items: [],
        emptyMessage: 'Research and analytics write-ups are coming soon.',
      },
      {
        title: 'Career journey',
        description: 'The path so far — roles, responsibilities and growth.',
        items: [],
        emptyMessage: 'My career timeline is being put together. Meanwhile, my LinkedIn profile has the details.',
      },
    ],
  },
  {
    slug: 'creativity',
    number: '02',
    title: 'Creativity',
    cardDescription: 'Painting, crochet, stitching, cooking and more.',
    image: '/images/creativity.jpg',
    imageAlt: 'Paintbrushes, a watercolor palette and red yarn',
    theme: { base: '#A8552F', soft: '#F7D9C5', accent: '#FBE5D5', onBase: '#FFFFFF' },
    motif: 'brush',
    eyebrow: 'Dimension 02',
    intro:
      'Making things with my hands keeps me curious. Colour, thread, texture and flavour — all of it is a way of thinking.',
    focusAreas: [
      'Painting',
      'Crochet',
      'Stitching & sewing',
      'Cooking',
      'Handmade projects',
      'Creative experiments',
    ],
    sections: [
      {
        title: 'Gallery',
        description: 'Paintings, crochet, stitching, dishes and handmade pieces.',
        items: [],
        emptyMessage: 'The gallery is empty for now — pieces will appear here as they are shared.',
      },
      {
        title: 'Creative experiments',
        description: 'Things I’m trying for the first time, including the ones that don’t work out.',
        items: [],
        emptyMessage: 'Experiments are on the way.',
      },
    ],
  },
  {
    slug: 'public-speaking',
    number: '03',
    title: 'Public Speaking',
    cardDescription: 'Presentations, communication, talks and sharing ideas.',
    image: '/images/public-speaking.jpg',
    imageAlt: 'Microphone on a stand facing a blurred audience',
    theme: { base: '#2F3A2C', soft: '#DDE3D4', accent: '#C9D8B6', onBase: '#FFFFFF' },
    motif: 'wave',
    eyebrow: 'Dimension 03',
    intro: 'Ideas get better when they are shared. This is where I keep my talks, presentations and lessons about communicating.',
    focusAreas: [
      'Presentations',
      'Communication',
      'Public speaking',
      'Talks & speaking experiences',
      'Ideas & lessons shared with others',
    ],
    sections: [
      {
        title: 'Talks & presentations',
        description: 'Where I’ve spoken, what I talked about and slides or recordings when available.',
        items: [],
        emptyMessage: 'Talks and presentations will be listed here soon.',
      },
      {
        title: 'Ideas & lessons',
        description: 'What I’ve learned about communicating, and ideas worth passing on.',
        items: [],
        emptyMessage: 'Lessons and reflections are coming soon.',
      },
    ],
  },
  {
    slug: 'exploration-discoveries',
    number: '04',
    title: 'Exploration & Discoveries',
    cardDescription: 'Learning journeys, experiments, curiosity and new interests.',
    image: '/images/exploration-discoveries.jpg',
    imageAlt: 'Compass, map, notebook and camera',
    theme: { base: '#5B4146', soft: '#EAD9D8', accent: '#E8B7A8', onBase: '#FFFFFF' },
    motif: 'compass',
    eyebrow: 'Dimension 04',
    intro: 'Curiosity doesn’t stay in one lane. Here I follow new subjects wherever they lead and write down what I find.',
    focusAreas: [
      'New subjects I explore',
      'Learning journeys',
      'Experiments',
      'Observations',
      'Personal discoveries',
      'Interests that evolve over time',
    ],
    sections: [
      {
        title: 'Learning journeys',
        description: 'Subjects I’m learning, and how the learning is going.',
        items: [],
        emptyMessage: 'Learning journeys will be recorded here.',
      },
      {
        title: 'Experiments & observations',
        description: 'Small experiments and things I’ve noticed along the way.',
        items: [],
        emptyMessage: 'Nothing logged yet — check back soon.',
      },
      {
        title: 'Discoveries',
        description: 'Personal finds, big or small.',
        items: [],
        emptyMessage: 'Discoveries are coming soon.',
      },
    ],
  },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
