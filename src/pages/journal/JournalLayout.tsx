import { Outlet } from 'react-router-dom'
import JournalNav from './JournalNav'

/** Wraps every /journal/* page with the shared section switcher. */
export default function JournalLayout() {
  return (
    <>
      <JournalNav />
      <Outlet />
    </>
  )
}
