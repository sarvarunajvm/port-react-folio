import React from 'react';

import { motion } from 'framer-motion';

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
      <div
        className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${colors.bean} neu-float shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/30" />

        <motion.div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono ${colors.particle} opacity-0`}
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
          {randomSymbol}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoffeeBeanParticle;
