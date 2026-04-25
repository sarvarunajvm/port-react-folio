'use client';

import { motion, type Easing } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function getViewportProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const start = window.innerHeight * 0.92;
  const end = window.innerHeight * 0.34;
  return clamp((start - rect.top) / (start - end));
};

export default function BlurText({
  text = '',
  delay = 140,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.18,
  rootMargin = '0px 0px -8% 0px',
  animationFrom,
  animationTo,
  easing = [0.16, 1, 0.3, 1],
  onAnimationComplete,
  stepDuration = 0.42,
  as = 'p',
}: BlurTextProps) {
  const elements = useMemo(() => (animateBy === 'words' ? text.split(' ') : text.split('')), [animateBy, text]);
  const ref = useRef<HTMLElement>(null);
  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);
  const completedRef = useRef(false);
  const setElementRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    if (!ref.current) return;

    let frame = 0;
    const observedElement = ref.current;
    const scrubHero = observedElement.closest<HTMLElement>('.scrub-hero');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staggerRange = animateBy === 'letters' ? 0.56 : 0.42;
    const revealWindow = Math.max(0.32, 1 - staggerRange);
    const directionOffset = direction === 'top' ? -28 : 28;

    const update = () => {
      const scrollProgress = scrubHero
        ? clamp(Number.parseFloat(getComputedStyle(scrubHero).getPropertyValue('--scrub-content')) || 0)
        : getViewportProgress(observedElement);

      spansRef.current.forEach((span, index) => {
        if (!span) return;

        const stagger = elements.length > 1 ? (index / (elements.length - 1)) * staggerRange : 0;
        const localProgress = reducedMotion ? 1 : clamp((scrollProgress - stagger) / revealWindow);
        const eased = easeOut(localProgress);
        const y = (1 - eased) * directionOffset;
        const blur = (1 - eased) * 18;

        span.style.opacity = String(eased);
        span.style.filter = `blur(${blur.toFixed(2)}px)`;
        span.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });

      if (!completedRef.current && scrollProgress >= 0.995) {
        completedRef.current = true;
        onAnimationComplete?.();
      }

      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [animateBy, delay, direction, elements.length, onAnimationComplete, rootMargin, stepDuration, threshold]);

  const MotionTag = useMemo(() => motion.create(as), [as]);

  const children = elements.map((segment, index) => {
    return (
      <span
        key={`${segment}-${index}`}
        ref={(node) => {
          spansRef.current[index] = node;
        }}
        style={{
          display: 'inline-block',
          opacity: 0,
          filter: 'blur(18px)',
          transform: `translate3d(0, ${direction === 'top' ? -28 : 28}px, 0)`,
          willChange: 'transform, filter, opacity',
        }}
      >
        {segment === ' ' ? '\u00A0' : segment}
        {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : null}
      </span>
    );
  });

  return (
    <MotionTag ref={setElementRef} className={`blur-text ${className}`} aria-label={text}>
      {children}
    </MotionTag>
  );
}
