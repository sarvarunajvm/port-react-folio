import Link from 'next/link'
import { projects } from '../../data/projects'

export const metadata = { title: 'Projects – Saravanan Kalimuthu' }

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {projects.map((p) => (
          <article key={p.slug} className="subtle-card hover-raise p-4">
            <h2 className="text-sm font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-1 text-sm text-gray-700">{p.summary}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {p.impact.map((i) => (<li key={i}>{i}</li>))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.stack.map((s) => (<span key={s} className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs">{s}</span>))}
            </div>
            {p.links?.github && (
              <Link href={p.links.github} target="_blank" className="mt-2 inline-block text-xs text-gray-600 underline">GitHub</Link>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
