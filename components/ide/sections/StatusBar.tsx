export default function StatusBar({ activeFile }: { activeFile: string }) {
  const parts = activeFile ? activeFile.split('.') : []
  const lang = parts[parts.length - 1] || 'text'
  const now = new Date().toLocaleTimeString()
  return (
    <div className="statusbar" role="contentinfo" aria-label="Status Bar">
      <div>
        <span> main</span>
        <span style={{ marginLeft: 12 }}>0 ⓧ 0 ⚠</span>
      </div>
      <div>
        <span>Ln 1, Col 1</span>
        <span style={{ marginLeft: 12 }}>{lang.toUpperCase()}</span>
        <span style={{ marginLeft: 12 }}>UTF-8</span>
        <span style={{ marginLeft: 12 }}>{now}</span>
      </div>
    </div>
  )
}

