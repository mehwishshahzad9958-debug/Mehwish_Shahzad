import Hero from '../components/Hero'
import CategoryCards from '../components/CategoryCards'
import AboutSection from '../components/AboutSection'
import JourneySection from '../components/journey/JourneySection'
import RecentMoments from '../components/RecentMoments'

/** The home page is just the sections stacked in order. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <AboutSection />
      <JourneySection />
      <RecentMoments />
    </>
  )
}
