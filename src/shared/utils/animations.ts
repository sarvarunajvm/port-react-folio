/**
 * Advanced Animation Utilities
 * Sophisticated animation patterns and configurations
 */
import { Transition, Variants } from 'framer-motion';

// ============================================
// ANIMATION VARIANTS
// ============================================

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 15 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// ============================================
// COMPLEX ANIMATION PATTERNS
// ============================================

export const morphVariants: Variants = {
  initial: {
    borderRadius: '20px',
    scale: 1,
    rotate: 0,
  },
  hover: {
    borderRadius: '50%',
    scale: 1.1,
    rotate: 360,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

export const glowVariants: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(147, 51, 234, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 0 rgba(147, 51, 234, 0)',
      '0 0 20px rgba(147, 51, 234, 0.3)',
      '0 0 40px rgba(147, 51, 234, 0.6)',
      '0 0 20px rgba(147, 51, 234, 0.3)',
      '0 0 0 rgba(147, 51, 234, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

export const floatingVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

// ============================================
// 3D ANIMATION VARIANTS
// ============================================

export const flip3DVariants: Variants = {
  initial: {
    rotateY: 0,
    scale: 1,
  },
  hover: {
    rotateY: 180,
    scale: 1.05,
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 260,
    },
  },
};

export const perspective3DVariants: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    rotateX: -15,
    rotateY: 15,
    scale: 1.05,
    transition: {
      duration: 0.4,
      type: 'spring',
    },
  },
};

// ============================================
// GESTURE-BASED VARIANTS
// ============================================

export const dragVariants: Variants = {
  drag: {
    scale: 1.1,
    boxShadow: '0px 10px 30px rgba(0,0,0,0.3)',
    transition: {
      duration: 0.2,
    },
  },
};

export const tapVariants: Variants = {
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 400,
    },
  },
};

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  } as Transition,

  smooth: {
    type: 'spring',
    stiffness: 50,
    damping: 20,
  } as Transition,

  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  } as Transition,

  slow: {
    duration: 1,
    ease: 'easeInOut',
  } as Transition,

  fast: {
    duration: 0.2,
    ease: 'easeOut',
  } as Transition,
};

// ============================================
// ANIMATION UTILITIES
// ============================================

export const animationUtils = {
  /**
   * Create staggered animation for list items
   */
  createStaggerAnimation: (
    // itemCount: number,
    staggerDelay: number = 0.1,
    baseDelay: number = 0
  ): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  }),

  /**
   * Create wave animation
   */
  createWaveAnimation: (
    amplitude: number = 10,
    // frequency: number = 2,
    duration: number = 3
  ): Variants => ({
    animate: {
      y: [0, -amplitude, 0, amplitude, 0],
      transition: {
        duration,
        repeat: Infinity,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeInOut',
      },
    },
  }),

  /**
   * Create parallax effect
   */
  createParallaxAnimation: (scrollY: number, speed: number = 0.5) => ({
    y: scrollY * speed,
  }),

  /**
   * Create typewriter effect
   */
  createTypewriterAnimation: (
    // text: string,
    speed: number = 0.05
  ): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
      },
    },
  }),

  /**
   * Create gradient animation
   */
  createGradientAnimation: (colors: string[], duration: number = 5): Variants => ({
    animate: {
      background: colors,
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  }),

  /**
   * Check if user prefers reduced motion
   */
  shouldReduceMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Apply conditional animation based on user preference
   */
  conditionalAnimation: (variants: Variants, reducedVariants?: Variants): Variants => {
    if (animationUtils.shouldReduceMotion()) {
      return (
        reducedVariants || {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        }
      );
    }
    return variants;
  },
};

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

export const scrollAnimations = {
  fadeInUp: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  fadeInRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  zoomIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, type: 'spring' },
  },

  rotateIn: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.8, type: 'spring' },
  },
};

// ============================================
// EXPORTED ANIMATION CONFIGS
// ============================================

export const defaultAnimationConfig = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: fadeVariants,
  transition: transitions.smooth,
};

export const hoverAnimationConfig = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: transitions.fast,
};

export const scrollAnimationConfig = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true, amount: 0.3 },
  transition: transitions.smooth,
};
