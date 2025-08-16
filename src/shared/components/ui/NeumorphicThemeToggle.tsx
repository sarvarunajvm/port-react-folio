import React from 'react';

import { motion } from 'framer-motion';

import type { ThemeToggleProps } from '../../types';

const NeumorphicThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-20 h-10 rounded-full neu-pressed transition-all duration-300 focus-ring hover:shadow-accent ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <div className="absolute inset-1 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isDark
              ? 'linear-gradient(to right, #404040, #606060)' // Silver-tinted gradient
              : 'linear-gradient(to right, #FFF4E6, #FFE4B5)', // Gold-tinted gradient
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Sliding Thumb */}
      <motion.div
        className="absolute top-1 w-8 h-8 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 40 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        style={{
          background: 'var(--surface)',
          boxShadow: isDark
            ? '4px 4px 8px rgba(0, 0, 0, 0.5), -2px -2px 4px rgba(255, 255, 255, 0.1)'
            : '4px 4px 8px rgba(0, 0, 0, 0.15), -2px -2px 4px rgba(255, 255, 255, 0.9)',
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 360 : 0,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <span className="text-base text-[var(--accent)]">🌙</span>
          ) : (
            <span className="text-base text-[var(--accent)]">☀️</span>
          )}
        </motion.div>
      </motion.div>

      {/* Icon indicators on the track */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span
          className={`text-sm transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-0'}`}
          style={{ color: 'var(--muted)' }}
        >
          ☀️
        </span>
        <span
          className={`text-sm transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-30'}`}
          style={{ color: 'var(--muted)' }}
        >
          🌙
        </span>
      </div>
    </button>
  );
};

export default NeumorphicThemeToggle;
