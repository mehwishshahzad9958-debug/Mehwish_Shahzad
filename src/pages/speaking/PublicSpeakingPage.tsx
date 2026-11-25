import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { usePageTitle } from '../../hooks'
import SpeakingHero from './SpeakingHero'
import Shelf from './Shelf'
import Talks from './Talks'
import Communication from './Communication'
import Reflections from './Reflections'
import Closing from './Closing'
import './speaking.css'

/**
 * The dedicated Public Speaking page. It has its own layout and styling
 * (everything is scoped under `.sp`) and takes its content from data/speaking.ts.
 */
export default function PublicSpeakingPage() {
  usePageTitle('Public Speaking')
  return (
    <article className="sp">
      <SpeakingHero />
      <Shelf />
      <Talks />
      <Communication />
      <Reflections />
      <Closing />
    </article>
  )
}
