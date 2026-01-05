'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

    // Create initial particles
    for (let i = 0; i < 50; i++) {
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

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const getColor = (cssVar: string) => {
      const style = getComputedStyle(document.documentElement)
      return style.getPropertyValue(cssVar.replace('var(', '').replace(')', '')).trim() || '#00ffff'
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        // Mouse attraction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
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

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

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
        const color = getColor(p.color)
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = alpha * 0.6
        ctx.fill()

        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = color
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect nearby particles
        particles.forEach((p2, index2) => {
          if (index === index2) return
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = color
            ctx.globalAlpha = (1 - dist / 100) * 0.2
            ctx.stroke()
          }
        })
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Liquid blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'var(--neon-primary)',
            filter: 'blur(100px)',
            top: '-200px',
            left: '-200px',
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 0.9, 1],
            borderRadius: ['60% 40% 30% 70%', '30% 60% 70% 40%', '50% 60% 30% 60%', '60% 40% 30% 70%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'var(--neon-secondary)',
            filter: 'blur(100px)',
            bottom: '-150px',
            right: '-150px',
          }}
          animate={{
            x: [0, -80, -40, 0],
            y: [0, -60, -120, 0],
            scale: [1, 0.9, 1.1, 1],
            borderRadius: ['40% 60% 70% 30%', '60% 40% 30% 70%', '30% 60% 70% 40%', '40% 60% 70% 30%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'var(--neon-accent)',
            filter: 'blur(80px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: ['-50%', '-30%', '-70%', '-50%'],
            y: ['-50%', '-70%', '-30%', '-50%'],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
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
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Scanlines */}
      <div className="scanlines" />
    </>
  )
}

