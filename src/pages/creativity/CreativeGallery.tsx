import { useMemo, useState } from 'react'
import { boardCategories, boardItems } from '../../data/creativity'
import FilterBar from './FilterBar'
import Masonry from './Masonry'
import PinCard, { ratioOf } from './PinCard'

/**
 * All creative work on one continuous board. Filtering is instant and in place, so the dialogs
 * opened from a card return the visitor to the same category and scroll position.
 */
export default function CreativeGallery() {
  const [category, setCategory] = useState('All')
  const items = useMemo(
    () => (category === 'All' ? boardItems : boardItems.filter((i) => i.category === category)).map((i) => ({ ...i, ratio: ratioOf(i) })),
    [category],
  )

  return (
    <section className="cg" aria-label="Creative work">
      <div className="container">
        {boardItems.length > 0 && boardCategories.length > 0 && <FilterBar categories={boardCategories} value={category} onChange={setCategory} />}
        <p className="cg-status" role="status" aria-live="polite">
          {boardItems.length > 0 ? `Showing ${items.length} ${items.length === 1 ? 'piece' : 'pieces'}${category === 'All' ? '' : ` in ${category}`}` : ''}
        </p>
        {boardItems.length > 0 ? (
          <Masonry items={items} render={(item) => <PinCard item={item} />} />
        ) : (
          <p className="cg-empty">Nothing has been pinned yet.</p>
        )}
      </div>
    </section>
  )
}
