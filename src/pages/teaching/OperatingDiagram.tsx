import { operatingModel, perspectives } from '../../data/tamak'

/**
 * How the centre operated: who it worked with (top), the centre itself (middle),
 * and the four areas I ran (bottom). Built from the data file, so it never says more than the lists do.
 */
export default function OperatingDiagram() {
  return (
    <figure className="tk-model" aria-label="How TAMAK operated">
      <div className="tk-model__layer">
        <p className="tk-model__label">Who it worked with</p>
        <ul className="tk-model__people">
          {operatingModel.people.map((p) => (
            <li key={p.label} className={`is-${p.feeds}`}>
              <strong>{p.label}</strong>
              <span>{p.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="tk-model__hub">
        <span>Founded and run by me</span>
        <strong>TAMAK Coaching Centre</strong>
      </div>
      <div className="tk-model__layer">
        <p className="tk-model__label">What I ran</p>
        <ul className="tk-model__areas">
          {perspectives.map((p) => (
            <li key={p.id} className={`is-${p.id}`}>
              <b>{p.letter}</b>
              {p.title}
            </li>
          ))}
        </ul>
      </div>
      <figcaption>
        Education delivery (A) and the business behind it (B, C, D), handled by one person.
      </figcaption>
    </figure>
  )
}
