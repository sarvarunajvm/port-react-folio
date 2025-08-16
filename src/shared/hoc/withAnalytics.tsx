/**
 * Analytics HOC
 * Tracks component interactions and user behavior
 */
import React, { ComponentType, useEffect, useRef } from 'react';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

interface WithAnalyticsOptions {
  trackMount?: boolean;
  trackUnmount?: boolean;
  trackVisibility?: boolean;
  trackClicks?: boolean;
  trackHover?: boolean;
  trackFocus?: boolean;
  visibilityThreshold?: number;
  eventPrefix?: string;
  customEvents?: Record<string, (props: unknown) => AnalyticsEvent | null>;
}

// Analytics service - replace with actual implementation (GA, Mixpanel, etc.)
class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  track(event: AnalyticsEvent): void {
    const enrichedEvent = {
      ...event,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.events.push(enrichedEvent);

    // Send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(enrichedEvent);
    } else {
      console.log('📊 Analytics Event:', enrichedEvent);
    }
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // Implementation for actual analytics service
    // Example: Google Analytics
    if (
      typeof window !== 'undefined' &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events = [];
  }
}

const analyticsService = new AnalyticsService();

export function withAnalytics<P extends object>(
  Component: ComponentType<P>,
  options: WithAnalyticsOptions = {}
): ComponentType<P> {
  const {
    trackMount = true,
    trackUnmount = false,
    trackVisibility = false,
    trackClicks = false,
    trackHover = false,
    trackFocus = false,
    visibilityThreshold = 0.5,
    eventPrefix = '',
    customEvents = {},
  } = options;

  const componentName = Component.displayName || Component.name || 'Unknown';
  const eventCategory = eventPrefix ? `${eventPrefix}_${componentName}` : componentName;

  const AnalyticsWrappedComponent = (props: P) => {
    const mountTimeRef = useRef<number>(Date.now());
    const hoverTimeRef = useRef<number | null>(null);
    const hasTrackedVisibilityRef = useRef(false);

    // Track visibility
    const { ref: visibilityRef } = useIntersectionObserver<HTMLDivElement>({
      threshold: visibilityThreshold,
      freezeOnceVisible: true,
      onChange: (entry) => {
        if (trackVisibility && entry.isIntersecting && !hasTrackedVisibilityRef.current) {
          hasTrackedVisibilityRef.current = true;
          analyticsService.track({
            category: eventCategory,
            action: 'view',
            label: 'component_visible',
            value: Date.now() - mountTimeRef.current,
            timestamp: Date.now(),
          });
        }
      },
    });

    // Track mount
    useEffect(() => {
      if (trackMount) {
        analyticsService.track({
          category: eventCategory,
          action: 'mount',
          label: 'component_mounted',
          timestamp: Date.now(),
        });
      }

      // Track custom events
      Object.entries(customEvents).forEach(([, eventGenerator]) => {
        const event = eventGenerator(props);
        if (event) {
          analyticsService.track({
            ...event,
            category: eventCategory,
            timestamp: Date.now(),
          });
        }
      });

      return () => {
        if (trackUnmount) {
          const mountTime = mountTimeRef.current;
          const mountDuration = Date.now() - mountTime;
          analyticsService.track({
            category: eventCategory,
            action: 'unmount',
            label: 'component_unmounted',
            value: mountDuration,
            timestamp: Date.now(),
          });
        }
      };
    }, []);

    // Event handlers
    const handleClick = (e: React.MouseEvent) => {
      if (trackClicks) {
        analyticsService.track({
          category: eventCategory,
          action: 'click',
          label: (e.target as HTMLElement).tagName,
          metadata: {
            x: e.clientX,
            y: e.clientY,
          },
          timestamp: Date.now(),
        });
      }
    };

    const handleMouseEnter = () => {
      if (trackHover) {
        hoverTimeRef.current = Date.now();
      }
    };

    const handleMouseLeave = () => {
      if (trackHover && hoverTimeRef.current) {
        const hoverDuration = Date.now() - hoverTimeRef.current;
        analyticsService.track({
          category: eventCategory,
          action: 'hover',
          label: 'component_hover',
          value: hoverDuration,
          timestamp: Date.now(),
        });
        hoverTimeRef.current = null;
      }
    };

    const handleFocus = () => {
      if (trackFocus) {
        analyticsService.track({
          category: eventCategory,
          action: 'focus',
          label: 'component_focused',
          timestamp: Date.now(),
        });
      }
    };

    const handleBlur = () => {
      if (trackFocus) {
        analyticsService.track({
          category: eventCategory,
          action: 'blur',
          label: 'component_blurred',
          timestamp: Date.now(),
        });
      }
    };

    const wrapperProps: Record<string, unknown> = {};

    if (trackVisibility) {
      wrapperProps.ref = visibilityRef;
    }
    if (trackClicks) {
      wrapperProps.onClick = handleClick;
    }
    if (trackHover) {
      wrapperProps.onMouseEnter = handleMouseEnter;
      wrapperProps.onMouseLeave = handleMouseLeave;
    }
    if (trackFocus) {
      wrapperProps.onFocus = handleFocus;
      wrapperProps.onBlur = handleBlur;
    }

    return (
      <div {...wrapperProps} style={{ display: 'contents' }}>
        <Component {...props} />
      </div>
    );
  };

  AnalyticsWrappedComponent.displayName = `withAnalytics(${componentName})`;

  return AnalyticsWrappedComponent;
}

// Export analytics service for direct use
export { analyticsService };
