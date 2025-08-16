/**
 * Performance Monitoring Hook
 * Tracks component render performance and provides optimization insights
 */
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  renderTime: number;
  averageRenderTime: number;
  maxRenderTime: number;
  minRenderTime: number;
  lastRenderTimestamp: number;
}

interface UsePerformanceMonitorOptions {
  componentName: string;
  enableLogging?: boolean;
  warnThreshold?: number;
  trackProps?: boolean;
}

export function usePerformanceMonitor(options: UsePerformanceMonitorOptions): PerformanceMetrics {
  const {
    componentName,
    enableLogging = process.env.NODE_ENV === 'development',
    warnThreshold = 16, // 16ms for 60fps
    trackProps = false,
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({
    renderCount: 0,
    renderTime: 0,
    averageRenderTime: 0,
    maxRenderTime: 0,
    minRenderTime: Infinity,
    lastRenderTimestamp: 0,
  });

  const renderStartRef = useRef<number>(0);
  const previousPropsRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    const renderEnd = performance.now();
    const renderTime = renderEnd - renderStartRef.current;
    const metrics = metricsRef.current;

    metrics.renderCount++;
    metrics.renderTime = renderTime;
    metrics.lastRenderTimestamp = renderEnd;

    metrics.averageRenderTime =
      (metrics.averageRenderTime * (metrics.renderCount - 1) + renderTime) / metrics.renderCount;

    metrics.maxRenderTime = Math.max(metrics.maxRenderTime, renderTime);
    metrics.minRenderTime = Math.min(metrics.minRenderTime, renderTime);

    if (enableLogging) {
      const logData: Record<string, unknown> = {
        component: componentName,
        renderCount: metrics.renderCount,
        renderTime: `${renderTime.toFixed(2)}ms`,
        average: `${metrics.averageRenderTime.toFixed(2)}ms`,
      };

      if (trackProps) {
        logData.propsChanged = Object.keys(previousPropsRef.current).filter(
          (key) =>
            previousPropsRef.current[key] !== (options as unknown as Record<string, unknown>)[key]
        );
      }

      if (renderTime > warnThreshold) {
        console.warn(`⚠️ Slow render detected in ${componentName}:`, logData);
      } else if (metrics.renderCount % 10 === 0) {
        console.log(`📊 Performance metrics for ${componentName}:`, logData);
      }
    }

    if (trackProps) {
      previousPropsRef.current = { ...options };
    }
  });

  return metricsRef.current;
}
