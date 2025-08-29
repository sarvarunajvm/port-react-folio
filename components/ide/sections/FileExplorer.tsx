import type { FileNode } from '../../ide/VSCodePortfolio'

export default function FileExplorer({ tree, openFolders, onToggle, onOpen }: { tree: FileNode[]; openFolders: Record<string, boolean>; onToggle: (p: string) => void; onOpen: (p: string) => void }) {
  const renderNode = (node: FileNode, base = '') => {
    const path = base ? `${base}/${node.name}` : node.name
    if (node.type === 'folder') {
      const open = !!openFolders[path]
      return (
        <div key={path}>
          <div style={{ padding: '2px 8px', cursor: 'pointer' }} onClick={() => onToggle(path)}>📂 {node.name}</div>
          {open && node.children?.map((c) => renderNode(c, path))}
        </div>
      )
    }
    return (
      <div key={path} style={{ padding: '2px 24px', cursor: 'pointer' }} onClick={() => onOpen(path)}>
        📄 {node.name}
      </div>
    )
  }
  return <div>{tree.map((n) => renderNode(n))}</div>
}

