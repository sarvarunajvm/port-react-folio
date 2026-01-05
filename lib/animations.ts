import { Variants } from 'framer-motion'

// Ease curves
export const easeOutExpo = [0.16, 1, 0.3, 1]
export const easeOutQuart = [0.25, 1, 0.5, 1]
export const easeInOutQuart = [0.76, 0, 0.24, 1]

// Fade variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

// Scale variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Character animation for headlines
export const charVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

// Word animation
export const wordVariants: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

// Line draw animation
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
}

export const drawLineVertical: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
}

// Image reveal
export const imageReveal: Variants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
}

// Card hover
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
}

// Magnetic button effect (use with motion values)
export const magneticVariants: Variants = {
  rest: { x: 0, y: 0 },
  hover: { x: 0, y: 0 },
}

// Slide in from edges
export const slideInFromBottom: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.5, ease: easeInOutQuart },
  },
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}

// Metric counter animation config
export const counterAnimation = {
  duration: 2,
  ease: easeOutExpo,
}

// Viewport settings for scroll triggers
export const viewportOnce = {
  once: true,
  margin: '-100px',
}

export const viewportRepeat = {
  once: false,
  amount: 0.3,
}

