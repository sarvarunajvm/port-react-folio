/**
 * Key Press Hook
 * Detects keyboard key presses with modifier support
 */
import { useCallback, useEffect, useState } from 'react';

interface KeyPressOptions {
  targetKey: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
}

export function useKeyPress(options: KeyPressOptions): boolean {
  const {
    targetKey,
    ctrlKey = false,
    shiftKey = false,
    altKey = false,
    metaKey = false,
    preventDefault = false,
    onKeyDown,
    onKeyUp,
  } = options;

  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchesKey = event.key === targetKey || event.code === targetKey;
      const matchesModifiers =
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey &&
        event.altKey === altKey &&
        event.metaKey === metaKey;

      if (matchesKey && matchesModifiers) {
        if (preventDefault) {
          event.preventDefault();
        }
        setKeyPressed(true);
        onKeyDown?.(event);
      }
    },
    [targetKey, ctrlKey, shiftKey, altKey, metaKey, preventDefault, onKeyDown]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const matchesKey = event.key === targetKey || event.code === targetKey;

      if (matchesKey) {
        setKeyPressed(false);
        onKeyUp?.(event);
      }
    },
    [targetKey, onKeyUp]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keyPressed;
}
