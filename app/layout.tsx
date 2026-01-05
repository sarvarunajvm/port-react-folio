import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import ThemeSwitcher from '@/components/effects/ThemeSwitcher'
import CustomCursor from '@/components/effects/CustomCursor'
import AnimatedBackground from '@/components/effects/AnimatedBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Saravanan Kalimuthu | Sr. Software Engineer',
  description: 'Senior Software Engineer at PayPal. 10+ years building reliable web apps and automations that save teams time. Open source enthusiast.',
  keywords: ['Software Engineer', 'PayPal', 'Java', 'Spring Boot', 'React', 'Portfolio'],
  authors: [{ name: 'Saravanan Kalimuthu' }],
  openGraph: {
    title: 'Saravanan Kalimuthu | Sr. Software Engineer',
    description: 'Building systems that scale. Senior Software Engineer at PayPal.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <SmoothScroll>
          {/* Animated background effects */}
          <AnimatedBackground />
          
          {/* Custom cursor */}
          <CustomCursor />
          
          {/* Theme switcher */}
          <ThemeSwitcher />
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  )
}
