import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { travelEntries } from '../../data/travel'
import { usePageTitle } from '../../hooks'
import TravelHero from './TravelHero'
import Timeline from './Timeline'
import { Pocket, Sketchbook, Things } from './Collections'
import TravelClosing from './TravelClosing'
import './travel.css'

/**
 * The Travel Journal landing page: a timeline of trips plus collections gathered
 * from every entry. Content comes from data/travel.ts; styling is scoped under `.tj`.
 */
export default function TravelJournalPage() {
  usePageTitle('Travel Journal')
  return (
    <article className="tj">
      <TravelHero />
      <Timeline entries={travelEntries} />
      <Things entries={travelEntries} />
      <Pocket entries={travelEntries} />
      <Sketchbook entries={travelEntries} />
      <TravelClosing />
    </article>
  )
}
