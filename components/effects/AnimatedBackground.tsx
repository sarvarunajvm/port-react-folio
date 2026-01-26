'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use optimized canvas context
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Low-latency rendering
      willReadFrequently: false
    })
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
      maxLife: number
    }> = []

    const colors = [
      'var(--neon-primary)',
      'var(--neon-secondary)',
      'var(--neon-accent)',
    ]

    const getColor = (cssVar: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
    }

    // Reduce particles for better performance
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      })
    }

    let mouseX = -9999
    let mouseY = -9999

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Cache colors once
    const colorCache = new Map<string, string>()
    colors.forEach(c => colorCache.set(c, getColor(c)))

    // Visibility optimization
    let isVisible = true
    let rafId: number
    let frameCount = 0

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
      if (isVisible && !rafId) {
        rafId = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = () => {
      if (!isVisible) return

      frameCount++
      
      // Trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particleLength = particles.length
      
      for (let index = 0; index < particleLength; index++) {
        const p = particles[index]
        
        // Mouse attraction (optimized with early exit)
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distSq = dx * dx + dy * dy
        
        if (distSq < 40000) { // 200^2
          const dist = Math.sqrt(distSq)
          const force = (200 - dist) / 200 * 0.02
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Boundary wrap
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Reset if life exceeded
        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.life = 0
          p.vx = (Math.random() - 0.5) * 0.5
          p.vy = (Math.random() - 0.5) * 0.5
        }

        // Draw particle
        const alpha = 1 - p.life / p.maxLife
        const color = colorCache.get(p.color)!
        
        ctx.fillStyle = color
        ctx.globalAlpha = alpha * 0.6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Reduced glow - only every 4th particle
        if (index % 4 === 0) {
          ctx.shadowBlur = 8
          ctx.shadowColor = color
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Connections - draw every 3rd frame and limit checks
        if (frameCount % 3 === 0 && index % 3 === 0) {
          const maxCheck = Math.min(index + 3, particleLength)
          for (let i = index + 1; i < maxCheck; i++) {
            const p2 = particles[i]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const distSq = dx * dx + dy * dy

            if (distSq < 6400) { // 80^2
              const dist = Math.sqrt(distSq)
              ctx.strokeStyle = color
              ctx.globalAlpha = (1 - dist / 80) * 0.1
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <>
      {/* Particle canvas with GPU acceleration */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ 
          opacity: 0.6,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />

      {/* Aurora background with GPU hints */}
      <div className="aurora-bg" style={{ willChange: 'opacity' }} />

      {/* Optimized liquid blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'var(--neon-primary)',
            filter: 'blur(100px)',
            top: '-200px',
            left: '-200px',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'var(--neon-secondary)',
            filter: 'blur(100px)',
            bottom: '-150px',
            right: '-150px',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [0, -80, -40, 0],
            y: [0, -60, -120, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'var(--neon-accent)',
            filter: 'blur(80px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(0)',
            willChange: 'transform',
          }}
          animate={{
            x: ['-50%', '-30%', '-70%', '-50%'],
            y: ['-50%', '-70%', '-30%', '-50%'],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-primary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          willChange: 'opacity',
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" style={{ willChange: 'opacity' }} />

      {/* Scanlines */}
      <div className="scanlines" style={{ willChange: 'opacity' }} />
    </>
  )
}
