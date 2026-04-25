'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import type { Profile } from '@/types/content';
import type { HomeConfig } from '@/types/content';
import { publicUrl } from '@/lib/public-url';

export function HeroViewport({ profile, home }: { profile: Profile; home: HomeConfig }) {
  const hero = home.sections.find((s) => s.id === 'hero');
  const sentences = profile.bio.split('. ').filter(Boolean);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate scroll progress (0 to 1) as section scrolls through viewport
      const progress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight * 0.5)));
      setScrollProgress(progress);

      // Show impact cards one by one based on scroll
      const cardsToShow = Math.floor(progress * (profile.impactMetrics.length + 1));
      setVisibleCards(Math.min(cardsToShow, profile.impactMetrics.length));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [profile.impactMetrics.length]);

  // Video parallax effect
  const videoTranslateY = scrollProgress * 100;
  const contentScale = 1 - scrollProgress * 0.05;
  const contentOpacity = 1 - scrollProgress * 0.3;

  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[150dvh] bg-[var(--surface-container-lowest)]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="container h-full gap-8 py-8 md:gap-8 md:py-12 lg:gap-12 lg:py-16"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {/* Left Column - Content */}
          <div
            className="flex flex-col justify-start gap-4 overflow-y-auto py-4 transition-all duration-300 md:justify-center md:gap-5 md:py-0 lg:gap-6"
            style={{
              transform: `scale(${contentScale})`,
              opacity: contentOpacity,
              transformOrigin: 'left center',
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 lg:gap-8"
            >
              {/* Kicker */}
              <motion.h2
                variants={itemVariants}
                className="font-mono text-sm tracking-[0.2em] text-[var(--text-muted)] lowercase"
              >
                # {profile.title}
              </motion.h2>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl font-bold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9]"
              >
                {profile.name}
              </motion.h1>

              {/* Bio/Tagline Info */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-col gap-4 font-mono text-xs md:text-sm tracking-widest text-[var(--text-secondary)] uppercase"
              >
                <p>Based in {profile.location}</p>
                <p>Specializing in {profile.tagline}</p>
                <p>{profile.yearsExperience} Experience</p>
              </motion.div>
            </motion.div>

            {/* Impact Cards - Appear one by one */}
            <div className="mt-12 space-y-4">
              {profile.impactMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="group relative overflow-hidden border-l-2 border-[var(--primary)] bg-[var(--surface-container-low)] p-6 transition-all duration-700 hover:bg-[var(--surface-container-high)]"
                  style={{
                    opacity: index < visibleCards ? 1 : 0,
                    transform: index < visibleCards ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative flex items-baseline gap-4">
                    <span className="font-display text-4xl font-bold tracking-tighter text-[var(--text-primary)]">
                      {metric.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--surface-tint)]">
                      // {metric.label}
                    </span>
                  </div>
                  <p className="relative mt-3 font-display text-sm text-[var(--text-secondary)]">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Video */}
          <div
            className="relative hidden items-center justify-center transition-transform duration-100 md:flex"
            style={{
              transform: `translateY(${videoTranslateY}px)`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="relative aspect-[9/16] h-[60vh] max-h-[600px] w-auto overflow-hidden rounded-[var(--radius-md)] outline outline-1 outline-[color-mix(in_oklab,var(--outline-variant)_20%,transparent)]"
            >
              <video
                ref={videoRef}
                src={publicUrl('/personal/HeroVideo.mp4')}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              {/* Video overlay gradient */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 60%, var(--surface-container-lowest) 100%)`,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-[color-mix(in_oklab,var(--outline-variant)_20%,transparent)] bg-[var(--surface-container-lowest)] py-4">
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            className="flex whitespace-nowrap font-display text-4xl font-bold tracking-tighter text-[color-mix(in_oklab,var(--text-primary)_5%,transparent)]"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-4">
                {profile.name.toUpperCase()} • {profile.title.toUpperCase()} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
