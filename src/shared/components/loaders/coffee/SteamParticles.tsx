import React from 'react';

import { motion } from 'framer-motion';

import { JAVA_KEYWORDS, THEME_COLORS } from './constants';
import type { SteamParticleProps } from './types';

const SteamParticle: React.FC<SteamParticleProps> = ({ id, delay, isDark }) => {
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const keyword = JAVA_KEYWORDS[Math.floor(Math.random() * JAVA_KEYWORDS.length)];
  const xOffset = (Math.random() - 0.5) * 40;

  return (
    <motion.div
      key={id}
      className="absolute bottom-0 left-1/2"
      initial={{
        x: xOffset,
        y: 0,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: [xOffset, xOffset + (Math.random() - 0.5) * 20, xOffset + (Math.random() - 0.5) * 30],
        y: [0, -50, -100, -150],
        opacity: [0, 0.8, 0.6, 0],
        scale: [0.5, 1, 1.2, 1.5],
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
        repeat: Infinity,
      }}
    >
      <div className="relative">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-t ${colors.steam} backdrop-blur-sm`}
        />

        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono ${colors.particle} whitespace-nowrap`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            delay: delay + 0.5,
            ease: 'easeInOut',
          }}
        >
          {keyword}
        </motion.div>
      </div>
    </motion.div>
  );
};

interface SteamParticlesProps {
  isDark: boolean;
  isActive: boolean;
  count?: number;
}

const SteamParticles: React.FC<SteamParticlesProps> = ({ isDark, isActive, count = 6 }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, index) => (
        <SteamParticle
          key={`steam-${index}`}
          id={`steam-${index}`}
          delay={index * 0.5}
          isDark={isDark}
        />
      ))}
    </div>
  );
};

export default SteamParticles;
