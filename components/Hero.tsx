import Link from 'next/link'
import ShimmerButton from './ui/ShimmerButton'
import BorderBeam from './ui/BorderBeam'
import Spotlight from './ui/Spotlight'

export function Hero() {
  return (
    <section className="relative">
      <Spotlight className="absolute inset-0" />
      <BorderBeam className="subtle-card hover-raise p-6 sm:p-8 relative">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            I build reliable web apps and automations that save teams time.
          </h1>
          <p className="max-w-2xl" style={{ color: '#4b5563' }}>
            Senior Software Engineer (React + Java). I save costs, optimize performance, and developer workflows.
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton href="/projects">View Projects</ShimmerButton>
            <ShimmerButton href="/automations" className="ghost-btn">View Automations</ShimmerButton>
          </div>
        </div>
      </BorderBeam>
    </section>
  )
}
