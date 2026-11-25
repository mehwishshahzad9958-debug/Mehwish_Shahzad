import { SparkIcon } from './Icons'
import './EmptyState.css'

/** Shown wherever content hasn't been added yet. */
export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty">
      <SparkIcon size={20} className="empty__icon" />
      <p>{message}</p>
    </div>
  )
}
