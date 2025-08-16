/**
 * Advanced Intersection Observer Hook
 * Provides viewport visibility detection with performance optimizations
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
  onChange?: (entry: IntersectionObserverEntry) => void;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
    initialIsIntersecting = false,
    onChange,
  } = options;

  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
  const frozen = useRef(false);

  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (frozen.current && !entry.isIntersecting) {
        return;
      }

      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);

      if (onChange) {
        onChange(entry);
      }

      if (entry.isIntersecting && freezeOnceVisible) {
        frozen.current = true;
      }
    },
    [freezeOnceVisible, onChange]
  );

  useEffect(() => {
    const element = ref.current;

    if (!element || frozen.current) {
      return;
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, updateEntry]);

  return { ref, isIntersecting, entry };
}
