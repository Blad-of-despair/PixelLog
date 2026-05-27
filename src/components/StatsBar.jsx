function calcStreak(entries) {
  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse()
  if (!dates.length) return 0
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const yesterday = new Date(Date.now() - 86400000)
  const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`
  if (dates[0] !== todayKey && dates[0] !== yesterdayKey) return 0
  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diff = (prev - curr) / 86400000
    if (Math.round(diff) === 1) streak++
    else break
  }
  return streak
}

export default function StatsBar({ entries }) {
  const total = entries.length
  const tags = new Set(entries.flatMap((e) => e.tags))
  const streak = calcStreak(entries)

  return (
    <div className="stats-bar">
      <span className="stat-item">total: <span>{total}</span></span>
      <span className="stat-item">tags: <span>{tags.size}</span></span>
      <span className="stat-item">streak: <span>{streak}</span>d</span>
    </div>
  )
}
