/**
 * Fetch Hook with Advanced Features
 * HTTP requests with caching, retries, and cancellation
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  status: 'idle' | 'fetching' | 'success' | 'error';
}

interface FetchOptions extends Omit<RequestInit, 'cache'> {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  cache?: boolean;
  cacheTime?: number;
  onSuccess?: <T>(data: T) => void;
  onError?: (error: Error) => void;
}

const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useFetch<T = unknown>(
  url: string | null,
  options: FetchOptions = {}
): FetchState<T> & { refetch: () => Promise<void> } {
  const {
    retries = 0,
    retryDelay = 1000,
    timeout = 30000,
    cache: useCache = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    onSuccess,
    onError,
    ...fetchOptions
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
    status: 'idle',
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retriesRef = useRef(0);

  const fetchData = useCallback(async () => {
    if (!url) return;

    // Check cache
    if (useCache) {
      const cached = cache.get(url);
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        setState({
          data: cached.data as T,
          error: null,
          loading: false,
          status: 'success',
        });
        return;
      }
    }

    // Abort previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setState((prev) => ({
      ...prev,
      loading: true,
      status: 'fetching',
    }));

    // Set timeout
    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
    }, timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update cache
      if (useCache) {
        cache.set(url, { data, timestamp: Date.now() });
      }

      setState({
        data,
        error: null,
        loading: false,
        status: 'success',
      });

      onSuccess?.(data);
      retriesRef.current = 0;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return;
        }

        // Retry logic
        if (retriesRef.current < retries) {
          retriesRef.current++;
          setTimeout(() => fetchData(), retryDelay * retriesRef.current);
          return;
        }

        setState({
          data: null,
          error,
          loading: false,
          status: 'error',
        });

        onError?.(error);
      }
    }
  }, [url, fetchOptions, retries, retryDelay, timeout, useCache, cacheTime, onSuccess, onError]);

  const refetch = useCallback(async () => {
    retriesRef.current = 0;
    if (useCache && url) {
      cache.delete(url);
    }
    await fetchData();
  }, [fetchData, useCache, url]);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ...state, refetch };
}
