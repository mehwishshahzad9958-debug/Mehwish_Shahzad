import { Link, useParams } from 'react-router-dom'
import '@fontsource/newsreader/300-italic.css'
import '@fontsource/newsreader/400-italic.css'
import { blogPosts, type BlogBlock } from '../../../data/blogs'
import { fmtDate } from '../../../lib/format'
import { usePageTitle } from '../../../hooks'
import NotFoundPage from '../../NotFoundPage'
import { journalPaths } from '../paths'
import { ArrowIcon } from '../../../components/Icons'
import './blogs.css'

function readingMinutes(blocks: BlogBlock[]) {
  const words = blocks
    .map((b) => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : ''))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function Block({ b }: { b: BlogBlock }) {
  switch (b.type) {
    case 'p': return <p>{b.text}</p>
    case 'h2': return <h2>{b.text}</h2>
    case 'quote': return <blockquote><p>{b.text}</p>{b.cite && <footer>{b.cite}</footer>}</blockquote>
    case 'list': return <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>
    case 'image': return (
      <figure><img src={b.src} alt={b.alt} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>
    )
  }
}

function Found({ slug }: { slug: string }) {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  const i = sorted.findIndex((p) => p.slug === slug)
  const post = sorted[i]
  usePageTitle(post.title)
  const newer = sorted[i - 1]
  const older = sorted[i + 1]
  return (
    <article className="bl bl-post">
      <header className="bl-post__head">
        <div className="container bl-post__col">
          <Link to={journalPaths.blogs} className="back-link"><ArrowIcon />All articles</Link>
          <p className="bl-meta">
            <span>{post.category}</span><span aria-hidden="true">·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time><span aria-hidden="true">·</span>
            <span>{readingMinutes(post.body)} min read</span>
          </p>
          <h1>{post.title}</h1>
          <p className="bl-lead">{post.description}</p>
        </div>
        {post.cover && (
          <div className="container bl-post__cover"><img src={post.cover.src} alt={post.cover.alt} /></div>
        )}
      </header>
      <div className="container bl-post__col bl-prose">
        {post.body.map((b, k) => <Block key={k} b={b} />)}
        {post.tags && post.tags.length > 0 && (
          <ul className="bl-tags" aria-label="Tags">{post.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        )}
      </div>
      {(newer || older) && (
        <nav className="container bl-post__col bl-pn" aria-label="More articles">
          {newer ? <Link to={`${journalPaths.blogs}/${newer.slug}`}><small>Newer</small>{newer.title}</Link> : <span />}
          {older ? <Link to={`${journalPaths.blogs}/${older.slug}`} className="bl-pn__older"><small>Older</small>{older.title}</Link> : <span />}
        </nav>
      )}
    </article>
  )
}

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  if (!blogPosts.some((p) => p.slug === slug)) return <NotFoundPage />
  return <Found slug={slug} />
}
