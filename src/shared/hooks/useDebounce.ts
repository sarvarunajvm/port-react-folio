/**
 * Debounce Hook with Cancellation Support
 * Optimizes performance by delaying function execution
 */
import { useCallback, useEffect, useRef } from 'react';

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
  options: DebounceOptions = {}
): [T, () => void] {
  const { leading = false, trailing = true, maxWait } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number | null>(null);
  const lastInvokeTimeRef = useRef<number>(0);
  const argsRef = useRef<Parameters<T> | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
    lastCallTimeRef.current = null;
  }, []);

  const invoke = useCallback(() => {
    if (argsRef.current) {
      callback(...argsRef.current);
      lastInvokeTimeRef.current = Date.now();
      argsRef.current = null;
    }
  }, [callback]);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      argsRef.current = args;
      const now = Date.now();
      const isFirstCall = !lastCallTimeRef.current;
      lastCallTimeRef.current = now;

      const invokeLeading = () => {
        if (leading && isFirstCall) {
          invoke();
        }
      };

      const remainingWait = () => {
        const timeSinceLastCall = now - (lastCallTimeRef.current || 0);
        const timeSinceLastInvoke = now - lastInvokeTimeRef.current;
        const timeWaiting = delay - timeSinceLastCall;

        return maxWait !== undefined
          ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      };

      const shouldInvoke = () => {
        return (
          trailing &&
          argsRef.current !== null &&
          (!maxWait || now - lastInvokeTimeRef.current >= maxWait)
        );
      };

      const trailingEdge = () => {
        if (shouldInvoke()) {
          invoke();
        }
        cancel();
      };

      cancel();
      invokeLeading();

      const wait = remainingWait();
      if (wait > 0) {
        timeoutRef.current = setTimeout(trailingEdge, wait);
      }

      if (maxWait !== undefined && !maxTimeoutRef.current) {
        maxTimeoutRef.current = setTimeout(() => {
          invoke();
          cancel();
        }, maxWait);
      }
    }) as T,
    [callback, delay, leading, trailing, maxWait, invoke, cancel]
  );

  useEffect(() => {
    return cancel;
  }, [cancel]);

  return [debouncedCallback, cancel];
}
