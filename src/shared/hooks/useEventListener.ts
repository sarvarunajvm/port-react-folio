/**
 * Event Listener Hook
 * Manages event listeners with automatic cleanup
 */
import { useEffect, useRef } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: HTMLElement | Window | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: HTMLElement | Window | null,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: HTMLElement | Window | null,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element ?? window;

    if (!targetElement?.addEventListener) {
      return;
    }

    const eventListener = (event: Event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
