import type { Metadata } from 'next'
import './globals.css'
import { CommandPalette } from '../components/CommandPalette'
import { PersonJsonLd } from '../components/SeoJsonLd'

export const metadata: Metadata = {
  title: 'Saravanan Kalimuthu – Portfolio',
  description: 'Senior Software Engineer. I build reliable web apps and automations that save teams time.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    title: 'Saravanan Kalimuthu – Portfolio',
    description: 'Senior Software Engineer. I build reliable web apps and automations that save teams time.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CommandPalette />
        <PersonJsonLd />
      </body>
    </html>
  )
}
