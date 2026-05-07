'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

export function CinematicShell({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const progressFrameRef = useRef(0);
  const renderedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };

    updateMotionPreference();
    media.addEventListener('change', updateMotionPreference);
    return () => media.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const renderProgress = () => {
      progressFrameRef.current = 0;
      const ease = reducedMotionRef.current ? 1 : 0.16;
      renderedProgressRef.current += (targetProgressRef.current - renderedProgressRef.current) * ease;
      progressRef.current?.style.setProperty('--scroll-progress', renderedProgressRef.current.toFixed(4));

      if (Math.abs(targetProgressRef.current - renderedProgressRef.current) > 0.001) {
        progressFrameRef.current = window.requestAnimationFrame(renderProgress);
      }
    };

    const scheduleProgressRender = () => {
      if (progressFrameRef.current) return;
      progressFrameRef.current = window.requestAnimationFrame(renderProgress);
    };

    const updateProgressTarget = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = scrollable > 0 ? window.scrollY / scrollable : 0;
      scheduleProgressRender();
    };

    const updateProgress = () => {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(updateProgressTarget);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.cancelAnimationFrame(progressFrameRef.current);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let settleTimer = 0;

    const scrollToPosition = (top: number, behavior: ScrollBehavior) => {
      const immediate = reducedMotionRef.current || behavior === 'auto';
      const lenis = lenisRef.current?.lenis;

      if (lenis) {
        lenis.scrollTo(top, {
          immediate,
          duration: immediate ? 0 : 1.1,
        });
        return;
      }

      window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
    };

    const scrollToCurrentHash = (behavior: ScrollBehavior) => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      if (id === 'top') {
        scrollToPosition(0, behavior);
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
      scrollToPosition(top, behavior);
    };

    const scheduleHashScroll = (behavior: ScrollBehavior = 'auto') => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => scrollToCurrentHash(behavior));
    };

    scheduleHashScroll();
    settleTimer = window.setTimeout(scheduleHashScroll, 2050);
    const handleHashChange = () => scheduleHashScroll('smooth');
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: reducedMotion ? 1 : 0.075,
        duration: reducedMotion ? 0 : 1.35,
        smoothWheel: !reducedMotion,
      }}
    >
      <div ref={progressRef} className="scroll-progress" />
      {children}
    </ReactLenis>
  );
}
