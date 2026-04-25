import profile from '@/data/profile.json';
import projects from '@/data/projects.json';
import experience from '@/data/experience.json';
import { ButtonIcon } from '@/components/ButtonIcon';
import BlurText from '@/components/BlurText';
import { ScrollScrubHero } from '@/components/ScrollScrubHero';

const featuredProjects = projects.filter((project) => project.featured);
const openSourceProjects = projects.filter((project) => project.category === 'opensource');

function formatPeriod(period: (typeof experience)[number]['period']) {
  const start = new Date(period.start).getFullYear();
  const end = period.end ? new Date(period.end).getFullYear() : 'Now';
  return `${start} - ${end}`;
}

export default function Home() {
  return (
    <main>
      <ScrollScrubHero profile={profile} />

      <section className="metrics-section" aria-label="Impact metrics">
        {profile.impactMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.description}</p>
          </article>
        ))}
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
          {featuredProjects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <p className="project-meta">{project.category} / {project.year}</p>
                <BlurText as="h3" text={project.title} delay={62} direction="bottom" />
                <p>{project.summary}</p>
              </div>
              <ul>
                {project.impact.slice(0, 3).map((impact) => (
                  <li key={impact}>{impact}</li>
                ))}
              </ul>
              <div className="tag-row">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
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

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Open source</p>
          <BlurText as="h2" text="Tools outside the day job." delay={105} direction="top" />
        </div>

        <div className="oss-list">
          {openSourceProjects.map((project) => (
            <article key={project.id}>
              <span>{project.year}</span>
              <BlurText as="h3" text={project.title} delay={62} direction="bottom" />
              <p>{project.summary}</p>
              {project.links?.github ? <a href={project.links.github}>GitHub</a> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">Contact</p>
        <BlurText
          as="h2"
          text="Let’s build something that survives production."
          delay={90}
          direction="bottom"
        />
        <div className="hero-actions">
          <a className="button primary" href={`mailto:${profile.links.email}`} aria-label="Email Saravanan">
            <ButtonIcon name="email" />
            <span className="button-label">Email</span>
          </a>
          <a className="button" href={profile.links.linkedin} aria-label="Open LinkedIn profile">
            <ButtonIcon name="linkedin" />
            <span className="button-label">LinkedIn</span>
          </a>
          <a className="button" href={profile.links.github} aria-label="Open GitHub profile">
            <ButtonIcon name="github" />
            <span className="button-label">GitHub</span>
          </a>
        </div>
      </section>
    </main>
  );
}
