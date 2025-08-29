import React, { useEffect, useRef, useState } from 'react'

type EntryType = 'system' | 'input' | 'output' | 'success' | 'warning' | 'error'
type TerminalEntry = { type: EntryType; text: string }

const COMMANDS = ['help','about','skills','projects','experience','education','contact','resume','game','clear']

export default function Terminal({ history, setHistory, openFile }: { history: TerminalEntry[]; setHistory: React.Dispatch<React.SetStateAction<TerminalEntry[]>>; openFile: (p: string) => void }) {
  const [input, setInput] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => { ref.current?.focus() }, [])

  function executeCommand(cmd: string) {
    const c = cmd.trim()
    if (!c) return
    const out: TerminalEntry[] = []
    switch (c) {
      case 'help':
        out.push({ type: 'output', text: 'Available commands: ' + COMMANDS.join(', ') })
        break
      case 'about': openFile('portfolio/about.java'); out.push({ type: 'success', text: 'Opening about.java' }); break
      case 'skills': openFile('skills/backend.xml'); out.push({ type: 'success', text: 'Opening backend.xml' }); break
      case 'projects': openFile('projects/port-advancer.java'); out.push({ type: 'success', text: 'Opening port-advancer.java' }); break
      case 'experience': openFile('experience/paypal.java'); out.push({ type: 'success', text: 'Opening paypal.java' }); break
      case 'education': openFile('education/mca.md'); out.push({ type: 'success', text: 'Opening mca.md' }); break
      case 'contact': openFile('portfolio/contact.json'); out.push({ type: 'success', text: 'Opening contact.json' }); break
      case 'resume': window.open('/Resume.pdf', '_blank'); out.push({ type: 'success', text: 'Downloading resume…' }); break
      case 'game': out.push({ type: 'warning', text: 'Launching ascii game... (coming soon)' }); break
      case 'clear': setHistory([{ type: 'system', text: 'Terminal cleared' }, { type: 'system', text: 'Type "help" for available commands' }]); return
      default:
        out.push({ type: 'error', text: `Unknown command: ${c}` })
    }
    setHistory([...history, { type: 'input', text: `$ ${c}` }, ...out])
  }

  return (
    <div className="terminal" role="region" aria-label="Terminal">
      <div style={{ whiteSpace: 'pre-wrap', marginBottom: 4 }}>
        {history.map((h, i) => (
          <div key={i} style={{ color: colorFor(h.type) }}>{h.text}</div>
        ))}
      </div>
      <div>
        <span style={{ color: '#6A9955' }}>$</span>{' '}
        <input ref={ref} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { executeCommand(input); setInput('') } }} style={{ background: 'transparent', border: 'none', color: '#D4D4D4', outline: 'none', width: '85%' }} aria-label="Terminal input" />
      </div>
    </div>
  )
}

function colorFor(t: EntryType) {
  switch (t) {
    case 'success': return '#a7f3d0'
    case 'warning': return '#fde68a'
    case 'error': return '#fecaca'
    case 'system': return '#93c5fd'
    default: return '#D4D4D4'
  }
}
