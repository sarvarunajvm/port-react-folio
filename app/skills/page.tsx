import { skills } from '../../data/profile'

export const metadata = { title: 'Skills – Saravanan Kalimuthu' }

export default function SkillsPage() {
  const groups = Object.entries(skills)
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {groups.map(([k, arr]) => (
          <section key={k} className="subtle-card p-4">
            <h2 className="text-sm font-medium capitalize">{k}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {arr.map((s) => (
                <span key={s} className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-800">{s}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
