import { Files, Search, GitBranch, Bug, Puzzle, AlertCircle } from 'lucide-react'

export default function ActivityBar({ active = 'explorer', onSwitch = () => {} }: { active?: string; onSwitch?: (t: any) => void }) {
  const items = [
    { key: 'explorer', icon: <Files size={20} />, label: 'Explorer' },
    { key: 'search', icon: <Search size={20} />, label: 'Search' },
    { key: 'problems', icon: <AlertCircle size={20} />, label: 'Problems' },
    { key: 'scm', icon: <GitBranch size={20} />, label: 'Source Control' },
    { key: 'debug', icon: <Bug size={20} />, label: 'Run and Debug' },
    { key: 'extensions', icon: <Puzzle size={20} />, label: 'Extensions' },
  ]
  return (
    <aside className="activitybar" aria-label="Activity Bar">
      {items.map((it) => (
        <div key={it.key} className={`icon ${active === it.key ? 'active' : ''}`} title={it.label} onClick={() => onSwitch(it.key)} aria-hidden>
          {it.icon}
        </div>
      ))}
    </aside>
  )
}
