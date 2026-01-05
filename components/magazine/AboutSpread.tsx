'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface AboutSpreadProps {
  bio: string
  avatar: string
  location: string
}

export default function AboutSpread({ bio, avatar, location }: AboutSpreadProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [imageHovered, setImageHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  return (
    <section id="about" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Background number */}
      <motion.div
        className="absolute top-20 left-10 text-[25vw] font-bold opacity-[0.02] pointer-events-none select-none leading-none"
        style={{ color: 'var(--neon-secondary)', y }}
      >
        01
      </motion.div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{ perspective: 1000 }}
          >
            {/* Photo container with neon frame */}
            <motion.div
              className="relative aspect-[3/4] max-w-md mx-auto"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ rotate }}
            >
              {/* Neon glow behind */}
              <motion.div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background: `linear-gradient(45deg, var(--neon-primary), var(--neon-secondary), var(--neon-accent))`,
                  backgroundSize: '200% 200%',
                  filter: 'blur(30px)',
                  opacity: imageHovered ? 0.6 : 0.2,
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Photo frame */}
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid',
                  borderColor: imageHovered ? 'var(--neon-primary)' : 'rgba(255,255,255,0.1)',
                  boxShadow: imageHovered ? '0 0 30px var(--neon-primary)' : 'none',
                }}
              >
                {/* Placeholder for actual photo */}
                <div
                  className="w-full h-full flex items-center justify-center relative"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-cover absolute inset-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                {/* Scan line effect */}
                <motion.div
                  className="absolute left-0 w-full h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--neon-primary), transparent)',
                    opacity: imageHovered ? 1 : 0,
                  }}
                  animate={imageHovered ? {
                    top: ['0%', '100%'],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Corner decorations */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((position, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${position} w-4 h-4 border-2`}
                    style={{
                      borderColor: 'var(--neon-accent)',
                      borderRight: i % 2 === 0 ? 'none' : undefined,
                      borderLeft: i % 2 === 1 ? 'none' : undefined,
                      borderBottom: i < 2 ? 'none' : undefined,
                      borderTop: i >= 2 ? 'none' : undefined,
                    }}
                    animate={imageHovered ? {
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>

              {/* Location badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full text-sm font-mono"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--neon-accent)',
                  color: 'var(--neon-accent)',
                  boxShadow: '0 0 20px var(--neon-accent)',
                }}
                initial={{ scale: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                📍 {location}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section label */}
            <motion.span
              className="text-label tracking-[0.3em] block mb-6"
              style={{ color: 'var(--neon-primary)' }}
              animate={isInView ? {
                textShadow: [
                  '0 0 0px transparent',
                  '0 0 10px var(--neon-primary)',
                  '0 0 0px transparent',
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              01 — THE STORY
            </motion.span>

            {/* Quote */}
            <motion.blockquote className="relative mb-8">
              <motion.span
                className="absolute -left-6 -top-4 text-8xl font-serif opacity-20"
                style={{ color: 'var(--neon-secondary)' }}
              >
                &ldquo;
              </motion.span>
              <motion.h2
                className="text-headline-sm leading-tight"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                Building software is about{' '}
                <motion.span
                  className="neon-text"
                  style={{ color: 'var(--neon-primary)' }}
                  animate={{
                    textShadow: [
                      '0 0 10px var(--neon-primary)',
                      '0 0 30px var(--neon-primary)',
                      '0 0 10px var(--neon-primary)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  solving real problems
                </motion.span>
                {' '}for real people.
              </motion.h2>
            </motion.blockquote>

            {/* Bio paragraphs with stagger */}
            <motion.div className="space-y-4">
              {bio.split('. ').map((sentence, i) => (
                <motion.p
                  key={i}
                  className="text-body-lg text-[var(--text-secondary)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {sentence}{i < bio.split('. ').length - 1 ? '.' : ''}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div
              className="mt-8 pt-8 border-t flex gap-8"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Shipped' },
                { value: '∞', label: 'Coffee Consumed' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.span
                    className="text-2xl font-bold block"
                    style={{ color: ['var(--neon-primary)', 'var(--neon-secondary)', 'var(--neon-accent)'][i] }}
                    animate={{
                      textShadow: [
                        '0 0 0px transparent',
                        `0 0 20px ${['var(--neon-primary)', 'var(--neon-secondary)', 'var(--neon-accent)'][i]}`,
                        '0 0 0px transparent',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
