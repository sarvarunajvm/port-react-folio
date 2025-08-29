"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { profile } from '../data/profile'

type CommandAction =
  | { title: string; href: string }
  | { title: string; action: 'copy-email'; value: string }

const actions: CommandAction[] = [
  { title: 'View Automations', href: '/automations' },
  { title: 'View Projects', href: '/projects' },
  { title: 'Download Resume', href: '/Resume.pdf' },
  { title: 'Copy Email', action: 'copy-email', value: 'sarvaruna@outlook.com' },
  ...(profile.links.calendly ? ([{ title: 'Schedule a Call', href: profile.links.calendly }] as CommandAction[]) : []),
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = actions.filter(a => a.title.toLowerCase().includes(q.toLowerCase()))

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div className="mx-auto mt-24 max-w-lg">
        <div className="subtle-card p-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none"
          />
          <ul className="mt-2 max-h-64 overflow-auto">
            {filtered.map((a) => (
              <li key={a.title} className="rounded-md px-2 py-2 text-sm hover:bg-gray-50">
                {'href' in a ? (
                  <Link href={a.href} onClick={() => setOpen(false)}>{a.title}</Link>
                ) : (
                  <button
                    onClick={() => {
                      if ('action' in a && a.action === 'copy-email') {
                        navigator.clipboard.writeText(a.value)
                        setOpen(false)
                      }
                    }}
                  >{a.title}</button>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-2 text-right text-xs text-gray-500">Press Esc to close</div>
        </div>
      </div>
    </div>
  )
}
