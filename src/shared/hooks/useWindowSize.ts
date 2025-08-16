/**
 * Window Size Hook
 * Tracks window dimensions with debounced updates
 */
import { useCallback, useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceDelay?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export function useWindowSize(options: UseWindowSizeOptions = {}): WindowSize {
  const { debounceDelay = 100, initialWidth = 0, initialHeight = 0 } = options;

  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') {
      return { width: initialWidth, height: initialHeight };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const [debouncedHandleResize] = useDebounce(handleResize, debounceDelay);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    handleResize();
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize, handleResize]);

  return windowSize;
}
