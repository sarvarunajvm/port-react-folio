'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface TOCItem {
  number: string
  title: string
  section: string
}

interface TableOfContentsProps {
  items: TOCItem[]
}

function TOCEntry({ item, index }: { item: TOCItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' })
  }

  const neonColors = [
    'var(--neon-primary)',
    'var(--neon-secondary)',
    'var(--neon-accent)',
    'var(--neon-warning)',
    'var(--neon-purple)',
    'var(--neon-primary)',
  ]
  const color = neonColors[index % neonColors.length]

  return (
    <motion.button
      className="group w-full text-left py-6 border-b border-white/5 relative overflow-hidden hoverable"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 20 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, ${color}10 0%, transparent 100%)`,
        }}
      />

      {/* Animated line */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1 rounded-full"
        style={{ background: color }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center gap-6">
        {/* Number - OPTIMIZED */}
        <motion.span
          className="font-mono text-4xl md:text-5xl font-bold"
          style={{
            color: isHovered ? color : 'var(--text-muted)',
            transition: 'color 0.2s ease',
            willChange: 'transform',
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {item.number}
        </motion.span>

        {/* Title */}
        <div className="flex-1">
          <motion.span
            className="text-xl md:text-2xl font-medium tracking-wide"
            style={{ 
              color: isHovered ? color : 'var(--text-primary)',
              transition: 'color 0.2s ease',
              willChange: 'transform',
            }}
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {item.title}
          </motion.span>
        </div>

        {/* Arrow */}
        <motion.span
          className="text-2xl"
          style={{ color, willChange: 'transform' }}
          animate={{ 
            x: isHovered ? 10 : 0, 
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </div>

      {/* Scanning line effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-0 w-full h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
            initial={{ top: '100%', opacity: 0 }}
            animate={{ top: '0%', opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

import { AnimatePresence } from 'framer-motion'

export default function TableOfContents({ items }: TableOfContentsProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="toc" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 text-[40vw] font-bold opacity-[0.02] pointer-events-none select-none leading-none"
        style={{ color: 'var(--neon-primary)' }}
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        01
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
            style={{ color: 'var(--neon-primary)' }}
          >
            CONTENTS
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
            In this{' '}
            <span className="neon-text" style={{ color: 'var(--neon-primary)' }}>
              Issue
            </span>
          </motion.h2>
        </motion.div>

        {/* TOC entries */}
        <div className="max-w-3xl">
          {items.map((item, index) => (
            <TOCEntry key={item.section} item={item} index={index} />
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          className="absolute bottom-20 right-20 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-40 h-40 border-2 rounded-full"
            style={{ borderColor: 'var(--neon-primary)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full"
              style={{ borderColor: 'var(--neon-secondary)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
