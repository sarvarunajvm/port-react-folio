import Link from 'next/link'

export function Bento() {
  const tiles = [
    { href: '/projects', title: 'Projects', desc: "Case studies with impact", span: 'col-span-2' },
    { href: '/automations', title: 'Automations', desc: 'Recipes that save time' },
    { href: '/skills', title: 'Skills', desc: 'Capabilities & tools' },
    { href: '/experience', title: 'Experience', desc: 'Timeline & outcomes' },
    { href: '/contact', title: 'Contact', desc: 'Hire me / email', span: 'col-span-2' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" id="projects">
      {tiles.map((t) => (
        <Link key={t.title} href={t.href} className={`subtle-card hover-raise p-4 ${t.span ?? ''}`}>
          <div className="text-sm font-medium">{t.title}</div>
          <div className="text-xs text-gray-600 mt-1">{t.desc}</div>
        </Link>
      ))}
    </div>
  )
}
