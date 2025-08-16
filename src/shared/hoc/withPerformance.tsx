/**
 * Performance Monitoring HOC
 * Tracks and optimizes component performance
 */
import React, { ComponentType, Profiler, ProfilerOnRenderCallback, memo, useMemo } from 'react';

// import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

interface PerformanceMetrics {
  id: string;
  phase: 'mount' | 'update' | 'nested-update';
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<unknown>;
}

interface WithPerformanceOptions {
  enableProfiling?: boolean;
  warnThreshold?: number;
  memoize?: boolean;
  trackProps?: boolean;
  reportTo?: (metrics: PerformanceMetrics) => void;
}

const performanceStore = new Map<string, PerformanceMetrics[]>();

export function withPerformance<P extends object>(
  Component: ComponentType<P>,
  options: WithPerformanceOptions = {}
): ComponentType<P> {
  const {
    enableProfiling = process.env.NODE_ENV === 'development',
    warnThreshold = 16, // 16ms for 60fps
    memoize = true,
    // trackProps = false,
    reportTo,
  } = options;

  const componentName = Component.displayName || Component.name || 'Unknown';

  const onRender: ProfilerOnRenderCallback = (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    const metrics: PerformanceMetrics = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions: new Set(),
    };

    // Store metrics
    if (!performanceStore.has(id)) {
      performanceStore.set(id, []);
    }
    performanceStore.get(id)!.push(metrics);

    // Report to external service
    if (reportTo) {
      reportTo(metrics);
    }

    // Warn about slow renders
    if (actualDuration > warnThreshold) {
      console.warn(`⚠️ Slow ${phase} detected in ${id}:`, {
        duration: `${actualDuration.toFixed(2)}ms`,
        threshold: `${warnThreshold}ms`,
        timestamp: new Date(commitTime).toISOString(),
      });
    }

    // Log detailed metrics in development
    if (process.env.NODE_ENV === 'development' && actualDuration > warnThreshold / 2) {
      console.log(`📊 Performance metrics for ${id}:`, {
        phase,
        actualDuration: `${actualDuration.toFixed(2)}ms`,
        baseDuration: `${baseDuration.toFixed(2)}ms`,
        renderTime: `${(commitTime - startTime).toFixed(2)}ms`,
      });
    }
  };

  const PerformanceWrappedComponent = (props: P) => {
    // Use performance monitoring hook
    // const metrics = usePerformanceMonitor({
    //   componentName,
    //   enableLogging: enableProfiling,
    //   warnThreshold,
    //   trackProps,
    // });

    // Memoize component if requested
    const MemoizedComponent = useMemo(
      () => (memoize ? memo(Component as ComponentType<P>) : Component),
      []
    ) as ComponentType<P>;

    if (!enableProfiling) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <MemoizedComponent {...(props as any)} />;
    }

    return (
      <Profiler id={componentName} onRender={onRender}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MemoizedComponent {...(props as any)} />
      </Profiler>
    );
  };

  PerformanceWrappedComponent.displayName = `withPerformance(${componentName})`;

  return PerformanceWrappedComponent;
}

// Utility function to get performance metrics
export function getPerformanceMetrics(componentId: string): PerformanceMetrics[] | undefined {
  return performanceStore.get(componentId);
}

// Utility function to clear performance metrics
export function clearPerformanceMetrics(componentId?: string): void {
  if (componentId) {
    performanceStore.delete(componentId);
  } else {
    performanceStore.clear();
  }
}

// Performance optimization utilities
export const performanceUtils = {
  shouldComponentUpdate<P extends object>(prevProps: P, nextProps: P, keys?: (keyof P)[]): boolean {
    const propsToCheck = keys || (Object.keys(prevProps) as (keyof P)[]);
    return propsToCheck.some((key) => prevProps[key] !== nextProps[key]);
  },

  measureRenderTime<T>(fn: () => T, label?: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    if (label) {
      console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
    }

    return result;
  },

  debounceRender<P extends object>(
    Component: ComponentType<P>,
    delay: number = 100
  ): ComponentType<P> {
    let timeoutId: NodeJS.Timeout;

    return (props: P) => {
      const [shouldRender, setShouldRender] = React.useState(true);

      React.useEffect(() => {
        clearTimeout(timeoutId);
        setShouldRender(false);

        timeoutId = setTimeout(() => {
          setShouldRender(true);
        }, delay);

        return () => clearTimeout(timeoutId);
      }, [props]);

      return shouldRender ? <Component {...props} /> : null;
    };
  },
};
