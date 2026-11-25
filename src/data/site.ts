/**
 * Core facts about the site owner.
 * Everything here is real, supplied information. Anything not supplied yet
 * is left `undefined` on purpose so the UI simply hides it — nothing is invented.
 */

export type SocialId = 'linkedin' | 'github' | 'instagram' | 'email'

export interface SocialLink {
  id: SocialId
  label: string
  /** Leave undefined until the real link is known. Items without a url are not shown. */
  url?: string
}

const socials: SocialLink[] = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mehwishshahzadprofile/',
    },
    // TODO: add the real URLs / address below when available. They stay hidden until then.
    { id: 'github', label: 'GitHub', url: undefined },
    { id: 'instagram', label: 'Instagram', url: undefined },
    { id: 'email', label: 'Email', url: undefined }, // e.g. 'mailto:name@example.com'
  ]

export const site = {
  name: 'Mehwish Shahzad',
  firstName: 'Mehwish',
  location: 'Delhi, India',
  identityLine: 'Engineer · Creator · Speaker · Explorer',
  tagline: 'Curiosity never stops…',
  /** Words used in the hero eyebrow and the animated hero (in this order). */
  dimensions: ['Engineer', 'Creative', 'Speaker', 'Explorer'] as const,
  heroIntro:
    'I’m Mehwish — an engineer, creator, speaker and lifelong learner. This space is where I share my work, creativity, ideas, and the little things that inspire me.',
  /** Portrait shown inside the hero circle (set to undefined to fall back to the animated drawing only). */
  heroPortrait: '/images/hero-portrait.webp' as string | undefined,
  professionalIdentity: [
    'Project Management',
    'Technical Engineering',
    'Research',
    'Software Development',
    'Business Analysis',
    'Product Thinking',
  ],
  socials,
}

export const availableSocials = site.socials.filter(
  (s): s is SocialLink & { url: string } => Boolean(s.url),
)
