'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Create multiple spring instances for the trail effect with different stiffness/damping
  const springConfig1 = { damping: 25, stiffness: 300 }
  const springConfig2 = { damping: 20, stiffness: 200 }
  const springConfig3 = { damping: 15, stiffness: 100 }
  const springConfig4 = { damping: 10, stiffness: 50 }

  const x1 = useSpring(cursorX, springConfig1)
  const y1 = useSpring(cursorY, springConfig1)
  
  const x2 = useSpring(cursorX, springConfig2)
  const y2 = useSpring(cursorY, springConfig2)
  
  const x3 = useSpring(cursorX, springConfig3)
  const y3 = useSpring(cursorY, springConfig3)
  
  const x4 = useSpring(cursorX, springConfig4)
  const y4 = useSpring(cursorY, springConfig4)

  useEffect(() => {
    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Trailing elements */}
      <motion.div
        className="fixed pointer-events-none z-[99996]"
        style={{
          left: x4,
          top: y4,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--neon-accent)',
          opacity: 0.2,
          x: '-50%',
          y: '-50%',
          filter: 'blur(2px)',
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[99997]"
        style={{
          left: x3,
          top: y3,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'var(--neon-secondary)',
          opacity: 0.4,
          x: '-50%',
          y: '-50%',
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: x2,
          top: y2,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'var(--neon-primary)',
          opacity: 0.6,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[99999] mix-blend-difference"
        style={{
          left: x1,
          top: y1,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            background: 'var(--neon-primary)',
            boxShadow: `
              0 0 10px var(--neon-primary),
              0 0 20px var(--neon-primary)
            `,
          }}
          animate={{
            width: isClicking ? 20 : isHovering ? 32 : 8,
            height: isClicking ? 20 : isHovering ? 32 : 8,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full border border-[var(--neon-primary)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.5 }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    </>
  )
}
