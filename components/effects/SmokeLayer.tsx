'use client'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function SmokeLayer() {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, color-mix(in oklab, var(--smoke-hue-a) 8%, transparent) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, color-mix(in oklab, var(--smoke-hue-b) 5%, transparent) 0%, transparent 50%)
          `,
        }}
        aria-hidden
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 animate-smoke-1"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 40%, color-mix(in oklab, var(--smoke-hue-a) 12%, transparent) 0%, transparent 50%)`,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute inset-0 animate-smoke-2"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 80% 60%, color-mix(in oklab, var(--smoke-hue-b) 8%, transparent) 0%, transparent 50%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute inset-0 animate-smoke-3"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% 80%, color-mix(in oklab, var(--smoke-hue-c) 6%, transparent) 0%, transparent 50%)`,
          filter: 'blur(70px)',
        }}
      />
    </div>
  )
}
