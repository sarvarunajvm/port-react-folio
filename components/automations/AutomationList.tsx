import { automations } from '../../data/automations'

export function AutomationList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {automations.map((a) => (
        <article key={a.id} className="subtle-card hover-raise p-4">
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-semibold tracking-tight">{a.title}</h2>
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
          </div>
          <div className="mt-3 rounded-md bg-white/70 p-3 text-xs text-gray-800 ring-1 ring-inset ring-gray-200/60">
            <div><span className="text-gray-500">trigger:</span> {a.trigger}</div>
            <div className="mt-1"><span className="text-gray-500">actions:</span>
              <ul className="ml-4 list-disc">
                {a.actions.map((ac, i) => (<li key={i}>{ac}</li>))}
              </ul>
            </div>
            <div className="mt-1"><span className="text-gray-500">tools:</span> {a.tools.join(', ')}</div>
            {a.impact && (
              <div className="mt-1"><span className="text-gray-500">impact:</span> {a.impact.summary}</div>
            )}
          </div>
          {a.link && (
            <a href={a.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-gray-600 underline">View Repo</a>
          )}
        </article>
      ))}
    </div>
  )
}
