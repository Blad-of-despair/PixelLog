import SearchBar from './SearchBar.jsx'
import EntryCard from './EntryCard.jsx'

function formatDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function TimelinePanel({
  entries, selectedDate, searchQuery, tagFilter,
  onSearchChange, onTagFilterChange, onAddEntry, onEditEntry, onDeleteEntry
}) {
  if (!selectedDate) {
    return (
      <section className="panel timeline-panel">
        <div className="panel-header">
          <h2>Select a day</h2>
          <button className="pixel-btn pixel-btn-sm" onClick={onAddEntry}>+ New Entry</button>
        </div>
        <p className="empty-state">
          <span className="pixel-art">&#x2B50; &#x2728; &#x1F338;</span>
          Pick a date on the calendar to start logging your day!
        </p>
      </section>
    )
  }

  const key = formatDateKey(selectedDate)
  let dayEntries = entries.filter((e) => e.date === key)

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    dayEntries = dayEntries.filter((e) =>
      e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    )
  }
  if (tagFilter) {
    const t = tagFilter.toLowerCase()
    dayEntries = dayEntries.filter((e) => e.tags.some((tag) => tag.toLowerCase().includes(t)))
  }
  dayEntries.sort((a, b) => b.createdAt - a.createdAt)

  const isEmpty = dayEntries.length === 0
  const hasFilters = searchQuery || tagFilter

  return (
    <section className="panel timeline-panel">
      <div className="panel-header">
        <h2>&#x1F4C5; {key}</h2>
        <button className="pixel-btn pixel-btn-sm" onClick={onAddEntry}>+ New Entry</button>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        tagFilter={tagFilter}
        onSearchChange={onSearchChange}
        onTagFilterChange={onTagFilterChange}
      />

      <div className="entries">
        {isEmpty ? (
          <p className="empty-state">
            <span className="pixel-art">&#x1F4DD; &#x2728;</span>
            {hasFilters ? 'No entries match your filters.' : 'Nothing logged this day yet.'}
            <br />Click "+ New Entry" to add one!
          </p>
        ) : (
          dayEntries.map((e, i) => (
            <EntryCard
              key={e.id}
              entry={e}
              onEdit={onEditEntry}
              onDelete={onDeleteEntry}
              onTagClick={onTagFilterChange}
              style={{ animationDelay: `${i * 0.07}s` }}
            />
          ))
        )}
      </div>
    </section>
  )
}
