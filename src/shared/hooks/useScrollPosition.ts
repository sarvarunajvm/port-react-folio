/**
 * Scroll Position Hook
 * Tracks scroll position with performance optimizations
 */
import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'idle';
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number;
}

interface UseScrollPositionOptions {
  element?: HTMLElement | null;
  debounceDelay?: number;
  threshold?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { element, debounceDelay = 50, threshold = 0 } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'idle',
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    // const target = element || window;
    const scrollElement = element || document.documentElement;

    const currentScrollY = element
      ? element.scrollTop
      : window.pageYOffset || document.documentElement.scrollTop;

    const currentScrollX = element
      ? element.scrollLeft
      : window.pageXOffset || document.documentElement.scrollLeft;

    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = element
      ? element.clientHeight
      : window.innerHeight || document.documentElement.clientHeight;

    const isAtTop = currentScrollY <= threshold;
    const isAtBottom = currentScrollY + clientHeight >= scrollHeight - threshold;
    const progress = Math.min(currentScrollY / (scrollHeight - clientHeight), 1);

    let direction: 'up' | 'down' | 'idle' = 'idle';
    if (currentScrollY > lastScrollY + threshold) {
      direction = 'down';
    } else if (currentScrollY < lastScrollY - threshold) {
      direction = 'up';
    }

    setScrollPosition({
      x: currentScrollX,
      y: currentScrollY,
      direction,
      isAtTop,
      isAtBottom,
      progress,
    });

    setLastScrollY(currentScrollY);
  }, [element, lastScrollY, threshold]);

  const [debouncedHandleScroll] = useDebounce(handleScroll, debounceDelay);

  useEffect(() => {
    const target = element || window;

    handleScroll();
    target.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [element, debouncedHandleScroll, handleScroll]);

  return scrollPosition;
}
