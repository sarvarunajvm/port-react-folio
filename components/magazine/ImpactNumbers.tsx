'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Metric {
  value: string
  label: string
  description: string
}

interface ImpactNumbersProps {
  metrics: Metric[]
}

// Animated counter with slot machine effect
function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)
  const numericMatch = value.match(/[\d.]+/)
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0
  const prefix = value.match(/^[^\d]*/)?.[0] || ''
  const suffix = value.match(/[^\d]*$/)?.[0] || ''

  const spring = useSpring(0, { damping: 30, stiffness: 100 })

  useEffect(() => {
    if (inView && numericValue > 0) {
      spring.set(numericValue)
    }
  }, [inView, numericValue, spring])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (Number.isInteger(numericValue)) {
        setDisplayValue(`${prefix}${Math.round(latest)}${suffix}`)
      } else {
        setDisplayValue(`${prefix}${latest.toFixed(1)}${suffix}`)
      }
    })
  }, [spring, prefix, suffix, numericValue])

  return (
    <span className="font-mono tabular-nums">
      {numericValue > 0 ? displayValue : value}
    </span>
  )
}

// Glitch number component
function GlitchNumber({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 5000 + delay * 1000)

    return () => clearInterval(interval)
  }, [delay])

  return (
    <span className={`relative ${glitching ? 'glitch' : ''}`} data-text={children}>
      {children}
      {glitching && (
        <>
          <span 
            className="absolute inset-0" 
            style={{ 
              color: 'var(--neon-primary)', 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-2px, 0)',
            }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0" 
            style={{ 
              color: 'var(--neon-secondary)', 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(2px, 0)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  const neonColors = [
    'var(--neon-primary)',
    'var(--neon-secondary)',
    'var(--neon-accent)',
    'var(--neon-warning)',
  ]
  const color = neonColors[index % neonColors.length]

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative p-8 rounded-2xl overflow-hidden hoverable"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(90deg, ${color}, var(--neon-primary), ${color})`,
            backgroundSize: '200% 100%',
            padding: '1px',
            opacity: isHovered ? 1 : 0.3,
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '200% 0%'],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div 
            className="w-full h-full rounded-2xl"
            style={{ background: 'var(--bg-secondary)' }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          {/* Big number - OPTIMIZED */}
          <motion.div
            className="text-6xl md:text-7xl font-bold mb-4"
            style={{
              color,
              willChange: 'transform',
            }}
            whileHover={{
              scale: 1.05,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            <GlitchNumber delay={index}>
              <AnimatedCounter value={metric.value} inView={isInView} />
            </GlitchNumber>
          </motion.div>

          {/* Label */}
          <motion.h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)', willChange: 'transform' }}
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {metric.label}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-sm text-[var(--text-muted)]"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            {metric.description}
          </motion.p>
        </div>

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: color }}
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 opacity-20"
          style={{
            background: `radial-gradient(circle at top right, ${color}, transparent 70%)`,
          }}
          animate={isHovered ? {
            opacity: [0.2, 0.5, 0.2],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Reflection */}
      <div
        className="absolute -bottom-8 left-4 right-4 h-8 rounded-2xl opacity-20 blur-xl"
        style={{ background: color }}
      />
    </motion.div>
  )
}

export default function ImpactNumbers({ metrics }: ImpactNumbersProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="impact" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Large background number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold opacity-[0.02] pointer-events-none select-none"
        style={{ color: 'var(--neon-primary)' }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        02
      </motion.div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="text-label tracking-[0.3em] block mb-4"
            style={{ color: 'var(--neon-secondary)' }}
          >
            02 — THE IMPACT
          </span>
          <motion.h2
            className="text-headline-md"
            animate={isInView ? {
              textShadow: [
                '0 0 0px transparent',
                '0 0 20px var(--neon-primary)',
                '0 0 0px transparent',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Numbers that{' '}
            <span 
              className="neon-text"
              style={{ color: 'var(--neon-primary)' }}
            >
              matter
            </span>
          </motion.h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Quote */}
        <motion.p
          className="text-center text-body-lg text-[var(--text-muted)] mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Every line of code is an opportunity to create{' '}
          <span className="neon-text-accent" style={{ color: 'var(--neon-accent)' }}>
            measurable business value
          </span>
          .
        </motion.p>
      </div>
    </section>
  )
}
