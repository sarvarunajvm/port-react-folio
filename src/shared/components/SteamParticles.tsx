import React from 'react';

import { motion } from 'framer-motion';
import { Text, Box } from '@radix-ui/themes';

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
      <Box style={{ position: 'relative' }}>
        <Box
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: `linear-gradient(to top, ${colors.steam})`,
            backdropFilter: 'blur(4px)',
          }}
          className="md:w-12 md:h-12"
        />

        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}
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
          <Text
            size="1"
            style={{
              fontFamily: '"Tomorrow", sans-serif',
              color: colors.particle,
            }}
          >
            {keyword}
          </Text>
        </motion.div>
      </Box>
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
    <Box
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SteamParticle
          key={`steam-${index}`}
          id={`steam-${index}`}
          delay={index * 0.5}
          isDark={isDark}
        />
      ))}
    </Box>
  );
};

export default SteamParticles;
