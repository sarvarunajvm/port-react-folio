"use client"
import React, { useEffect, useMemo, useState } from 'react'
import TitleBar from './sections/TitleBar'
import MenuBar from './sections/MenuBar'
import ActivityBar from './sections/ActivityBar'
import FileExplorer from './sections/FileExplorer'
import Tabs from './sections/Tabs'
import CodeEditor from './sections/CodeEditor'
import Terminal from './sections/Terminal'
import StatusBar from './sections/StatusBar'
import { initialFs } from './data/fs'

export type FileNode = {
  type: 'file' | 'folder'
  name: string
  ext?: string
  children?: FileNode[]
  content?: string
}

export default function VSCodePortfolio() {
  const [fs, setFs] = useState<FileNode[]>(initialFs)
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ portfolio: true, experience: true, projects: true })
  const [openFiles, setOpenFiles] = useState<string[]>(['portfolio/README.md'])
  const [activeFile, setActiveFile] = useState<string>('portfolio/README.md')
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'system'|'input'|'output'|'success'|'warning'|'error'; text: string }[]>([
    { type: 'system', text: "Welcome to Saravanan's Portfolio v1.0.0" },
    { type: 'system', text: 'Type "help" for available commands' },
  ])
  const [activeTab, setActiveTab] = useState<'explorer'|'search'|'problems'|'scm'|'debug'|'extensions'>('explorer')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [problems, setProblems] = useState<{errors:number;warnings:number}>({ errors: 0, warnings: 0 })
  const [problemList, setProblemList] = useState<{severity:'warning'|'error'; message:string; file:string; line:number}[]>([])
  const [highlight, setHighlight] = useState<{file:string; line:number} | null>(null)
  const [cursorPos, setCursorPos] = useState<{line:number;col:number}>({ line: 1, col: 1 })

  const filesByPath = useMemo(() => {
    const map: Record<string, FileNode> = {}
    const walk = (nodes: FileNode[], base = '') => {
      nodes.forEach(n => {
        const p = base ? `${base}/${n.name}` : n.name
        map[p] = n
        if (n.children) walk(n.children, p)
      })
    }
    walk(fs)
    return map
  }, [fs])

  const openFile = (path: string) => {
    if (!openFiles.includes(path)) setOpenFiles(prev => [...prev, path])
    setActiveFile(path)
    // simulate compilation warnings occasionally
    const warn = Math.random() < 0.4 ? Math.floor(Math.random()*3) : 0
    setProblems({ errors: 0, warnings: warn })
    const newProblems = Array.from({ length: warn }).map((_, i) => ({ severity: 'warning' as const, message: `Potential issue ${i+1} in ${path}`, file: path, line: Math.max(1, Math.floor(Math.random()*8)) }))
    setProblemList(newProblems)
  }
  const closeFile = (path: string) => {
    setOpenFiles(prev => prev.filter(f => f !== path))
    if (activeFile === path) setActiveFile(prev => (openFiles[0] && openFiles[0] !== path ? openFiles[0] : openFiles[1] || ''))
  }
  const toggleFolder = (path: string) => setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }))

  // clock update
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // simple search index
  const allFiles = useMemo(() => Object.keys(filesByPath).filter(p => filesByPath[p].type === 'file'), [filesByPath])
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [] as { path: string; match?: string }[]
    const q = searchQuery.toLowerCase()
    const byName = allFiles
      .filter(p => p.toLowerCase().includes(q))
      .map(p => ({ path: p, match: 'filename' }))
    const byContent = allFiles
      .map(p => ({ p, c: (filesByPath[p].content || '').toLowerCase() }))
      .filter(({ c }) => c.includes(q))
      .map(({ p }) => ({ path: p, match: 'content' }))
    const merged = [...byName, ...byContent].reduce((acc: Record<string, { path:string; match?:string }>, cur) => {
      acc[cur.path] = acc[cur.path] ? acc[cur.path] : cur
      return acc
    }, {})
    return Object.values(merged).slice(0, 50)
  }, [allFiles, filesByPath, searchQuery])

  return (
    <div className="ide-root">
      <TitleBar />
      <MenuBar />
      <div className="main">
        <ActivityBar active={activeTab} onSwitch={setActiveTab} />
        <div className="sidebar">
          {activeTab === 'explorer' && (
            <>
              <div className="title">Explorer</div>
              <div className="tree">
                <FileExplorer tree={fs} openFolders={openFolders} onToggle={toggleFolder} onOpen={openFile} />
              </div>
            </>
          )}
          {activeTab === 'search' && (
            <div style={{ padding: '8px' }}>
              <input
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                aria-label="Search"
              />
              <div className="search-results">
                {searchResults.length === 0 && <div className="muted">No results</div>}
                {searchResults.map((r) => (
                  <div key={r.path} className="search-item" onClick={() => openFile(r.path)}>
                    {r.path} <span className="muted">({r.match})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'problems' && (
            <div className="problems">
              <div className="muted" style={{ marginBottom: 6 }}>Problems</div>
              {problemList.length === 0 && <div className="muted">No problems have been detected in the workspace.</div>}
              {problemList.map((p, idx) => (
                <div key={idx} className="problems-item" onClick={() => { openFile(p.file); setHighlight({ file: p.file, line: p.line }) }}>
                  <span className={p.severity === 'warning' ? 'sev-warning' : 'sev-error'}>{p.severity === 'warning' ? '⚠' : '⨯'}</span>
                  <span>{p.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="editor">
          <Tabs openFiles={openFiles} activeFile={activeFile} onClose={closeFile} onActivate={setActiveFile} />
          <CodeEditor path={activeFile} node={filesByPath[activeFile]} onCursor={(pos) => setCursorPos(pos)} highlight={highlight?.file === activeFile ? highlight : null} />
        </div>
      </div>
      <Terminal history={terminalHistory} setHistory={setTerminalHistory} openFile={openFile} />
      <StatusBar activeFile={activeFile} problems={problems} time={currentTime} cursor={cursorPos} />
    </div>
  )
}
