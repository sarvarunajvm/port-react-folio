const MENUS = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help']
export default function MenuBar() {
  return (
    <nav className="menubar" aria-label="Menu Bar">
      {MENUS.map((m) => (
        <span key={m} className="item" role="menuitem" tabIndex={0}>{m}</span>
      ))}
    </nav>
  )
}

