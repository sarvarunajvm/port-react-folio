'use client';

import { type SyntheticEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ButtonIcon, type ButtonIconName } from '@/components/ButtonIcon';

export type StaggeredMenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

type StaggeredMenuProps = {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  accentColor?: string;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

function getSocialIcon(label: string): ButtonIconName {
  const normalized = label.toLowerCase();
  if (normalized.includes('resume')) return 'resume';
  if (normalized.includes('github')) return 'github';
  if (normalized.includes('linkedin')) return 'linkedin';
  if (normalized.includes('email')) return 'email';
  return 'work';
}

function getExternalLinkProps(link: string) {
  return link.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}

export default function StaggeredMenu({
  position = 'right',
  colors = ['rgba(255,255,255,0.18)', 'rgba(0,0,0,0.94)'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#000000',
  changeMenuColorOnOpen = true,
  accentColor = '#ffffff',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const busyRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const iconTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const host = document.createElement('div');
    host.setAttribute('data-staggered-menu-host', '');
    document.body.appendChild(host);
    setPortalHost(host);
    setMounted(true);

    return () => {
      host.remove();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      const preLayers = preContainer
        ? (Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      gsap.set([plusHRef.current, plusVRef.current], { transformOrigin: '50% 50%' });
      gsap.set(plusHRef.current, { rotate: 0 });
      gsap.set(plusVRef.current, { rotate: 0 });
      gsap.set(textInnerRef.current, { yPercent: 0 });
      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemLabels = Array.from(panel.querySelectorAll('.sm-panel-item-label')) as HTMLElement[];
    const itemsWithNumbers = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    const offscreen = position === 'left' ? -100 : 100;

    gsap.set(itemLabels, { yPercent: 22, opacity: 0 });
    gsap.set(itemsWithNumbers, { '--sm-num-opacity': 0 });
    gsap.set(socialTitle, { opacity: 0 });
    gsap.set(socialLinks, { y: 8, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    const panelStart = 0;
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.34, ease: 'power2.out' }, panelStart);

    tl.to(
      itemLabels,
      { yPercent: 0, opacity: 1, duration: 0.26, ease: 'power2.out', stagger: 0.035 },
      panelStart + 0.08,
    );

    tl.to(
      itemsWithNumbers,
      { '--sm-num-opacity': 1, duration: 0.22, ease: 'power1.out', stagger: 0.025 },
      panelStart + 0.1,
    );

    tl.to(socialTitle, { opacity: 1, duration: 0.22, ease: 'power1.out' }, panelStart + 0.16);
    tl.to(
      socialLinks,
      { y: 0, opacity: 1, duration: 0.24, ease: 'power2.out', stagger: 0.03 },
      panelStart + 0.18,
    );

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const animateButton = useCallback(
    (opening: boolean) => {
      iconTweenRef.current?.kill();
      textTweenRef.current?.kill();
      colorTweenRef.current?.kill();

      iconTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(plusHRef.current, { rotate: opening ? 45 : 0, duration: 0.2 }, 0)
        .to(plusVRef.current, { rotate: opening ? -45 : 0, duration: 0.2 }, 0);

      textTweenRef.current = gsap.to(textInnerRef.current, {
        yPercent: opening ? -50 : 0,
        duration: 0.22,
        ease: 'power2.out',
      });

      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(toggleBtnRef.current, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          duration: 0.18,
          ease: 'power1.out',
        });
      }
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  );

  const openDialog = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    openDialog();
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline, openDialog]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const panel = panelRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(panel, {
      xPercent: offscreen,
      duration: 0.22,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
        }
        busyRef.current = false;
      },
    });
  }, [position]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateButton(false);
  }, [animateButton, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const nextOpen = !openRef.current;
    openRef.current = nextOpen;
    setOpen(nextOpen);

    if (nextOpen) {
      onMenuOpen?.();
      openDialog();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateButton(nextOpen);
  }, [animateButton, onMenuClose, onMenuOpen, openDialog, playClose, playOpen]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || toggleBtnRef.current?.contains(target)) return;
      closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu, closeOnClickAway, open]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, open]);

  const handleDialogCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      closeMenu();
    },
    [closeMenu],
  );

  const menu = (
    <div
      className={`staggered-menu ${className ?? ''}`}
      data-position={position}
      data-open={open || undefined}
      style={{ '--sm-accent': accentColor } as React.CSSProperties}
    >
      <button
        ref={toggleBtnRef}
        className="sm-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-hidden={open || undefined}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        tabIndex={open ? -1 : undefined}
        type="button"
        onClick={toggleMenu}
      >
        <span className="sm-toggle-text-wrap" aria-hidden="true">
          <span ref={textInnerRef} className="sm-toggle-text-inner">
            <span>Menu</span>
            <span>Close</span>
          </span>
        </span>
        <span className="sm-icon" aria-hidden="true">
          <span ref={plusHRef} className="sm-icon-line-menu-a" />
          <span ref={plusVRef} className="sm-icon-line-menu-b" />
        </span>
      </button>

      <dialog ref={dialogRef} className="sm-dialog" aria-label="Portfolio navigation" onCancel={handleDialogCancel}>
        <button className="sm-toggle sm-dialog-toggle" aria-label="Close menu" type="button" onClick={closeMenu}>
          <span className="sm-toggle-text-wrap" aria-hidden="true">
            <span className="sm-toggle-text-inner">
              <span>Close</span>
            </span>
          </span>
          <span className="sm-icon" aria-hidden="true">
            <span className="sm-icon-line-close-a" />
            <span className="sm-icon-line-close-b" />
          </span>
        </button>

        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {colors.slice(0, 3).map((color, index) => (
            <div className="sm-prelayer" style={{ background: color }} key={`${color}-${index}`} />
          ))}
        </div>

        <aside id="staggered-menu-panel" ref={panelRef} className="sm-panel" aria-hidden={!open}>
          <div className="sm-panel-inner">
            <p className="sm-panel-kicker">Navigation</p>
            <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
              {items.map((item) => (
                <li className="sm-panel-item-wrap" key={item.label}>
                  <a className="sm-panel-item" href={item.link} aria-label={item.ariaLabel} onClick={closeMenu}>
                    <span className="sm-panel-item-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && socialItems.length > 0 ? (
              <div className="sm-socials" aria-label="Social links">
                <h3 className="sm-socials-title">Elsewhere</h3>
                <ul className="sm-socials-list" role="list">
                  {socialItems.map((item) => (
                    <li key={item.label}>
                      <a
                        className="sm-socials-link"
                        href={item.link}
                        aria-label={item.label}
                        onClick={closeMenu}
                        {...getExternalLinkProps(item.link)}
                      >
                        <ButtonIcon name={getSocialIcon(item.label)} />
                        <span className="sm-socials-label">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </dialog>
    </div>
  );

  if (!mounted || !portalHost) return null;

  return createPortal(menu, portalHost);
}
