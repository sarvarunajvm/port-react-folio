import Link from 'next/link'

export function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6">
      <Link href="/contact" className="rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg hover:opacity-95">
        Hire Me
      </Link>
    </div>
  )
}
