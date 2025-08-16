/**
 * Local Storage Hook with SSR Support
 * Provides persistent state management with type safety
 */
import { useCallback, useEffect, useState } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  syncData?: boolean;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse, syncData = true } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore));

          if (syncData) {
            window.dispatchEvent(
              new CustomEvent('local-storage', {
                detail: { key, value: valueToStore },
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue, syncData]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);

        if (syncData) {
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: { key, value: null },
            })
          );
        }
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, syncData]);

  useEffect(() => {
    if (!syncData || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(deserializer(event.newValue));
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      'local-storage' as keyof WindowEventMap,
      handleCustomEvent as EventListener
    );

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'local-storage' as keyof WindowEventMap,
        handleCustomEvent as EventListener
      );
    };
  }, [key, deserializer, syncData]);

  return [storedValue, setValue, removeValue];
}
