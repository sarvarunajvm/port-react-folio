import Link from 'next/link'
import { Hero } from '../components/Hero'
import { ImpactStrip } from '../components/ImpactStrip'
import { Bento } from '../components/Bento'
import { StickyCTA } from '../components/StickyCTA'

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Hero />
      <div className="mt-8">
        <ImpactStrip />
      </div>
      <div className="mt-10">
        <Bento />
      </div>
      <div className="mt-14 text-center">
        <Link href="/automations" className="text-sm text-gray-600 underline hover:text-gray-900">
          Explore Automations →
        </Link>
      </div>
      <StickyCTA />
    </main>
  )
}
