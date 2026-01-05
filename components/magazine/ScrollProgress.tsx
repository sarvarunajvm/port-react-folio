'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [scrollPercent, setScrollPercent] = useState(0)

  // Update percentage
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  // Color based on scroll progress
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      'var(--neon-primary)',
      'var(--neon-secondary)',
      'var(--neon-accent)',
      'var(--neon-warning)',
    ]
  )

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[1000] origin-left"
        style={{
          scaleX,
          backgroundColor,
          boxShadow: `0 0 20px var(--neon-primary), 0 0 40px var(--neon-primary)`,
        }}
      />

      {/* Percentage indicator */}
      <motion.div
        className="fixed top-4 left-4 z-[1000] hidden md:flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        {/* Circular progress */}
        <motion.div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="var(--neon-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress,
                filter: 'drop-shadow(0 0 5px var(--neon-primary))',
              }}
            />
          </svg>
          
          {/* Percentage text */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-xs font-mono"
            style={{ color: 'var(--neon-primary)' }}
          >
            {scrollPercent}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Section indicators on the side */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[1000] hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        {['cover', 'toc', 'about', 'impact', 'experience', 'projects', 'skills', 'contact'].map((section, i) => (
          <motion.button
            key={section}
            className="group relative w-3 h-3 hoverable"
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.5 }}
          >
            <motion.div
              className="w-full h-full rounded-full border transition-all"
              style={{
                borderColor: scrollPercent >= (i / 8) * 100 && scrollPercent < ((i + 1) / 8) * 100
                  ? 'var(--neon-primary)'
                  : 'rgba(255,255,255,0.2)',
                background: scrollPercent >= (i / 8) * 100 && scrollPercent < ((i + 1) / 8) * 100
                  ? 'var(--neon-primary)'
                  : 'transparent',
                boxShadow: scrollPercent >= (i / 8) * 100 && scrollPercent < ((i + 1) / 8) * 100
                  ? '0 0 10px var(--neon-primary)'
                  : 'none',
              }}
            />
            
            {/* Tooltip */}
            <motion.span
              className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--neon-primary)',
                color: 'var(--neon-primary)',
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
