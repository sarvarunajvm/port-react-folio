import type { FileNode } from '../../ide/VSCodePortfolio'

export default function CodeEditor({ path, node }: { path: string; node?: FileNode }) {
  if (!node) return <div className="code" style={{ padding: 12 }}>Select a file from the Explorer.</div>
  const lines = (node.content || '').split('\n')
  const lang = node.ext || 'txt'
  return (
    <div className="code" role="region" aria-label={`Editor for ${path}`}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i}>
              <td className="gutter">{i + 1}</td>
              <td style={{ padding: '0 12px' }}>
                <CodeLine lang={lang} text={line} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeLine({ lang, text }: { lang: string; text: string }) {
  // super-lightweight highlighting by token hints from prompt
  let html = text
    .replace(/(\/\*.*?\*\/|\/\/.*$)/g, '<span class="tok-comment">$1</span>')
    .replace(/\b(class|public|private|final|return|implements|import|export|const|let|var|new|extends)\b/g, '<span class="tok-keyword">$1</span>')
    .replace(/\"([^\"]*)\"|'([^']*)'/g, '<span class="tok-string">$&</span>')
  if (lang === 'xml' || lang === 'html') {
    html = html
      .replace(/(&lt;|<)\/?([a-zA-Z0-9\-]+)([^>]*)(&gt;|>)/g, (m, lt, tag, attrs, gt) => `${lt}<span class="tok-xmltag">${tag}</span>${attrs}${gt}`)
      .replace(/([a-zA-Z\-:]+)=\"([^\"]*)\"/g, '<span class="tok-xmlattr">$1</span>="<span class="tok-xmlvalue">$2</span>"')
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

