import type { Variants } from 'framer-motion';

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.5,
  SLOW: 1,
  VERY_SLOW: 2,
} as const;

export const SPRING_CONFIG = {
  DEFAULT: { type: 'spring', stiffness: 100, damping: 20 },
  STIFF: { type: 'spring', stiffness: 400, damping: 30 },
  BOUNCY: { type: 'spring', stiffness: 300, damping: 10 },
} as const;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_CONFIG.DEFAULT,
  },
};

export const hoverVariants = {
  lift: { y: -5 },
  scale: { scale: 1.05 },
  rotate: { rotate: 360 },
} as const;
