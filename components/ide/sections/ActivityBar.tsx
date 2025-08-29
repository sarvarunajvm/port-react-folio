export default function ActivityBar() {
  const icons = ['📁', '🔍', '', '🐞', '🧩']
  return (
    <aside className="activitybar" aria-label="Activity Bar">
      {icons.map((i, idx) => (
        <div key={idx} className={`icon ${idx === 0 ? 'active' : ''}`} aria-hidden>{i}</div>
      ))}
    </aside>
  )
}

