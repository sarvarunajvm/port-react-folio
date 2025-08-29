export default function StatusBar({ activeFile, problems, time, cursor }: { activeFile: string; problems?: {errors:number;warnings:number}; time?: Date; cursor?: {line:number;col:number} }) {
  const parts = activeFile ? activeFile.split('.') : []
  const lang = parts[parts.length - 1] || 'text'
  const now = (time || new Date()).toLocaleTimeString()
  return (
    <div className="statusbar" role="contentinfo" aria-label="Status Bar">
      <div>
        <span> main</span>
        <span style={{ marginLeft: 12 }}>{problems?.errors ?? 0} ⓧ {(problems?.warnings ?? 0)} ⚠</span>
      </div>
      <div>
        <span>Ln {cursor?.line ?? 1}, Col {cursor?.col ?? 1}</span>
        <span style={{ marginLeft: 12 }}>{lang.toUpperCase()}</span>
        <span style={{ marginLeft: 12 }}>UTF-8</span>
        <span style={{ marginLeft: 12 }}>{now}</span>
      </div>
    </div>
  )
}
