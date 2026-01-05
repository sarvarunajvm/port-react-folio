'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, FileText, Send, ExternalLink } from 'lucide-react'

interface ContactColophonProps {
  links: {
    email: string
    github: string
    linkedin: string
    resume: string
  }
  name: string
}

// Magnetic button component
function MagneticButton({ 
  children, 
  href, 
  className,
  color,
  download
}: { 
  children: React.ReactNode
  href: string
  className?: string
  color: string
  download?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`relative group hoverable ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: 'spring', damping: 15, stiffness: 150 }}
    >
      <motion.div
        className="relative p-6 rounded-2xl border overflow-hidden"
        style={{
          borderColor: `${color}30`,
          background: isHovered ? `${color}10` : 'transparent',
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Animated border gradient */}
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
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-2xl" style={{ background: 'var(--bg-secondary)' }} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {children}
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${color}`,
            opacity: isHovered ? 0.3 : 0,
          }}
        />
      </motion.div>
    </motion.a>
  )
}

// Glitchy email reveal
function GlitchyEmail({ email }: { email: string }) {
  const [revealed, setRevealed] = useState(false)
  const [displayText, setDisplayText] = useState('Click to reveal')
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789'

  const handleClick = () => {
    if (revealed) {
      window.location.href = `mailto:${email}`
      return
    }

    let iteration = 0
    const maxIterations = email.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        email
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return email[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration++
      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(email)
        setRevealed(true)
      }
    }, 30)
  }

  return (
    <motion.button
      onClick={handleClick}
      className="font-mono text-lg md:text-xl hoverable"
      style={{ color: 'var(--neon-primary)' }}
      whileHover={{
        textShadow: '0 0 20px var(--neon-primary)',
      }}
    >
      {displayText}
    </motion.button>
  )
}

export default function ContactColophon({ links, name }: ContactColophonProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: links.github, color: 'var(--neon-primary)' },
    { icon: Linkedin, label: 'LinkedIn', href: links.linkedin, color: 'var(--neon-secondary)' },
    { icon: FileText, label: 'Resume', href: links.resume, color: 'var(--neon-accent)' },
  ]

  return (
    <section id="contact" ref={containerRef} className="section py-32 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center bottom, var(--neon-primary)10 0%, transparent 50%)',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span 
            className="text-label tracking-[0.3em] block mb-4"
            style={{ color: 'var(--neon-warning)' }}
          >
            06 — CONNECT
          </span>
          <motion.h2
            className="text-headline-lg mb-6"
            animate={isInView ? {
              textShadow: [
                '0 0 0px transparent',
                '0 0 30px var(--neon-primary)',
                '0 0 0px transparent',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let&apos;s{' '}
            <span className="neon-text" style={{ color: 'var(--neon-primary)' }}>
              Build
            </span>
            {' '}Together
          </motion.h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Available for new opportunities. Whether it&apos;s a challenging project or an exciting role,
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Email reveal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border"
            style={{
              borderColor: 'var(--neon-primary)30',
              background: 'rgba(0, 255, 255, 0.05)',
            }}
            whileHover={{
              boxShadow: '0 0 40px var(--neon-primary)',
              borderColor: 'var(--neon-primary)',
            }}
          >
            <Mail 
              className="w-6 h-6" 
              style={{ color: 'var(--neon-primary)' }}
            />
            <GlitchyEmail email={links.email} />
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {socialLinks.map(({ icon: Icon, label, href, color }, index) => (
            <MagneticButton
              key={label}
              href={href}
              color={color}
              download={label === 'Resume' || href.endsWith('.pdf')}
            >
              <Icon 
                className="w-8 h-8 mx-auto mb-3 transition-all group-hover:scale-110" 
                style={{ color }}
              />
              <span className="text-sm font-medium" style={{ color }}>
                {label}
              </span>
              <motion.div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                <ExternalLink className="w-4 h-4" style={{ color }} />
              </motion.div>
            </MagneticButton>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href={`mailto:${links.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg hoverable"
            style={{
              background: 'var(--neon-primary)',
              color: 'var(--bg-primary)',
              boxShadow: '0 0 30px var(--neon-primary)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px var(--neon-primary), 0 0 100px var(--neon-primary)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start a Conversation</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Colophon / Footer */}
        <motion.div
          className="pt-16 border-t text-center"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-body-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--neon-accent)' }}
                animate={{
                  boxShadow: [
                    '0 0 5px var(--neon-accent)',
                    '0 0 15px var(--neon-accent)',
                    '0 0 5px var(--neon-accent)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Available for hire</span>
            </div>

            <p>
              Crafted with{' '}
              <motion.span
                style={{ color: 'var(--neon-secondary)' }}
                animate={{
                  textShadow: [
                    '0 0 5px var(--neon-secondary)',
                    '0 0 15px var(--neon-secondary)',
                    '0 0 5px var(--neon-secondary)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Next.js
              </motion.span>
              {' + '}
              <motion.span
                style={{ color: 'var(--neon-primary)' }}
                animate={{
                  textShadow: [
                    '0 0 5px var(--neon-primary)',
                    '0 0 15px var(--neon-primary)',
                    '0 0 5px var(--neon-primary)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                Framer Motion
              </motion.span>
            </p>

            <p>© {new Date().getFullYear()} {name}</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-40 rounded-full"
        style={{
          background: 'var(--neon-primary)',
          filter: 'blur(100px)',
          opacity: 0.1,
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  )
}
