'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

/**
 * High-performance glow wrapper
 * Uses CSS transitions for glows (hardware accelerated by browser)
 * Uses Framer Motion only for transforms (GPU accelerated)
 */

interface PerformantGlowProps {
  children: ReactNode
  color?: string
  className?: string
  glowIntensity?: 'low' | 'medium' | 'high'
  enableHover?: boolean
}

export default function PerformantGlow({
  children,
  color = 'var(--neon-primary)',
  className = '',
  glowIntensity = 'medium',
  enableHover = true,
}: PerformantGlowProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowValues = {
    low: {
      base: '0 0 5px',
      hover: '0 0 10px',
    },
    medium: {
      base: '0 0 8px',
      hover: '0 0 15px, 0 0 25px',
    },
    high: {
      base: '0 0 10px',
      hover: '0 0 20px, 0 0 35px',
    },
  }

  const glow = glowValues[glowIntensity]

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        color,
        textShadow: isHovered ? `${glow.hover} ${color}` : `${glow.base} ${color}`,
        transition: 'text-shadow 0.2s ease',
        willChange: 'transform',
      }}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
      whileHover={enableHover ? {
        scale: 1.05,
        y: -2,
      } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}

