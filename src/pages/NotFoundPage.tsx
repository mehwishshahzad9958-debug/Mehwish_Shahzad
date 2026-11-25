import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks'
import { ArrowIcon } from '../components/Icons'
import './pages.css'

export default function NotFoundPage() {
  usePageTitle('Page not found')
  return (
    <section className="page-hero" style={{ minHeight: '55vh' }}>
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page wandered off.</h1>
        <p className="page-hero__lead">The page you’re looking for doesn’t exist — but there’s plenty more to explore.</p>
        <Link to="/" className="btn btn--dark">
          Back to home
          <ArrowIcon />
        </Link>
      </div>
    </section>
  )
}
