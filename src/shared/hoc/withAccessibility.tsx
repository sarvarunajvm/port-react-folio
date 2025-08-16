/**
 * Accessibility HOC
 * Enhances components with accessibility features
 */
import { ComponentType, useEffect, useRef, useState } from 'react';

import { useKeyPress } from '../hooks/useKeyPress';

interface WithAccessibilityOptions {
  role?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  enableKeyboardNavigation?: boolean;
  enableScreenReaderAnnouncements?: boolean;
  enableFocusManagement?: boolean;
  enableSkipLinks?: boolean;
  focusTrapEnabled?: boolean;
  announceOnMount?: string;
  announceOnChange?: (props: unknown) => string | null;
}

interface AccessibilityContext {
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void;
  setFocusTrap: (enabled: boolean) => void;
  navigateToElement: (direction: 'next' | 'previous') => void;
}

// Screen reader announcer
class ScreenReaderAnnouncer {
  private liveRegion: HTMLDivElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.createLiveRegion();
    }
  }

  private createLiveRegion(): void {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';
    document.body.appendChild(this.liveRegion);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) return;

    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = '';
      }
    }, 1000);
  }

  destroy(): void {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }
}

const announcer = new ScreenReaderAnnouncer();

export function withAccessibility<P extends object>(
  Component: ComponentType<P>,
  options: WithAccessibilityOptions = {}
): ComponentType<P> {
  const {
    role,
    ariaLabel,
    ariaDescribedBy,
    enableKeyboardNavigation = true,
    enableScreenReaderAnnouncements = true,
    enableFocusManagement = true,
    enableSkipLinks = false,
    focusTrapEnabled = false,
    announceOnMount,
    announceOnChange,
  } = options;

  const componentName = Component.displayName || Component.name || 'Unknown';

  const AccessibilityWrappedComponent = (props: P) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusTrap, setFocusTrap] = useState(focusTrapEnabled);
    const [, setSkipLinkVisible] = useState(false);
    const previousPropsRef = useRef<P>(props);

    // Keyboard navigation
    const escapePressed = useKeyPress({ targetKey: 'Escape' });
    // const tabPressed = useKeyPress({ targetKey: 'Tab' });
    // const enterPressed = useKeyPress({ targetKey: 'Enter' });
    // const spacePressed = useKeyPress({ targetKey: ' ' });

    // Arrow key navigation
    const upPressed = useKeyPress({ targetKey: 'ArrowUp' });
    const downPressed = useKeyPress({ targetKey: 'ArrowDown' });
    const leftPressed = useKeyPress({ targetKey: 'ArrowLeft' });
    const rightPressed = useKeyPress({ targetKey: 'ArrowRight' });

    // Focus management
    useEffect(() => {
      if (!enableFocusManagement || !containerRef.current) return;

      const container = containerRef.current;
      const focusableElements = container.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      // Set initial focus
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (focusTrap) {
        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        };

        container.addEventListener('keydown', handleTabKey);
        return () => container.removeEventListener('keydown', handleTabKey);
      }
    }, [focusTrap, enableFocusManagement]);

    // Screen reader announcements
    useEffect(() => {
      if (!enableScreenReaderAnnouncements) return;

      // Announce on mount
      if (announceOnMount) {
        announcer.announce(announceOnMount);
      }

      // Announce on prop changes
      if (announceOnChange) {
        const message = announceOnChange(props);
        if (message && JSON.stringify(props) !== JSON.stringify(previousPropsRef.current)) {
          announcer.announce(message);
        }
      }

      previousPropsRef.current = props;
    }, [props, announceOnMount, announceOnChange, enableScreenReaderAnnouncements]);

    // Keyboard navigation handlers
    useEffect(() => {
      if (!enableKeyboardNavigation || !containerRef.current) return;

      const navigateElements = (direction: 'next' | 'previous') => {
        const focusableElements = Array.from(
          containerRef.current!.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

        let nextIndex: number;
        if (direction === 'next') {
          nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1;
        } else {
          nextIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1;
        }

        focusableElements[nextIndex]?.focus();
      };

      if (upPressed || leftPressed) {
        navigateElements('previous');
      }
      if (downPressed || rightPressed) {
        navigateElements('next');
      }
    }, [upPressed, downPressed, leftPressed, rightPressed, enableKeyboardNavigation]);

    // Escape key handler
    useEffect(() => {
      if (escapePressed && focusTrap) {
        setFocusTrap(false);
        announcer.announce('Focus trap disabled');
      }
    }, [escapePressed, focusTrap]);

    // Context value
    const contextValue: AccessibilityContext = {
      announceMessage: (message, priority) => {
        if (enableScreenReaderAnnouncements) {
          announcer.announce(message, priority);
        }
      },
      setFocusTrap,
      navigateToElement: () => {
        // Implementation for element navigation
      },
    };

    // Skip link component
    const SkipLink = enableSkipLinks ? (
      <a
        href="#main-content"
        className={`
          absolute top-0 left-0 p-2 bg-[var(--accent)] text-white
          transform -translate-y-full focus:translate-y-0
          transition-transform duration-200 z-50
        `}
        onFocus={() => setSkipLinkVisible(true)}
        onBlur={() => setSkipLinkVisible(false)}
      >
        Skip to main content
      </a>
    ) : null;

    return (
      <div
        ref={containerRef}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className="relative"
        data-accessibility-enhanced="true"
      >
        {SkipLink}
        <Component {...props} accessibility={contextValue} />
      </div>
    );
  };

  AccessibilityWrappedComponent.displayName = `withAccessibility(${componentName})`;

  return AccessibilityWrappedComponent;
}

// Accessibility utilities
export const a11yUtils = {
  // Generate unique IDs for ARIA attributes
  generateId: (prefix: string = 'a11y'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Check if element is visible to screen readers
  isScreenReaderVisible: (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      element.getAttribute('aria-hidden') !== 'true'
    );
  },

  // Get accessible name of element
  getAccessibleName: (element: HTMLElement): string => {
    return (
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent ||
      ''
    );
  },

  // Focus management utilities
  focusUtils: {
    saveFocus: (): HTMLElement | null => {
      return document.activeElement as HTMLElement;
    },

    restoreFocus: (element: HTMLElement | null): void => {
      if (element && typeof element.focus === 'function') {
        element.focus();
      }
    },

    getFocusableElements: (container: HTMLElement): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), ' +
            'textarea:not([disabled]), select:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];
    },
  },
};
