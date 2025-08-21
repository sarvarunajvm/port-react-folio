import React, { useEffect, useState, useRef } from 'react';
import { Text } from '@radix-ui/themes';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  style = {},
  decimals = 0,
}) => {
  const [currentValue, setCurrentValue] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const animateCounter = () => {
    const startTime = performance.now();
    const difference = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + difference * easeOutQuart;

      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatValue = (value: number) => {
    return value.toFixed(decimals);
  };

  return (
    <Text 
      as="span" 
      ref={elementRef} 
      className={className} 
      style={style}
    >
      {prefix}
      {formatValue(currentValue)}
      {suffix}
    </Text>
  );
};

export default AnimatedCounter;