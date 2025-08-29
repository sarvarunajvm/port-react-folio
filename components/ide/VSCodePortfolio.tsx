"use client"
import React, { useMemo, useState } from 'react'
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
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ 'portfolio': true })
  const [openFiles, setOpenFiles] = useState<string[]>(['portfolio/README.md'])
  const [activeFile, setActiveFile] = useState<string>('portfolio/README.md')
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['$ help'])

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
  }
  const closeFile = (path: string) => {
    setOpenFiles(prev => prev.filter(f => f !== path))
    if (activeFile === path) setActiveFile(prev => (openFiles[0] && openFiles[0] !== path ? openFiles[0] : openFiles[1] || ''))
  }
  const toggleFolder = (path: string) => setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }))

  return (
    <div className="ide-root">
      <TitleBar />
      <MenuBar />
      <div className="main">
        <ActivityBar />
        <div className="sidebar">
          <div className="title">Explorer</div>
          <div className="tree">
            <FileExplorer tree={fs} openFolders={openFolders} onToggle={toggleFolder} onOpen={openFile} />
          </div>
        </div>
        <div className="editor">
          <Tabs openFiles={openFiles} activeFile={activeFile} onClose={closeFile} onActivate={setActiveFile} />
          <CodeEditor path={activeFile} node={filesByPath[activeFile]} />
        </div>
      </div>
      <Terminal history={terminalHistory} setHistory={setTerminalHistory} openFile={openFile} />
      <StatusBar activeFile={activeFile} />
    </div>
  )
}

