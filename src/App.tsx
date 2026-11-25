import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { MotionConfig } from 'motion/react'

import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import JournalPage from './pages/JournalPage'
import CategoryPage from './pages/CategoryPage'
import PublicSpeakingPage from './pages/speaking/PublicSpeakingPage'
import CreativityPage from './pages/creativity/CreativityPage'
import NextChapterPage from './pages/next-chapter/NextChapterPage'
import JournalLayout from './pages/journal/JournalLayout'
import BlogsPage from './pages/journal/blogs/BlogsPage'
import BlogPostPage from './pages/journal/blogs/BlogPostPage'
import VlogsPage from './pages/journal/vlogs/VlogsPage'
import GalleryPage from './pages/journal/gallery/GalleryPage'
import TravelJournalPage from './pages/travel/TravelJournalPage'
import TravelEntryPage from './pages/travel/TravelEntryPage'
import TechnicalCareerPage from './pages/technical-career/TechnicalCareerPage'
import TeachingManagementPage from './pages/teaching/TeachingManagementPage'
import TamakPage from './pages/teaching/TamakPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * Route table. Every page is rendered inside <SiteLayout>, which provides the
 * header, footer and scroll handling. `<Outlet />` in the layout is where the
 * matched page appears.
 */
/** Old top-level Travel Journal entry URLs now live inside the Journal. */
function LegacyTravelEntry() {
  const { slug } = useParams()
  return <Navigate to={`/journal/travel/${slug ?? ''}`} replace />
}

export default function App() {
  return (
    // reducedMotion="user": Motion automatically skips movement animations
    // for visitors who ask their device for reduced motion.
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          {/* The Journal is one destination with four sections nested inside it. */}
          <Route path="journal" element={<JournalLayout />}>
            <Route index element={<JournalPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:slug" element={<BlogPostPage />} />
            <Route path="travel" element={<TravelJournalPage />} />
            <Route path="travel/:slug" element={<TravelEntryPage />} />
            <Route path="vlogs" element={<VlogsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>
          {/* Public Speaking has its own page; React Router ranks this above the generic :slug route. */}
          <Route path="public-speaking" element={<PublicSpeakingPage />} />
          <Route path="technical-career" element={<TechnicalCareerPage />} />
          <Route path="teaching-management" element={<TeachingManagementPage />} />
          <Route path="teaching-management/tamak" element={<TamakPage />} />
          <Route path="creativity" element={<CreativityPage />} />
          <Route path="next-chapter" element={<NextChapterPage />} />
          <Route path="travel-journal" element={<Navigate to="/journal/travel" replace />} />
          <Route path="travel-journal/:slug" element={<LegacyTravelEntry />} />
          <Route path=":slug" element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
