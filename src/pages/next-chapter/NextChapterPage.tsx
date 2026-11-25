import { usePageTitle } from '../../hooks'
import NextChapterBook from './NextChapterBook'
import './next-chapter.css'

/** The Next Chapter page: an open book with an invitation, and a personal message on the next page. */
export default function NextChapterPage() {
  usePageTitle('Next Chapter')
  return <NextChapterBook />
}
