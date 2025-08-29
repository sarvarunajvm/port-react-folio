import React, { useEffect, useRef, useState } from 'react'

const COMMANDS = ['help','about','skills','projects','experience','education','contact','resume','game','clear']

export default function Terminal({ history, setHistory, openFile }: { history: string[]; setHistory: (h: string[]) => void; openFile: (p: string) => void }) {
  const [input, setInput] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => { ref.current?.focus() }, [])

  function executeCommand(cmd: string) {
    const c = cmd.trim()
    if (!c) return
    const out: string[] = []
    switch (c) {
      case 'help':
        out.push('Available commands: ' + COMMANDS.join(', '))
        break
      case 'about': openFile('portfolio/about.java'); out.push('Opening about.java'); break
      case 'skills': openFile('skills/backend.xml'); out.push('Opening backend.xml'); break
      case 'projects': openFile('projects/port-advancer.java'); out.push('Opening port-advancer.java'); break
      case 'experience': openFile('experience/paypal.java'); out.push('Opening paypal.java'); break
      case 'education': openFile('education/mca.md'); out.push('Opening mca.md'); break
      case 'contact': openFile('portfolio/contact.json'); out.push('Opening contact.json'); break
      case 'resume': window.open('/Resume.pdf', '_blank'); out.push('Downloading resume…'); break
      case 'game': out.push('Launching ascii game... (coming soon)'); break
      case 'clear': setHistory([]); return
      default:
        out.push(`Unknown command: ${c}`)
    }
    setHistory([...history, `$ ${c}`, ...out])
  }

  return (
    <div className="terminal" role="region" aria-label="Terminal">
      <div style={{ whiteSpace: 'pre-wrap', marginBottom: 4 }}>
        {history.map((h, i) => <div key={i}>{h}</div>)}
      </div>
      <div>
        <span style={{ color: '#6A9955' }}>$</span>{' '}
        <input ref={ref} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { executeCommand(input); setInput('') } }} style={{ background: 'transparent', border: 'none', color: '#D4D4D4', outline: 'none', width: '85%' }} aria-label="Terminal input" />
      </div>
    </div>
  )
}

