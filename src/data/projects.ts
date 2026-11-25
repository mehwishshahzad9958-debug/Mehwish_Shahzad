/**
 * Projects shown in Technical & Career → Projects.
 * To add a project: push one more object into `projects` (and drop its screenshot into
 * public/images/projects/). Everything below was checked against the live site and the
 * public GitHub repository. Leave `repoUrl` undefined when there is no public repository.
 */
export interface Project {
  id: string
  title: string
  /** Short label shown above the title. */
  category: string
  /** One or two sentences describing what the site is. */
  description: string
  /** What I did: only things visible in the repository or on the live site. */
  contribution: string[]
  /** Technologies, from package.json and the README. */
  stack: string[]
  liveUrl: string
  repoUrl?: string
  /** Screenshot of the live site. Path is relative to /public. */
  image: string
  imageAlt: string
}

export const githubProfileUrl = 'https://github.com/mehwishshahzad9958-debug'

export const projects: Project[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Personal portfolio website',
    description:
      'My professional portfolio: a single-page site covering my background, skills, experience, featured work and research, with a light and dark theme.',
    contribution: [
      'Designed and built the site as a React and TypeScript single-page app.',
      'Organised the content into About, Skills, Experience, Featured Work, Research and Contact sections.',
      'Added a light and dark theme toggle and a responsive layout.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Motion'],
    liveUrl: 'https://mehwishshahzad.netlify.app/',
    repoUrl: 'https://github.com/mehwishshahzad9958-debug/Mehwish_Shahzad_',
    image: '/images/projects/personal-portfolio.webp',
    imageAlt: 'Home page of the personal portfolio: a "Project Lead" introduction with a portrait and key figures on a dark background.',
  },
  {
    id: 'rasam-spices',
    title: 'RASAM Spices',
    category: 'Brand website · Product catalogue',
    description:
      'Website for an Indian spice brand: a product catalogue with individual product pages, the brand story, an interactive dish platter for blended masalas, and a business enquiry form for retailers and distributors.',
    contribution: [
      'Developed the website in the project repository with Next.js, React and TypeScript.',
      'Built the catalogue experience: featured-product carousel, category browsing and product pages.',
      'Built the interactive blended-masala dish section and the business enquiry page.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'MariaDB', 'Supabase'],
    liveUrl: 'https://rasam-spices.vercel.app/',
    repoUrl: 'https://github.com/mehwishshahzad9958-debug/Product-catalogue',
    image: '/images/projects/rasam-spices.webp',
    imageAlt: 'Home page of the RASAM Spices website: a dark hero with the brand logo, the tagline and a display of spice pouches and boxes.',
  },
  {
    id: 'elise-marlowe',
    title: 'Élise Marlowe',
    category: 'Fashion portfolio website',
    description:
      'An editorial portfolio site for a women’s fashion stylist and label, pairing traditional Indian occasion wear with everyday pieces, plus a client registration page.',
    contribution: [
      'Independently designed and developed the site end to end.',
      'Built a responsive editorial layout with a filterable lookbook whose filters can be shared through the URL.',
      'Built the registration page with browser and server-side validation, saving submissions to a Supabase PostgreSQL table with insert-only access.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    liveUrl: 'https://elisemarlowe.vercel.app/',
    repoUrl: 'https://github.com/mehwishshahzad9958-debug/-lise-Marlowe',
    image: '/images/projects/elise-marlowe.webp',
    imageAlt: 'Home page of the Élise Marlowe site: a serif headline beside a model in a yellow tracksuit inside an arched frame.',
  },
]
