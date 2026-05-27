const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function formatDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function todayKey() {
  return formatDateKey(new Date())
}

export default function CalendarPanel({ entries, selectedDate, viewDate, onSelectDate, onPrevMonth, onNextMonth }) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const activeKey = selectedDate ? formatDateKey(selectedDate) : null
  const today = todayKey()

  const entryMap = {}
  entries.forEach((e) => {
    entryMap[e.date] = (entryMap[e.date] || 0) + 1
  })

  const cells = []

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push(<div key={`prev-${i}`} className="day-cell other-month">{daysInPrev - i}</div>)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const cls = ['day-cell']
    if (key === activeKey) cls.push('selected')
    if (key === today) cls.push('today')
    const dow = new Date(year, month, d).getDay()
    if (dow === 0 || dow === 6) cls.push('weekend')

    const count = entryMap[key] || 0
    if (count > 0) cls.push('has-entry')

    cells.push(
      <div
        key={key}
        className={cls.join(' ')}
        data-date={key}
        onClick={() => onSelectDate(new Date(year, month, d))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); onSelectDate(new Date(year, month, d))
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${MONTHS[month]} ${d}`}
      >
        {d}
        {count > 0 && <span className="entry-count">{count}</span>}
      </div>
    )
  }

  const totalCells = firstDay + daysInMonth
  const remaining = (7 - (totalCells % 7)) % 7
  for (let i = 1; i <= remaining; i++) {
    cells.push(<div key={`next-${i}`} className="day-cell other-month">{i}</div>)
  }

  return (
    <section className="panel calendar-panel">
      <div className="panel-header">
        <button className="pixel-btn" onClick={onPrevMonth}>&#9664;</button>
        <h2>{MONTHS[month]} {year}</h2>
        <button className="pixel-btn" onClick={onNextMonth}>&#9654;</button>
      </div>
      <div className="weekdays">
        {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="days-grid">{cells}</div>
    </section>
  )
}
