import { experience } from '../../data/profile'

export const metadata = {
  title: 'Experience – Saravanan Kalimuthu',
}

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
      <ul className="mt-6 space-y-4">
        {experience.map((job) => (
          <li key={job.company} className="subtle-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{job.role} @ {job.company}</div>
              <div className="text-xs text-gray-500">{job.period}</div>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
              {job.bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  )
}
