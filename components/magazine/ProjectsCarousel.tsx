'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

interface Project {
  id: string
  title: string
  category: string
  status: string
  year: string
  summary: string
  description: string
  impact: string[]
  tags: string[]
  featured?: boolean
  links?: { github?: string; npm?: string; demo?: string }
}

interface ProjectsCarouselProps {
  projects: Project[]
}

// 3D Tilt Card Component
function HoloCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])
  const brightness = useTransform(mouseXSpring, [-0.5, 0.5], [0.8, 1.2])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPos = (e.clientX - rect.left) / rect.width - 0.5
    const yPos = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPos)
    y.set(yPos)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const categoryColors: Record<string, { primary: string; glow: string }> = {
    professional: { primary: 'var(--neon-warning)', glow: 'var(--neon-warning)' },
    opensource: { primary: 'var(--neon-accent)', glow: 'var(--neon-accent)' },
    contributed: { primary: 'var(--neon-secondary)', glow: 'var(--neon-secondary)' },
  }

  const colors = categoryColors[project.category] || categoryColors.opensource

  return (
    <motion.div
      className="relative w-[380px] md:w-[420px] flex-shrink-0"
      initial={{ opacity: 0, y: 60, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        className="relative h-full p-6 rounded-2xl cursor-pointer hoverable"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 50 }}
      >
        {/* Holographic shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ filter: `brightness(${brightness})` }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                105deg,
                transparent 40%,
                ${colors.primary}20 45%,
                ${colors.primary}30 50%,
                transparent 55%
              )`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '200% 0%',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-[-2px] rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(45deg, ${colors.primary}, var(--neon-primary), ${colors.glow}, ${colors.primary})`,
            backgroundSize: '400% 400%',
            filter: 'blur(8px)',
            opacity: isHovered ? 0.6 : 0,
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Card content */}
        <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <motion.span
                className="text-label text-xs tracking-[0.15em] font-bold"
                style={{ 
                  color: colors.primary,
                  willChange: 'transform',
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {project.category.toUpperCase()}
              </motion.span>
              <motion.h3
                className="text-headline-sm mt-2"
                style={{
                  transform: 'translateZ(20px)',
                  willChange: 'transform',
                }}
                animate={{
                  y: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
            </div>
            <motion.span
              className="font-mono text-2xl"
              style={{ 
                color: 'var(--text-muted)',
                willChange: 'transform',
              }}
              animate={{
                x: project.featured ? -25 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {project.year}
            </motion.span>
          </div>

          {/* Summary */}
          <p className="text-body text-[var(--text-secondary)] mb-6">
            {project.summary}
          </p>

          {/* Impact list with animated bullets */}
          <ul className="space-y-3 mb-6">
            {project.impact.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-body-sm text-[var(--text-muted)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    background: colors.primary,
                    boxShadow: `0 0 10px ${colors.glow}`,
                  }}
                  animate={isHovered ? {
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      `0 0 10px ${colors.glow}`,
                      `0 0 20px ${colors.glow}`,
                      `0 0 10px ${colors.glow}`,
                    ],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Tags with hover glow */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 5).map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-xs rounded-full border"
                style={{
                  borderColor: `${colors.primary}50`,
                  color: colors.primary,
                  background: `${colors.primary}10`,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 20px ${colors.glow}`,
                  background: colors.primary,
                  color: 'var(--bg-primary)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          {project.links && (
            <motion.div
              className="flex gap-4 pt-4 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-[var(--text-muted)] hoverable"
                  whileHover={{ 
                    color: colors.primary,
                    x: 5,
                  }}
                >
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                  <motion.span
                    animate={isHovered ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              )}
              {project.links.npm && (
                <motion.a
                  href={project.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-body-sm text-[var(--text-muted)] hoverable"
                  whileHover={{ 
                    color: 'var(--neon-secondary)',
                    x: 5,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>NPM</span>
                </motion.a>
              )}
            </motion.div>
          )}
        </div>

        {/* Featured badge with pulse */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center z-20"
            style={{
              background: colors.primary,
              boxShadow: `0 0 20px ${colors.glow}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 20px ${colors.glow}`,
                `0 0 40px ${colors.glow}`,
                `0 0 20px ${colors.glow}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] font-bold text-black">★</span>
          </motion.div>
        )}

        {/* Reflection effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 60%, rgba(255,255,255,0.02) 100%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const scrollRef = useRef<HTMLDivElement>(null)

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'var(--neon-primary)',
          filter: 'blur(100px)',
          top: '20%',
          left: '-10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Section header with glitch effect */}
        <div className="container">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-label tracking-[0.3em] block mb-4 glitch"
              data-text="04 — THE WORK"
              style={{ color: 'var(--neon-accent)' }}
            >
              04 — THE WORK
            </motion.span>
            <motion.h2
              className="text-headline-md neon-text"
              style={{ color: 'var(--neon-primary)' }}
              animate={isInView ? {
                textShadow: [
                  '0 0 10px var(--neon-primary)',
                  '0 0 30px var(--neon-primary)',
                  '0 0 10px var(--neon-primary)',
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Projects
            </motion.h2>
            <p className="text-body-lg text-[var(--text-secondary)] mt-4 max-w-2xl">
              From enterprise systems to open-source contributions — building things that matter.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="horizontal-scroll px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]"
        >
          {featuredProjects.map((project, index) => (
            <HoloCard key={project.id} project={project} index={index} />
          ))}
          
          {/* Neon divider */}
          <motion.div
            className="w-[2px] h-[300px] self-center mx-6 flex-shrink-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, transparent, var(--neon-primary), transparent)',
              boxShadow: '0 0 20px var(--neon-primary)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {otherProjects.map((project, index) => (
            <HoloCard
              key={project.id}
              project={project}
              index={index + featuredProjects.length}
            />
          ))}
        </div>

        {/* Scroll hint with animation */}
        <motion.div
          className="container mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="text-label text-xs flex items-center gap-3"
            style={{ color: 'var(--neon-accent)' }}
          >
            <motion.span
              animate={{ x: [-5, 0, -5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ←
            </motion.span>
            <span>Scroll horizontally to explore</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
