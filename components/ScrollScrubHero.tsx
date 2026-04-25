'use client';

import { useEffect, useRef, useState } from 'react';
import type { Profile } from '@/types/content';
import BlurText from '@/components/BlurText';
import StaggeredMenu from '@/components/StaggeredMenu';
import { publicUrl } from '@/lib/public-url';

const SCRUB_SECONDS = 4;
const SCRUB_START_LAYOUT = 0.94;

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function ScrollScrubHero({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const renderedTimeRef = useRef(0);
  const layoutProgressRef = useRef(0);
  const lastSeekAtRef = useRef(0);
  const lastVarsRef = useRef({
    content: -1,
    layout: -1,
    nav: -1,
    progress: -1,
    vignette: -1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let frame = 0;

    const setScrubVar = (name: string, next: number, previous: number) => {
      if (!sectionRef.current || Math.abs(next - previous) < 0.001) return previous;
      sectionRef.current.style.setProperty(name, next.toFixed(4));
      return next;
    };

    const updateLayout = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable) : 0;
      const layoutProgress = clamp(progress / 0.62);
      const contentProgress = clamp((progress - 0.08) / 0.32);
      const vignetteOpacity = 0.28 + contentProgress * 0.72;
      const navOpacity = clamp(1 - contentProgress * 1.35);

      layoutProgressRef.current = layoutProgress;
      const last = lastVarsRef.current;
      last.progress = setScrubVar('--scrub-progress', progress, last.progress);
      last.layout = setScrubVar('--scrub-layout', layoutProgress, last.layout);
      last.content = setScrubVar('--scrub-content', contentProgress, last.content);
      last.vignette = setScrubVar('--scrub-vignette-opacity', vignetteOpacity, last.vignette);
      last.nav = setScrubVar('--scrub-nav-opacity', navOpacity, last.nav);
    };

    const render = (now: number) => {
      updateLayout();

      const video = videoRef.current;
      if (video && Number.isFinite(video.duration)) {
        const maxTime = Math.min(SCRUB_SECONDS, Math.max(0, video.duration - 0.04));
        const smallPanelActive = layoutProgressRef.current >= SCRUB_START_LAYOUT;
        const nextTime = smallPanelActive ? Math.min(targetTimeRef.current, maxTime) : 0;
        renderedTimeRef.current += (nextTime - renderedTimeRef.current) * (smallPanelActive ? 0.16 : 0.28);

        video.pause();
        if (!smallPanelActive && video.currentTime > 0.04) {
          renderedTimeRef.current = 0;
          video.currentTime = 0;
          lastSeekAtRef.current = now;
        } else if (
          smallPanelActive &&
          !video.seeking &&
          now - lastSeekAtRef.current > 72 &&
          Math.abs(video.currentTime - renderedTimeRef.current) > 0.045
        ) {
          video.currentTime = renderedTimeRef.current;
          lastSeekAtRef.current = now;
        }
      }

      frame = window.requestAnimationFrame(render);
    };

    const updatePointer = (clientX: number) => {
      const gazeProgress = clamp(1 - clientX / window.innerWidth);
      targetTimeRef.current = gazeProgress * SCRUB_SECONDS;
      sectionRef.current?.style.setProperty('--gaze-progress', gazeProgress.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX);
    const onPointerLeave = () => updatePointer(window.innerWidth);
    const onResize = () => {
      updatePointer(window.innerWidth / 2);
      updateLayout();
    };

    updatePointer(window.innerWidth);
    updateLayout();
    const onMetadata = () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    };

    videoRef.current?.addEventListener('loadedmetadata', onMetadata);
    frame = window.requestAnimationFrame(render);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      videoRef.current?.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="scrub-hero gaze-hero" id="top">
      <div className={`loader-screen${loading ? '' : ' is-hidden'}`} aria-hidden={!loading}>
        <div className="loader-smoke" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="loader-lightning" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="loader-frame" aria-hidden="true">
          <span>Signal through fog</span>
          <span>00:04 scan</span>
        </div>
        <div className="loader-mark">
          <i />
          <span />
          <span />
          <span />
        </div>
        <p>Opening the frame</p>
      </div>

      <div className="scrub-stage">
        <div className="scrub-media" aria-hidden="true">
          <img className="scrub-poster" src={publicUrl('/personal/1.png')} alt="" />
          <video
            ref={videoRef}
            className="scrub-video"
            src={publicUrl('/personal/HeroVideo.mp4')}
            poster={publicUrl('/personal/1.png')}
            muted
            playsInline
            preload="auto"
          />
        </div>

        <div className="hero-name-split" aria-label={profile.name}>
          <span>Saravanan</span>
          <span>Kalimuthu</span>
        </div>

        <div className="scrub-vignette" />

        {!loading ? (
          <div className="floating-menu" aria-label="Primary navigation">
            <StaggeredMenu
              items={[
                { label: 'Home', ariaLabel: 'Go to top', link: '#top' },
                { label: 'Work', ariaLabel: 'View selected work', link: '#work' },
                { label: 'Experience', ariaLabel: 'View experience', link: '#experience' },
                { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
              ]}
              socialItems={[
                { label: 'Resume', link: publicUrl(`/${profile.links.resume}`) },
                { label: 'GitHub', link: profile.links.github },
                { label: 'LinkedIn', link: profile.links.linkedin },
                { label: 'Email', link: `mailto:${profile.links.email}` },
              ]}
              colors={['rgba(255,255,255,0.2)', 'rgba(100,100,100,0.86)', 'rgba(0,0,0,0.96)']}
              accentColor="#ffffff"
              menuButtonColor="#ffffff"
              openMenuButtonColor="#ffffff"
            />
          </div>
        ) : null}

        <div className="scrub-copy">
          <p className="eyebrow">{profile.title} at {profile.company}</p>
          <BlurText
            as="h1"
            text="Building reliable payment systems from idea to production."
            delay={78}
            direction="bottom"
            rootMargin="0px"
          />
          <p className="hero-summary">{profile.bio}</p>

          <div className="hero-actions">
            <a className="button primary" href="#work">
              View work
            </a>
            <a className="button" href={publicUrl(`/${profile.links.resume}`)}>
              Resume
            </a>
            <a className="button" href={`mailto:${profile.links.email}`}>
              Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
