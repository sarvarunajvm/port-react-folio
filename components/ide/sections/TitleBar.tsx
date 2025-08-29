export default function TitleBar() {
  return (
    <div className="titlebar" role="banner" aria-label="Title Bar">
      <div className="traffic" aria-hidden>
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>
      <div style={{ marginLeft: 8, fontSize: 12 }}>VS Code — Portfolio</div>
    </div>
  )
}

