'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth spring animation for the ring
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 400 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 400 })

  const trailRef = useRef<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Update trail
      trailRef.current = [
        { x: e.clientX, y: e.clientY },
        ...trailRef.current.slice(0, 5),
      ]
      setTrailPositions([...trailRef.current])
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
      {/* Trail effect */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[99996]"
          style={{
            left: pos.x,
            top: pos.y,
            width: 8 - i,
            height: 8 - i,
            borderRadius: '50%',
            background: `var(--neon-${i % 2 === 0 ? 'primary' : 'secondary'})`,
            opacity: 0.3 - i * 0.05,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${10 - i * 2}px var(--neon-${i % 2 === 0 ? 'primary' : 'secondary'})`,
          }}
          initial={false}
        />
      ))}

      {/* Main dot */}
      <motion.div
        className="fixed pointer-events-none z-[99999] mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
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
              0 0 20px var(--neon-primary),
              0 0 40px var(--neon-primary)
            `,
          }}
          animate={{
            width: isClicking ? 4 : isHovering ? 12 : 8,
            height: isClicking ? 4 : isHovering ? 12 : 8,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2"
          style={{
            borderColor: isHovering ? 'var(--neon-accent)' : 'var(--neon-secondary)',
            boxShadow: isHovering
              ? `0 0 20px var(--neon-accent), 0 0 40px var(--neon-accent), inset 0 0 20px rgba(57, 255, 20, 0.1)`
              : `0 0 10px var(--neon-secondary)`,
          }}
          animate={{
            width: isClicking ? 30 : isHovering ? 60 : 40,
            height: isClicking ? 30 : isHovering ? 60 : 40,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>

      {/* Magnetic particles around cursor when hovering */}
      {isHovering && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed pointer-events-none z-[99997]"
              style={{
                left: ringX,
                top: ringY,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: [0, 1, 0],
                x: Math.cos((i * 60 * Math.PI) / 180) * 40 - 3,
                y: Math.sin((i * 60 * Math.PI) / 180) * 40 - 3,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--neon-accent)',
                  boxShadow: '0 0 10px var(--neon-accent)',
                }}
              />
            </motion.div>
          ))}
        </>
      )}
    </>
  )
}

