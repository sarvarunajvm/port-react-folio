'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Project } from '@/types/content';

export function WorksGallery({ projects }: { projects: Project[] }) {
  return (
    <section className="relative min-h-screen py-32 md:py-48">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-40 flex flex-col items-center text-center"
        >
          <h2 className="font-display text-5xl font-bold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl">
            代表作
          </h2>
          <p className="mt-4 max-w-2xl font-display text-2xl font-bold leading-tight text-[var(--text-secondary)] md:text-4xl">
            Selected Work Shaping Brands, Products, and Experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-12 md:gap-y-32 lg:gap-x-24 lg:gap-y-48">
          {projects.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? 'md:mt-32' : ''}>
              <WorkItem project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the inner content
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-8"
    >
      {/* Clean Brutalist "Image" Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-container-low)] md:aspect-[3/4] lg:aspect-[4/5] border border-[color-mix(in_oklab,var(--outline-variant)_20%,transparent)] group-hover:border-[var(--outline-variant)] transition-colors duration-500">
        {/* Inner Parallax Content */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-transform duration-1000 group-hover:scale-105"
        >
          <div className="flex flex-col items-center justify-center gap-4 transition-all duration-700 group-hover:-translate-y-4">
            <h3 className="font-display text-4xl font-bold tracking-tighter text-[var(--text-primary)] md:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--surface-tint)] uppercase">
              // {project.category}
            </p>
          </div>

          {/* Reveal on hover */}
          <div className="absolute bottom-12 left-8 right-8 translate-y-8 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <ul className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
              {project.impact.slice(0, 3).map((line, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <span className="h-1 w-1 bg-[var(--primary)]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Meta Area */}
      <div className="flex flex-col items-start justify-between gap-6 border-t border-[color-mix(in_oklab,var(--outline-variant)_20%,transparent)] pt-6 md:flex-row md:items-start">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <span className="transition-colors duration-500 group-hover:text-[var(--text-primary)]">
            View work
          </span>
        </div>

        <div className="flex-1 md:px-8">
          <p className="font-display text-lg font-bold leading-relaxed text-[var(--text-secondary)] md:text-xl">
            {project.summary}
          </p>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {project.tags[0]}
        </div>
      </div>
    </motion.article>
  );
}
