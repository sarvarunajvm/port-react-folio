'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

interface Skill {
  name: string
  level: number
}

interface Category {
  name: string
  color: string
  skills: Skill[]
}

interface SkillsCollageProps {
  categories: Category[]
}

// Skill chip with level indicator
function SkillChip({ skill, color, index, categoryIndex }: { 
  skill: Skill
  color: string
  index: number
  categoryIndex: number 
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group hoverable"
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: categoryIndex * 0.1 + index * 0.03,
        type: 'spring',
        damping: 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative px-4 py-2 rounded-full border overflow-hidden"
        style={{
          borderColor: `${color}50`,
          background: isHovered ? color : `${color}15`,
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {/* Animated shine */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['-200% 0', '200% 0'],
          } : {}}
          transition={{ duration: 0.6 }}
        />

        {/* Skill name */}
        <span
          className="relative z-10 text-sm font-medium whitespace-nowrap transition-colors"
          style={{ color: isHovered ? 'var(--bg-primary)' : color }}
        >
          {skill.name}
        </span>

        {/* Level dots */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all"
              style={{
                background: i < skill.level ? 'var(--bg-primary)' : `${color}50`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Floating particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                style={{ background: color }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: (Math.random() - 0.5) * 80,
                  y: (Math.random() - 0.5) * 80,
                  opacity: [0, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Category section
function CategorySection({ category, index, isActive }: {
  category: Category
  index: number
  isActive: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category label */}
      <motion.div
        className="flex items-center gap-3 mb-4"
        whileHover={{ x: 10 }}
      >
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ 
            background: category.color,
            boxShadow: `0 0 15px ${category.color}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              `0 0 15px ${category.color}`,
              `0 0 30px ${category.color}`,
              `0 0 15px ${category.color}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span 
          className="text-label text-sm tracking-wider"
          style={{ color: category.color }}
        >
          {category.name}
        </span>
      </motion.div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            color={category.color}
            index={skillIndex}
            categoryIndex={index}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsCollage({ categories }: SkillsCollageProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filters = ['ALL', ...categories.map(c => c.name.toUpperCase())]

  return (
    <section id="skills" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, var(--neon-primary) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, var(--neon-secondary) 0%, transparent 50%)`,
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="text-label tracking-[0.3em] block mb-4"
            style={{ color: 'var(--neon-purple)' }}
          >
            05 — THE CRAFT
          </span>
          <motion.h2
            className="text-headline-md"
            animate={isInView ? {
              textShadow: [
                '0 0 0px transparent',
                '0 0 20px var(--neon-secondary)',
                '0 0 0px transparent',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Skills &{' '}
            <span className="neon-text-secondary" style={{ color: 'var(--neon-secondary)' }}>
              Tools
            </span>
          </motion.h2>
          <p className="text-body-lg text-[var(--text-secondary)] mt-4">
            Technologies I use to turn ideas into reality.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {filters.map((filter, index) => {
            const isActive = activeFilter === null ? filter === 'ALL' : 
                            filter === 'ALL' ? activeFilter === null :
                            filter === activeFilter

            return (
              <motion.button
                key={filter}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hoverable"
                style={{
                  background: isActive ? 'var(--neon-primary)' : 'transparent',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-muted)',
                  border: `1px solid ${isActive ? 'var(--neon-primary)' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isActive ? '0 0 20px var(--neon-primary)' : 'none',
                }}
                onClick={() => setActiveFilter(filter === 'ALL' ? null : filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {filter}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const isActive = activeFilter === null || activeFilter === category.name.toUpperCase()
            
            return (
              <CategorySection
                key={category.name}
                category={category}
                index={index}
                isActive={isActive}
              />
            )
          })}
        </div>

        {/* Currently exploring */}
        <motion.p
          className="mt-16 text-center text-body text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Always learning. Currently exploring:{' '}
          <motion.span
            className="inline-block"
            style={{ color: 'var(--neon-accent)' }}
            animate={{
              textShadow: [
                '0 0 5px var(--neon-accent)',
                '0 0 20px var(--neon-accent)',
                '0 0 5px var(--neon-accent)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            System Design
          </motion.span>
          ,{' '}
          <motion.span
            className="inline-block"
            style={{ color: 'var(--neon-secondary)' }}
            animate={{
              textShadow: [
                '0 0 5px var(--neon-secondary)',
                '0 0 20px var(--neon-secondary)',
                '0 0 5px var(--neon-secondary)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            AI/ML integrations
          </motion.span>
          , and{' '}
          <motion.span
            className="inline-block"
            style={{ color: 'var(--neon-warning)' }}
            animate={{
              textShadow: [
                '0 0 5px var(--neon-warning)',
                '0 0 20px var(--neon-warning)',
                '0 0 5px var(--neon-warning)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            Rust
          </motion.span>
          .
        </motion.p>
      </div>
    </section>
  )
}
