import { collage } from '../data/about'
import './Collage.css'

/** A scrapbook of overlapping tilted photos. Photos come from data/about.ts. */
export default function Collage() {
  return (
    <ul className="collage" aria-label="A few photographs from my world">
      {collage.map((p, i) => (
        <li key={p.image} className={`collage__item collage__item--${i + 1}`}>
          <figure>
            <img src={p.image} alt={p.alt} loading="lazy" />
          </figure>
        </li>
      ))}
    </ul>
  )
}
