'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface Experience {
  id: string
  company: string
  role: string
  type: string
  period: { start: string; end: string | null }
  location: string
  achievements: string[]
  tags: string[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ExperienceCard({ experience, index, isLast }: { 
  experience: Experience
  index: number
  isLast: boolean 
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null)

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
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-8 items-start pb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Left side - Date and company */}
      <motion.div
        className="text-right md:pr-8"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <motion.span
          className="text-label tracking-wider block mb-2"
          style={{ color }}
          animate={{
            textShadow: [
              '0 0 0px transparent',
              `0 0 10px ${color}`,
              '0 0 0px transparent',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {formatDate(experience.period.start)} — {experience.period.end ? formatDate(experience.period.end) : 'Present'}
        </motion.span>
        <h3 className="text-xl font-bold">{experience.company}</h3>
        <span className="text-sm text-[var(--text-muted)]">{experience.location}</span>
      </motion.div>

      {/* Center - Timeline */}
      <div className="hidden md:flex flex-col items-center">
        {/* Glowing node */}
        <motion.div
          className="relative w-4 h-4 rounded-full z-10"
          style={{
            background: color,
            boxShadow: `0 0 20px ${color}`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              `0 0 20px ${color}`,
              `0 0 40px ${color}`,
              `0 0 20px ${color}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Animated line */}
        {!isLast && (
          <motion.div
            className="w-[2px] flex-1 min-h-[200px]"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        )}
      </div>

      {/* Right side - Content */}
      <motion.div
        className="relative rounded-2xl p-6 hoverable"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          borderColor: `${color}50`,
          boxShadow: `0 0 30px ${color}30`,
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${color}, var(--neon-primary), ${color})`,
            backgroundSize: '200% 100%',
            padding: '1px',
            opacity: isHovered ? 1 : 0,
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '200% 0%'],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-2xl" style={{ background: 'var(--bg-secondary)' }} />
        </motion.div>

        <div className="relative z-10">
          {/* Role */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">{experience.role}</h4>
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: `${color}20`,
                color,
                border: `1px solid ${color}50`,
              }}
            >
              {experience.type}
            </span>
          </div>

          {/* Achievements */}
          <ul className="space-y-3 mb-4">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--text-secondary)] cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                onClick={() => setExpandedAchievement(expandedAchievement === i ? null : i)}
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ 
                    background: color,
                    boxShadow: expandedAchievement === i ? `0 0 15px ${color}` : 'none',
                  }}
                  animate={isHovered ? {
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="text-xs px-2 py-1 rounded-full border"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.5 + i * 0.03 }}
                whileHover={{
                  borderColor: color,
                  color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <section id="experience" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute top-0 right-0 text-[30vw] font-bold opacity-[0.02] pointer-events-none select-none"
        style={{ color: 'var(--neon-accent)', y: bgY }}
      >
        03
      </motion.div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="text-label tracking-[0.3em] block mb-4"
            style={{ color: 'var(--neon-accent)' }}
          >
            03 — THE JOURNEY
          </span>
          <motion.h2
            className="text-headline-md"
            animate={isInView ? {
              textShadow: [
                '0 0 0px transparent',
                '0 0 20px var(--neon-accent)',
                '0 0 0px transparent',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Experience{' '}
            <span className="neon-text-accent" style={{ color: 'var(--neon-accent)' }}>
              Timeline
            </span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
