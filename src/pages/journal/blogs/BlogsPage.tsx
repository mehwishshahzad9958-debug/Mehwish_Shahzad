import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { blogPosts, blogsCopy, type BlogPost } from '../../../data/blogs'
import { fmtDate } from '../../../lib/format'
import { usePageTitle } from '../../../hooks'
import { journalPaths } from '../paths'
import { ArrowIcon } from '../../../components/Icons'
import './blogs.css'

function sorted(posts: BlogPost[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

function Card({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`bl-card${featured ? ' bl-card--featured' : ''}`}>
      <Link to={`${journalPaths.blogs}/${post.slug}`} className="bl-card__link">
        <div className="bl-card__media">
          {post.cover ? (
            <img src={post.cover.src} alt={post.cover.alt} loading={featured ? 'eager' : 'lazy'} />
          ) : (
            <span className="bl-card__placeholder" aria-hidden="true">{post.title.charAt(0)}</span>
          )}
        </div>
        <div className="bl-card__body">
          <p className="bl-meta">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
          </p>
          <h3>{post.title}</h3>
          <p className="bl-card__desc">{post.description}</p>
          <span className="bl-card__more">Read article <ArrowIcon /></span>
        </div>
      </Link>
    </article>
  )
}

export default function BlogsPage() {
  usePageTitle('Blogs')
  const [cat, setCat] = useState('All')
  const posts = useMemo(() => sorted(blogPosts), [])
  const cats = useMemo(() => ['All', ...Array.from(new Set(posts.map((p) => p.category)))], [posts])
  const shown = cat === 'All' ? posts : posts.filter((p) => p.category === cat)
  const [first, ...rest] = shown

  return (
    <article className="bl">
      <header className="bl-hero">
        <div className="container">
          <Link to={journalPaths.root} className="back-link"><ArrowIcon />The Journal</Link>
          <p className="bl-eyebrow">{blogsCopy.eyebrow}</p>
          <h1>{blogsCopy.title}</h1>
          <p className="bl-lead">{blogsCopy.lead}</p>
          <ul className="bl-strip" aria-label="What you will find here">
            {blogsCopy.strip.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </header>

      <section className="bl-list" aria-label="Articles">
        <div className="container">
          {posts.length === 0 ? (
            <div className="bl-empty">
              <div className="bl-empty__sheet" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
              <div>
                <h2>{blogsCopy.empty.title}</h2>
                <p>{blogsCopy.empty.message}</p>
              </div>
            </div>
          ) : (
            <>
              {cats.length > 2 && (
                <div className="bl-filter" role="group" aria-label="Filter by category">
                  {cats.map((c) => (
                    <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
                  ))}
                </div>
              )}
              {first && <Card post={first} featured />}
              {rest.length > 0 && (
                <div className="bl-grid">{rest.map((p) => <Card key={p.slug} post={p} />)}</div>
              )}
            </>
          )}
        </div>
      </section>
    </article>
  )
}
