import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CinematicShell } from '@/components/CinematicShell';
import profile from '@/data/profile.json';
import { siteTitle, siteDescription, siteUrl } from '@/lib/site';

const spaceGrotesk = localFont({
  src: '../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '300 700',
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

const manrope = localFont({
  src: '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-body',
  display: 'swap',
  weight: '200 800',
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

const jetbrains = localFont({
  src: '../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '100 800',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Saravanan Kalimuthu Portfolio',
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    profile.name,
    profile.title,
    'distributed systems',
    'payments',
    'platform reliability',
    'backend engineering',
    'PayPal',
    'Java',
    'Spring Boot',
    'Kafka',
    'Redis',
    'React',
    'Next.js',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName: 'Saravanan Kalimuthu Portfolio',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/personal/contact.png',
        alt: `${profile.name} portrait`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/personal/contact.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body>
        <CinematicShell>{children}</CinematicShell>
      </body>
    </html>
  );
}
