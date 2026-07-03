import profile from '@/data/profile.json';
import projects from '@/data/projects.json';
import experience from '@/data/experience.json';
import { ButtonIcon } from '@/components/ButtonIcon';
import BlurText from '@/components/BlurText';
import { MicroInteractions } from '@/components/MicroInteractions';
import { ScrollScrubHero } from '@/components/ScrollScrubHero';
import { publicUrl } from '@/lib/public-url';
import { siteDescription, siteUrl } from '@/lib/site';

const featuredProjects = projects.filter((project) => project.featured);
const featuredProjectIds = new Set(featuredProjects.map((project) => project.id));
const moreOpenSourceProjects = projects.filter(
  (project) => project.category === 'opensource' && !featuredProjectIds.has(project.id),
);
const stackTags = Array.from(new Set(projects.flatMap((project) => project.tags))).slice(0, 16);

const proofSignals = [
  {
    label: 'Product proof',
    value: `${featuredProjects.length} selected systems`,
    detail: 'Each project includes delivery evidence, scope, and measurable outcomes.',
  },
  {
    label: 'Platform depth',
    value: `${stackTags.length} core tools`,
    detail: 'Backend, frontend, data, IoT, automation, and production observability.',
  },
  {
    label: 'Open source',
    value: `${moreOpenSourceProjects.length} extra tools`,
    detail: 'Additional libraries and utilities kept separate from the featured case studies.',
  },
];

const capabilityCards = [
  {
    kicker: 'Architecture',
    title: 'Turn ambiguous product goals into rollout-ready systems.',
    body: 'Discovery, NFR analysis, data modeling, and release plans that make production behavior explicit before implementation.',
    proof: 'Data modeling, whitelabeling, webhook delivery, rollout controls',
  },
  {
    kicker: 'Reliability',
    title: 'Keep services observable, recoverable, and boring at scale.',
    body: 'Health digests, rollback triggers, DLQ alerting, and contract coverage that expose risk while there is still time to act.',
    proof: 'Health digests, rollback triggers, DLQ alerting, contract tests',
  },
  {
    kicker: 'Governance',
    title: 'Balance API growth with fraud controls and platform guardrails.',
    body: 'Progressive access ramps, fraud signals, deduplication, and measurable quality gates across merchant-facing workflows.',
    proof: 'Fraud signals, access ramping, deduped delivery, quality gates',
  },
  {
    kicker: 'Delivery',
    title: 'Lead cross-functional execution from design review to GA.',
    body: 'Clear trade-offs, phased launches, and team rituals that keep technical direction tied to business outcomes.',
    proof: 'Phased launches, stakeholder reviews, scrum rhythm, release gates',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}personal/contact.png`,
  email: `mailto:${profile.links.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressCountry: 'IN',
  },
  worksFor: {
    '@type': 'Organization',
    name: profile.company,
  },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: stackTags,
};

function formatPeriod(period: (typeof experience)[number]['period']) {
  const start = new Date(period.start).getFullYear();
  const end = period.end ? new Date(period.end).getFullYear() : 'Now';
  return `${start} - ${end}`;
}

function externalLinkProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};
}

function projectLinks(project: (typeof projects)[number]) {
  const links = 'links' in project ? project.links : undefined;
  return {
    github: links && 'github' in links ? links.github : undefined,
    npm: links && 'npm' in links ? links.npm : undefined,
  };
}

export default function Home() {
  return (
    <main>
      <MicroInteractions />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a className="skip-link" href="#work">
        Skip to selected work
      </a>

      <ScrollScrubHero profile={profile} />

      <section className="metrics-section" id="impact" aria-label="Impact metrics">
        {profile.impactMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.description}</p>
          </article>
        ))}
      </section>

      <section className="proof-rail" aria-label="Portfolio proof points">
        {proofSignals.map((signal) => (
          <article className="proof-card" key={signal.label}>
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
            <p>{signal.detail}</p>
          </article>
        ))}
      </section>

      <section className="section capability-section" id="focus" aria-label="Engineering capabilities">
        <div className="section-heading">
          <p className="eyebrow">Engineering focus</p>
          <BlurText
            as="h2"
            text="Senior ownership where product, reliability, and delivery meet."
            delay={92}
            direction="top"
          />
          <p>
            The throughline is pragmatic platform work: reduce uncertainty, shape the system,
            ship in phases, and leave behind instrumentation that tells the truth.
          </p>
        </div>

        <div className="capability-grid">
          {capabilityCards.map((capability) => (
            <article className="capability-card" key={capability.kicker}>
              <p className="capability-kicker">{capability.kicker}</p>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
              <span>{capability.proof}</span>
            </article>
          ))}
        </div>

        <div className="stack-strip" aria-label="Core technologies">
          <span>Core stack</span>
          <div className="tag-row">
            {stackTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <BlurText as="h2" text="Evidence of systems thinking." delay={105} direction="top" />
          <p>
            Shipped platforms, open-source tools, and architecture work with outcomes that can be
            measured instead of merely described.
          </p>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project, index) => {
            const links = projectLinks(project);

            return (
              <article className="project-card" key={project.id} aria-label={`${project.title} case study`}>
                <div className="project-card-header">
                  <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                  <span className="status-pill">{project.status}</span>
                </div>
                <div>
                  <p className="project-meta">{project.category} / {project.year}</p>
                  <BlurText as="h3" text={project.title} delay={62} direction="bottom" />
                  <p>{project.summary}</p>
                  <p className="project-description">{project.description}</p>
                </div>
                <dl className="project-proof-grid" aria-label={`${project.title} outcomes`}>
                  {project.impact.slice(0, 3).map((impact, impactIndex) => (
                    <div key={impact}>
                      <dt>Outcome {String(impactIndex + 1).padStart(2, '0')}</dt>
                      <dd>{impact}</dd>
                    </div>
                  ))}
                </dl>
                <div className="tag-row">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {links.github || links.npm ? (
                  <div className="project-links">
                    {links.github ? (
                      <a
                        href={links.github}
                        aria-label={`Open ${project.title} on GitHub`}
                        {...externalLinkProps(links.github)}
                      >
                        GitHub
                      </a>
                    ) : null}
                    {links.npm ? (
                      <a
                        href={links.npm}
                        aria-label={`Open ${project.title} on npm`}
                        {...externalLinkProps(links.npm)}
                      >
                        npm
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section split-section" id="experience">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">Experience</p>
          <BlurText
            as="h2"
            text="Production ownership across fintech and IoT."
            delay={92}
            direction="top"
          />
          <p>
            Roles are summarized around scope, technical decisions, and measurable delivery impact.
          </p>
        </div>

        <div className="timeline">
          {experience.map((role) => (
            <article className="timeline-item" key={role.id}>
              <div className="timeline-date">{formatPeriod(role.period)}</div>
              <div>
                <BlurText as="h3" text={role.company} delay={70} direction="bottom" />
                <p className="role-title">{role.role} / {role.location}</p>
                <p>{role.description}</p>
                <ul>
                  {role.achievements.slice(0, 3).map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="opensource">
        <div className="section-heading">
          <p className="eyebrow">More open source</p>
          <BlurText as="h2" text="Additional tools and contributions." delay={105} direction="top" />
          <p>
            Smaller tools, libraries, and contributions that show range across ecosystems without
            pulling attention away from the selected work.
          </p>
        </div>

        <div className="oss-list">
          {moreOpenSourceProjects.map((project) => {
            const links = projectLinks(project);

            return (
              <article key={project.id} aria-label={`${project.title} open-source project`}>
                <span>{project.year}</span>
                <BlurText as="h3" text={project.title} delay={62} direction="bottom" />
                <p>{project.summary}</p>
                <div className="oss-links">
                  {links.github ? (
                    <a
                      href={links.github}
                      aria-label={`Open ${project.title} on GitHub`}
                      {...externalLinkProps(links.github)}
                    >
                      GitHub
                    </a>
                  ) : null}
                  {links.npm ? (
                    <a
                      href={links.npm}
                      aria-label={`Open ${project.title} on npm`}
                      {...externalLinkProps(links.npm)}
                    >
                      npm
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <BlurText
              as="h2"
              text="Let’s build something that survives production."
              delay={90}
              direction="bottom"
            />
            <p>
              Based in {profile.location}. Open to senior engineering conversations around
              platform reliability, payments, and product-facing backend systems.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={`mailto:${profile.links.email}`} aria-label="Email Saravanan">
                <ButtonIcon name="email" />
                <span className="button-label">Email</span>
              </a>
              <a
                className="button"
                href={profile.links.linkedin}
                aria-label="Open LinkedIn profile"
                {...externalLinkProps(profile.links.linkedin)}
              >
                <ButtonIcon name="linkedin" />
                <span className="button-label">LinkedIn</span>
              </a>
              <a
                className="button"
                href={profile.links.github}
                aria-label="Open GitHub profile"
                {...externalLinkProps(profile.links.github)}
              >
                <ButtonIcon name="github" />
                <span className="button-label">GitHub</span>
              </a>
            </div>
          </div>

          <div className="contact-portrait">
            <img src={publicUrl(`/${profile.avatar}`)} alt={`Portrait of ${profile.name}`} />
            <div>
              <span>{profile.title}</span>
              <strong>{profile.company}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
