const TAG_PALETTE = [
  '#ff80ab', '#c9a0ff', '#69f0ae', '#ffd740', '#40c4ff',
  '#ff6e40', '#e040fb', '#ffab40', '#18ffff', '#76ff03',
  '#ea80fc', '#ff8a80', '#a7ffeb', '#b388ff', '#82b1ff',
]

function hashTag(tag) {
  let h = 0
  for (let i = 0; i < tag.length; i++) h = ((h << 5) - h) + tag.charCodeAt(i)
  return Math.abs(h)
}

function tagColor(tag) {
  return TAG_PALETTE[hashTag(tag) % TAG_PALETTE.length]
}

function timeAgo(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(ts).toLocaleDateString()
}

export default function EntryCard({ entry, onEdit, onDelete, onTagClick, style }) {
  return (
    <div className="entry-card" style={style}>
      <div className="entry-actions">
        <button className="edit-btn" onClick={() => onEdit(entry)}>&#x270F;</button>
        <button className="delete-btn" onClick={() => onDelete(entry.id)}>&#x2716;</button>
      </div>
      <h3>{entry.title}</h3>
      <div className="entry-time">{timeAgo(entry.createdAt)}</div>
      {entry.description && <p>{entry.description}</p>}
      {entry.tags?.length > 0 && (
        <div className="tags">
          {entry.tags.map((t) => (
            <button
              key={t}
              type="button"
              className="tag"
              onClick={() => onTagClick?.(t)}
              style={{
                borderColor: tagColor(t),
                color: tagColor(t),
                background: tagColor(t) + '18',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
