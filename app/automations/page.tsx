import { AutomationList } from '../../components/automations/AutomationList'

export const metadata = {
  title: 'Automations – Saravanan Kalimuthu',
  description: 'I automate repetitive workflows to reduce errors and reclaim time.'
}

export default function AutomationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
      <p className="mt-2 text-gray-600">I automate repetitive workflows to reduce errors and reclaim time.</p>
      <div className="mt-8">
        <AutomationList />
      </div>
    </main>
  )
}
