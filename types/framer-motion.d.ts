import 'framer-motion'

declare module 'framer-motion' {
  export interface MotionProps {
    initial?: any
    animate?: any
    exit?: any
    whileHover?: any
    whileTap?: any
    whileFocus?: any
    whileDrag?: any
    whileInView?: any
    variants?: any
    transition?: any
    layoutId?: string
    layout?: boolean | 'position' | 'size' | 'preserve-aspect'
    drag?: boolean | 'x' | 'y'
    dragConstraints?: any
    dragElastic?: number | boolean
    dragMomentum?: boolean
    dragTransition?: any
    dragPropagation?: boolean
    dragControls?: any
    onDragStart?: any
    onDragEnd?: any
    onDrag?: any
    onAnimationStart?: any
    onAnimationComplete?: any
    onUpdate?: any
    onPan?: any
    onPanStart?: any
    onPanEnd?: any
    onTap?: any
    onTapStart?: any
    onTapCancel?: any
    onHoverStart?: any
    onHoverEnd?: any
    onViewportEnter?: any
    onViewportLeave?: any
  }

  export interface HTMLMotionProps<T> extends MotionProps {}
  export interface SVGMotionProps<T> extends MotionProps {}
}

