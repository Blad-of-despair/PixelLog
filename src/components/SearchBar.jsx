export default function SearchBar({ searchQuery, tagFilter, onSearchChange, onTagFilterChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="pixel-input"
        placeholder="search entries..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <input
        type="text"
        className="pixel-input"
        placeholder="filter by tag..."
        value={tagFilter}
        onChange={(e) => onTagFilterChange(e.target.value)}
      />
    </div>
  )
}
