'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface CoverProps {
  name: string
  title: string
  tagline: string
}

// Text scramble effect hook
function useTextScramble(text: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState('')
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソ'

  useEffect(() => {
    if (!trigger) return

    let iteration = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration++
      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [text, trigger])

  return displayText
}

// Magnetic effect component
function MagneticText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(position.x, springConfig)
  const y = useSpring(position.y, springConfig)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Cover({ name, title, tagline }: CoverProps) {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [nameHover, setNameHover] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 20])

  // Text scramble for name
  const scrambledName = useTextScramble(name, isLoaded)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const nameParts = name.split(' ')

  return (
    <section
      ref={containerRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
      id="cover"
    >
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-primary) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.05,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[var(--neon-primary)] opacity-20"
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              borderRadius: ['0%', '20%', '0%'],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 container text-center"
        style={{ y, opacity, scale, rotateX, perspective: 1000 }}
      >
        {/* Glitch title above name */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-label tracking-[0.5em] text-[var(--neon-secondary)] neon-text-secondary">
            PORTFOLIO // 2026
          </span>
        </motion.div>

        {/* Main name with crazy animations */}
        <MagneticText className="inline-block">
          <motion.h1
            className="text-headline-xl text-display relative cursor-pointer glitch-hover"
            data-text={scrambledName}
            onMouseEnter={() => setNameHover(true)}
            onMouseLeave={() => setNameHover(false)}
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring', damping: 20 }}
          >
            {/* Animated letters */}
            <span className="block overflow-hidden">
              {nameParts[0]?.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 100, opacity: 0, rotateY: -90 }}
                  animate={{ y: 0, opacity: 1, rotateY: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.05,
                    duration: 0.5,
                    type: 'spring',
                    damping: 12,
                  }}
                  whileHover={{
                    y: -10,
                    color: 'var(--neon-primary)',
                    textShadow: '0 0 30px var(--neon-primary)',
                  }}
                  style={{
                    textShadow: nameHover
                      ? '0 0 20px var(--neon-primary)'
                      : 'none',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {nameParts[1]?.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block neon-text"
                  style={{ color: 'var(--neon-primary)' }}
                  initial={{ y: 100, opacity: 0, rotateY: 90 }}
                  animate={{ y: 0, opacity: 1, rotateY: 0 }}
                  transition={{
                    delay: 1 + i * 0.05,
                    duration: 0.5,
                    type: 'spring',
                    damping: 12,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Glitch layers */}
            {nameHover && (
              <>
                <motion.span
                  className="absolute inset-0 text-[var(--neon-primary)]"
                  animate={{ x: [0, -5, 5, 0], opacity: [0, 0.8, 0.8, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
                >
                  {name}
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-[var(--neon-secondary)]"
                  animate={{ x: [0, 5, -5, 0], opacity: [0, 0.8, 0.8, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                  style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
                >
                  {name}
                </motion.span>
              </>
            )}
          </motion.h1>
        </MagneticText>

        {/* Title with typewriter effect */}
        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.p
            className="text-headline-sm text-[var(--text-secondary)] font-mono"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.8, duration: 1.5, ease: 'easeOut' }}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              borderRight: '3px solid var(--neon-accent)',
            }}
          >
            {title}
          </motion.p>
        </motion.div>

        {/* Tagline with wave effect */}
        <motion.p
          className="mt-4 text-body-lg text-[var(--text-muted)] max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {tagline.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                delay: 3 + i * 0.02,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 cursor-pointer hoverable"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            document.getElementById('toc')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-label text-xs text-[var(--neon-accent)] tracking-widest">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-[var(--neon-accent)] rounded-full p-1 neon-pulse"
          >
            <motion.div
              className="w-1.5 h-1.5 bg-[var(--neon-accent)] rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: '0 0 10px var(--neon-accent)' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating icons/symbols */}
        <motion.div
          className="absolute top-8 left-8 text-label text-xs text-[var(--text-muted)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[var(--neon-primary)]">●</span> AVAILABLE FOR HIRE
        </motion.div>

        <motion.div
          className="absolute top-8 right-8 text-label text-xs text-[var(--text-muted)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          ISSUE №01 <span className="text-[var(--neon-secondary)]">●</span>
        </motion.div>

      {/* Floating icons/symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['{ }', '< />', '( )', '[ ]', '&&', '||'].map((symbol, i) => (
          <FloatingSymbol key={i} symbol={symbol} index={i} />
        ))}
      </div>
    </section>
  )
}

function FloatingSymbol({ symbol, index }: { symbol: string, index: number }) {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setPosition({
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
    })
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute font-mono text-2xl opacity-10"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        color: index % 2 === 0 ? 'var(--neon-primary)' : 'var(--neon-secondary)',
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: index * 0.5,
      }}
    >
      {symbol}
    </motion.div>
  )
}
