import React from 'react';

import { motion } from 'framer-motion';
import { Text, Box } from '@radix-ui/themes';

import { CODE_SYMBOLS, THEME_COLORS } from './constants';
import type { CoffeeBeanProps } from './types';

const CoffeeBeanParticle: React.FC<CoffeeBeanProps> = ({
  id,
  delay,
  isDark,
  onAnimationComplete,
}) => {
  const randomSymbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  return (
    <motion.div
      key={id}
      className="absolute"
      initial={{
        y: -100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        y: [-100, Math.random() * 50, Math.random() * 100 + 50, Math.random() * 150 + 100, 200],
        x: [
          Math.random() * 100 - 50,
          Math.random() * 80 - 40,
          Math.random() * 60 - 30,
          Math.random() * 40 - 20,
          0,
        ],
        opacity: [0, 1, 1, 1, 0],
        scale: [0, 1.2, 1, 0.8, 0.2],
        rotate: [0, 180, 360, 540, 720],
      }}
      transition={{
        duration: 2.5,
        delay,
        times: [0, 0.2, 0.5, 0.8, 1],
        ease: [0.32, 0, 0.67, 0],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <Box
        style={{
          position: 'relative',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.bean})`,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        className="md:w-12 md:h-12 neu-float"
      >
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            top: '0.25rem',
            left: '0.25rem',
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            bottom: '-2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0, 1, 0],
            y: [0, 5, 10, 15],
          }}
          transition={{
            duration: 1.5,
            delay: delay + 0.5,
            times: [0, 0.3, 0.6, 1],
          }}
        >
          <Text
            size="1"
            style={{
              fontFamily: '"Tomorrow", sans-serif',
              color: colors.particle,
            }}
          >
            {randomSymbol}
          </Text>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default CoffeeBeanParticle;
