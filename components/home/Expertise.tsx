'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const expertiseData = [
  {
    id: '01',
    title: 'Distributed Systems',
    description:
      'I design and build resilient, high-throughput distributed systems that power critical financial infrastructure. From discovery and NFR analysis to phased rollouts and production monitoring, I ensure systems are scalable, fault-tolerant, and observable.',
    skills: [
      'Architecture Design',
      'Microservices',
      'Event-Driven Systems',
      'High Availability',
      'Observability',
      'Performance Tuning',
    ],
  },
  {
    id: '02',
    title: 'Payments & Fintech',
    description:
      'Deep domain expertise in payment processing, invoicing platforms, and financial whitelabeling. I build secure, compliant, and scalable payment solutions that handle millions of transactions with sub-second latency and zero data loss.',
    skills: [
      'Payment Gateways',
      'Invoicing APIs',
      'Fraud Reduction',
      'Idempotency',
      'Financial Compliance',
      'Ledger Systems',
    ],
  },
  {
    id: '03',
    title: 'Backend Engineering',
    description:
      'Expertise in building robust backend services using modern languages and frameworks. I focus on clean code, domain-driven design, and comprehensive testing strategies including contract and mutation testing to ensure rock-solid reliability.',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Go', 'API Design', 'Contract Testing'],
  },
  {
    id: '04',
    title: 'Cloud & Infrastructure',
    description:
      'I architect and deploy cloud-native applications using containerization, orchestration, and infrastructure as code. My focus is on creating automated, secure, and easily reproducible environments that accelerate development velocity.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD Pipelines', 'Infrastructure as Code'],
  },
];

export function Expertise() {
  return (
    <section className="relative min-h-screen py-32 md:py-48 bg-[var(--surface-container-lowest)]">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-40"
        >
          <p className="font-mono text-sm tracking-[0.2em] text-[var(--text-muted)] uppercase mb-4">
            My Expertise
          </p>
          <h2 className="font-display text-5xl font-bold tracking-tighter text-[var(--text-primary)] md:text-7xl lg:text-8xl">
            専門分野
          </h2>
          <p className="mt-6 max-w-2xl font-display text-2xl font-bold leading-tight text-[var(--text-secondary)] md:text-4xl">
            Architecting Resilient Systems Through Vision, Engineering, and Scale
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {expertiseData.map((item, index) => (
            <ExpertiseItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseItem({ item, index }: { item: (typeof expertiseData)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 border-t border-[color-mix(in_oklab,var(--outline-variant)_20%,transparent)] pt-12"
    >
      <div className="md:w-1/3 flex flex-col gap-4">
        <div className="font-mono text-sm tracking-[0.2em] text-[var(--surface-tint)]">
          // {item.id}
        </div>
        <h3 className="font-display text-4xl font-bold tracking-tighter text-[var(--text-primary)] md:text-5xl lg:text-6xl">
          {item.title}
        </h3>
        <div className="font-display text-6xl font-bold text-[color-mix(in_oklab,var(--surface-tint)_20%,transparent)] mt-auto hidden md:block">
          {item.id}
        </div>
      </div>

      <div className="md:w-2/3 flex flex-col gap-12">
        <p className="font-display text-xl font-light leading-relaxed text-[var(--text-secondary)] md:text-2xl">
          {item.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          {item.skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-[color-mix(in_oklab,var(--outline-variant)_10%,transparent)] pb-4"
            >
              <span className="font-display text-lg text-[var(--text-primary)]">{skill}</span>
              <span className="font-mono text-[10px] tracking-widest text-[var(--surface-tint)]">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
