'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const themes = [
  { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#00ffff', '#ff00ff'] },
  { id: 'matrix', name: 'Matrix', colors: ['#39ff14', '#00ff41'] },
  { id: 'synthwave', name: 'Synthwave', colors: ['#ff71ce', '#01cdfe'] },
  { id: 'tokyo', name: 'Tokyo Night', colors: ['#f7768e', '#7aa2f7'] },
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('cyberpunk')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'cyberpunk'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    document.documentElement.setAttribute('data-theme', themeId)
    
    localStorage.setItem('portfolio-theme', themeId)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[1001]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Theme options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col gap-3 p-3 rounded-2xl"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {themes.map((theme, index) => (
              <motion.button
                key={theme.id}
                className="group relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all"
                style={{
                  background: currentTheme === theme.id 
                    ? `linear-gradient(135deg, ${theme.colors[0]}20, ${theme.colors[1]}20)` 
                    : 'transparent',
                  border: currentTheme === theme.id 
                    ? `1px solid ${theme.colors[0]}50` 
                    : '1px solid transparent',
                }}
                onClick={() => handleThemeChange(theme.id)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: -5 }}
              >
                {/* Color preview */}
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                    boxShadow: currentTheme === theme.id 
                      ? `0 0 20px ${theme.colors[0]}` 
                      : 'none',
                  }}
                  whileHover={{ scale: 1.2 }}
                />
                
                {/* Theme name */}
                <span 
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ 
                    color: currentTheme === theme.id ? theme.colors[0] : '#888',
                    textShadow: currentTheme === theme.id ? `0 0 10px ${theme.colors[0]}` : 'none',
                  }}
                >
                  {theme.name}
                </span>

                {/* Active indicator */}
                {currentTheme === theme.id && (
                  <motion.div
                    className="absolute left-0 top-1/2 w-1 h-4 rounded-full -translate-y-1/2"
                    style={{ background: theme.colors[0] }}
                    layoutId="activeTheme"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        className="relative w-12 h-12 rounded-full overflow-hidden neon-border"
        style={{
          background: `linear-gradient(135deg, ${themes.find(t => t.id === currentTheme)?.colors[0]}, ${themes.find(t => t.id === currentTheme)?.colors[1]})`,
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
          animate={{ opacity: isOpen ? 0.8 : 0.3 }}
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        </motion.div>
        
        {/* Rotating glow */}
        <motion.div
          className="absolute inset-[-2px] rounded-full opacity-50"
          style={{
            background: `conic-gradient(from 0deg, ${themes.find(t => t.id === currentTheme)?.colors[0]}, ${themes.find(t => t.id === currentTheme)?.colors[1]}, ${themes.find(t => t.id === currentTheme)?.colors[0]})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.button>
    </motion.div>
  )
}

