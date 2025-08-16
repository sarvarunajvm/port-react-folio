/**
 * Async Operations Hook
 * Manages async state with proper error handling and cancellation
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  isIdle: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseAsyncOptions {
  immediate?: boolean;
  onSuccess?: <T>(data: T) => void;
  onError?: (error: Error) => void;
}

export function useAsync<T = unknown>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    isIdle: true,
    isSuccess: false,
    isError: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setState({
      data: null,
      error: null,
      loading: true,
      isIdle: false,
      isSuccess: false,
      isError: false,
    });

    try {
      const data = await asyncFunction();

      if (isMountedRef.current && !abortControllerRef.current.signal.aborted) {
        setState({
          data,
          error: null,
          loading: false,
          isIdle: false,
          isSuccess: true,
          isError: false,
        });

        onSuccess?.(data);
      }

      return data;
    } catch (error) {
      if (isMountedRef.current && !abortControllerRef.current.signal.aborted) {
        const errorObj = error instanceof Error ? error : new Error(String(error));

        setState({
          data: null,
          error: errorObj,
          loading: false,
          isIdle: false,
          isSuccess: false,
          isError: true,
        });

        onError?.(errorObj);
      }

      throw error;
    }
  }, [asyncFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    setState({
      data: null,
      error: null,
      loading: false,
      isIdle: true,
      isSuccess: false,
      isError: false,
    });
  }, []);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setState((prev) => ({
      ...prev,
      loading: false,
    }));
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    execute,
    reset,
    cancel,
  };
}
