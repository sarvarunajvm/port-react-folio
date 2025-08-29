export default function Tabs({ openFiles, activeFile, onClose, onActivate }: { openFiles: string[]; activeFile: string; onClose: (p: string) => void; onActivate: (p: string) => void }) {
  return (
    <div className="tabs" role="tablist" aria-label="Open Files">
      {openFiles.map((p) => (
        <div key={p} className={`tab ${p === activeFile ? 'active' : ''}`} role="tab" aria-selected={p === activeFile} onClick={() => onActivate(p)}>
          <span>{p.split('/').pop()}</span>
          <button onClick={(e) => { e.stopPropagation(); onClose(p) }} aria-label={`Close ${p}`}>×</button>
        </div>
      ))}
    </div>
  )
}

