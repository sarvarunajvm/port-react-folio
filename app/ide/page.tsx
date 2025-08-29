import './styles.css'
import VSCodePortfolio from '../../components/ide/VSCodePortfolio'

export const metadata = {
  title: 'VS Code IDE – Interactive Portfolio',
  description: 'An interactive, VS Code-themed portfolio experience.'
}

export default function IDEPage() {
  return (
    <main className="ide-root">
      <VSCodePortfolio />
    </main>
  )
}

