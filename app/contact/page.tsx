import Link from 'next/link'
import { profile } from '../../data/profile'

export const metadata = { title: 'Contact – Saravanan Kalimuthu' }

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Hire me</h1>
      <div className="subtle-card mt-4 p-4 text-sm">
        <div>Email: <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div className="mt-1">Phone: <a className="underline" href={`tel:${profile.phone}`}>{profile.phone}</a></div>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href={profile.links.github} className="text-gray-700 underline" target="_blank">GitHub</Link>
          <Link href={profile.links.linkedin} className="text-gray-700 underline" target="_blank">LinkedIn</Link>
          <Link href={profile.links.resume} className="text-gray-700 underline" target="_blank">Resume</Link>
          {profile.links.calendly && (
            <Link href={profile.links.calendly} className="text-gray-700 underline" target="_blank">Schedule a call</Link>
          )}
        </div>
      </div>
    </main>
  )
}
