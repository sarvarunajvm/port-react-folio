'use client';

import { useEffect } from 'react';

const surfaceSelector = [
  '.metric-card',
  '.proof-card',
  '.capability-card',
  '.project-card',
  '.timeline-item',
  '.oss-list article',
  '.contact-section',
  '.contact-portrait',
].join(', ');

const pressSelector = [
  '.button',
  '.project-links a',
  '.oss-links a',
  '.sm-socials-link',
].join(', ');

const revealSelector = [
  '.section-heading',
  '.metric-card',
  '.proof-card',
  '.capability-card',
  '.project-card',
  '.timeline-item',
  '.oss-list article',
  '.stack-strip',
  '.contact-copy',
  '.contact-portrait',
].join(', ');

type SurfaceState = {
  active: boolean;
  x: number;
  y: number;
  rx: number;
  ry: number;
  targetX: number;
  targetY: number;
  targetRx: number;
  targetRy: number;
};

type PressState = {
  active: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function resetSurfaceVars(surface: HTMLElement) {
  surface.style.setProperty('--mx', '50%');
  surface.style.setProperty('--my', '50%');
  surface.style.setProperty('--rx', '0deg');
  surface.style.setProperty('--ry', '0deg');
}

function resetPressableVars(pressable: HTMLElement) {
  pressable.style.setProperty('--magnet-x', '0px');
  pressable.style.setProperty('--magnet-y', '0px');
}

export function MicroInteractions() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return;

    const surfaceStates = new Map<HTMLElement, SurfaceState>();
    const pressStates = new Map<HTMLElement, PressState>();
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector)).filter(
      (target) => !target.closest('.scrub-hero'),
    );
    let activeSurface: HTMLElement | null = null;
    let activePressable: HTMLElement | null = null;
    let frame = 0;

    const getSurfaceState = (surface: HTMLElement) => {
      const existing = surfaceStates.get(surface);
      if (existing) return existing;

      const state: SurfaceState = {
        active: false,
        x: 50,
        y: 50,
        rx: 0,
        ry: 0,
        targetX: 50,
        targetY: 50,
        targetRx: 0,
        targetRy: 0,
      };

      surfaceStates.set(surface, state);
      return state;
    };

    const getPressState = (pressable: HTMLElement) => {
      const existing = pressStates.get(pressable);
      if (existing) return existing;

      const state: PressState = {
        active: false,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
      };

      pressStates.set(pressable, state);
      return state;
    };

    const settleSurface = (surface: HTMLElement) => {
      const state = getSurfaceState(surface);
      state.active = false;
      state.targetX = 50;
      state.targetY = 50;
      state.targetRx = 0;
      state.targetRy = 0;
    };

    const settlePressable = (pressable: HTMLElement) => {
      const state = getPressState(pressable);
      state.active = false;
      state.targetX = 0;
      state.targetY = 0;
    };

    const scheduleFrame = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    const tick = () => {
      let needsFrame = false;
      frame = 0;

      surfaceStates.forEach((state, surface) => {
        const ease = state.active ? 0.18 : 0.12;

        state.x += (state.targetX - state.x) * ease;
        state.y += (state.targetY - state.y) * ease;
        state.rx += (state.targetRx - state.rx) * ease;
        state.ry += (state.targetRy - state.ry) * ease;

        surface.style.setProperty('--mx', `${state.x.toFixed(2)}%`);
        surface.style.setProperty('--my', `${state.y.toFixed(2)}%`);
        surface.style.setProperty('--rx', `${state.rx.toFixed(2)}deg`);
        surface.style.setProperty('--ry', `${state.ry.toFixed(2)}deg`);

        const settled =
          Math.abs(state.targetX - state.x) < 0.04 &&
          Math.abs(state.targetY - state.y) < 0.04 &&
          Math.abs(state.targetRx - state.rx) < 0.02 &&
          Math.abs(state.targetRy - state.ry) < 0.02;

        if (!state.active && settled) {
          resetSurfaceVars(surface);
          surfaceStates.delete(surface);
        } else if (!settled) {
          needsFrame = true;
        }
      });

      pressStates.forEach((state, pressable) => {
        const ease = state.active ? 0.2 : 0.14;

        state.x += (state.targetX - state.x) * ease;
        state.y += (state.targetY - state.y) * ease;

        pressable.style.setProperty('--magnet-x', `${state.x.toFixed(2)}px`);
        pressable.style.setProperty('--magnet-y', `${state.y.toFixed(2)}px`);

        const settled = Math.abs(state.targetX - state.x) < 0.03 && Math.abs(state.targetY - state.y) < 0.03;

        if (!state.active && settled) {
          resetPressableVars(pressable);
          pressStates.delete(pressable);
        } else if (!settled) {
          needsFrame = true;
        }
      });

      if (needsFrame) scheduleFrame();
    };

    const updateSurface = (surface: HTMLElement, event: PointerEvent) => {
      const rect = surface.getBoundingClientRect();
      const localX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const localY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const state = getSurfaceState(surface);

      state.active = true;
      state.targetX = localX * 100;
      state.targetY = localY * 100;
      state.targetRx = (0.5 - localY) * 1.2;
      state.targetRy = (localX - 0.5) * -1.4;
    };

    const updatePressable = (pressable: HTMLElement, event: PointerEvent) => {
      const rect = pressable.getBoundingClientRect();
      const localX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const localY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      const strength = pressable.matches('.button') ? 1.8 : 1.2;
      const state = getPressState(pressable);

      state.active = true;
      state.targetX = (localX - 0.5) * strength;
      state.targetY = (localY - 0.5) * strength * 0.72;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

      const target = event.target as Element | null;
      const nextSurface = target?.closest<HTMLElement>(surfaceSelector) ?? null;
      const nextPressable = target?.closest<HTMLElement>(pressSelector) ?? null;

      if (nextSurface !== activeSurface) {
        if (activeSurface) settleSurface(activeSurface);
        activeSurface = nextSurface;
      }

      if (nextPressable !== activePressable) {
        if (activePressable) settlePressable(activePressable);
        activePressable = nextPressable;
      }

      if (activeSurface) updateSurface(activeSurface, event);
      if (activePressable) updatePressable(activePressable, event);
      if (activeSurface || activePressable) scheduleFrame();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

      const surface = (event.target as Element | null)?.closest<HTMLElement>(surfaceSelector);
      const nextTarget = event.relatedTarget as Element | null;

      if (surface && (!nextTarget || !surface.contains(nextTarget))) {
        settleSurface(surface);
        if (surface === activeSurface) activeSurface = null;
        scheduleFrame();
      }

      const pressable = (event.target as Element | null)?.closest<HTMLElement>(pressSelector);
      if (pressable && (!nextTarget || !pressable.contains(nextTarget))) {
        settlePressable(pressable);
        if (pressable === activePressable) activePressable = null;
        scheduleFrame();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const pressed = (event.target as Element | null)?.closest<HTMLElement>(pressSelector);
      if (!pressed) return;

      const rect = pressed.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'micro-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      pressed.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 720);
    };

    let revealObserver: IntersectionObserver;
    const revealTimers: number[] = [];
    let revealFrame = 0;

    const revealTarget = (target: HTMLElement) => {
      target.dataset.reveal = 'in';
      revealObserver.unobserve(target);
    };

    const revealVisibleTargets = () => {
      revealTargets.forEach((target) => {
        if (target.dataset.reveal !== 'pending') return;

        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > window.innerHeight * -0.08) {
          revealTarget(target);
        }
      });
    };

    const syncHashTarget = () => {
      const rawHash = window.location.hash.slice(1);
      if (!rawHash) {
        revealVisibleTargets();
        return;
      }

      let targetId = rawHash;
      try {
        targetId = decodeURIComponent(rawHash);
      } catch {
        targetId = rawHash;
      }
      const target = document.getElementById(targetId);
      if (!target) {
        revealVisibleTargets();
        return;
      }

      target.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
      revealVisibleTargets();
    };

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealTarget(entry.target as HTMLElement);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.16 },
    );

    revealTargets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--reveal-delay', `${Math.min(index % 7, 6) * 45}ms`);

      if (rect.top < window.innerHeight * 0.92) {
        target.dataset.reveal = 'in';
      } else {
        target.dataset.reveal = 'pending';
        revealObserver.observe(target);
      }
    });

    revealFrame = window.requestAnimationFrame(syncHashTarget);
    revealTimers.push(window.setTimeout(revealVisibleTargets, 160));
    revealTimers.push(window.setTimeout(syncHashTarget, 360));
    revealTimers.push(window.setTimeout(revealVisibleTargets, 640));

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('hashchange', syncHashTarget);
    window.addEventListener('scroll', revealVisibleTargets, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      revealTimers.forEach((timer) => window.clearTimeout(timer));
      revealObserver.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('hashchange', syncHashTarget);
      window.removeEventListener('scroll', revealVisibleTargets);
      revealTargets.forEach((target) => {
        delete target.dataset.reveal;
        target.style.removeProperty('--reveal-delay');
      });
    };
  }, []);

  return null;
}
