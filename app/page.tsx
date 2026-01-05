import Cover from '@/components/magazine/Cover'
import TableOfContents from '@/components/magazine/TableOfContents'
import AboutSpread from '@/components/magazine/AboutSpread'
import ImpactNumbers from '@/components/magazine/ImpactNumbers'
import ExperienceTimeline from '@/components/magazine/ExperienceTimeline'
import ProjectsCarousel from '@/components/magazine/ProjectsCarousel'
import SkillsCollage from '@/components/magazine/SkillsCollage'
import ContactColophon from '@/components/magazine/ContactColophon'
import ScrollProgress from '@/components/magazine/ScrollProgress'

import profile from '@/data/profile.json'
import experience from '@/data/experience.json'
import projects from '@/data/projects.json'
import skills from '@/data/skills.json'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      
      <Cover
        name={profile.name}
        title={profile.title}
        tagline={profile.tagline}
      />
      
      <TableOfContents items={profile.tableOfContents} />
      
      <AboutSpread
        bio={profile.bio}
        avatar={profile.avatar}
        location={profile.location}
      />
      
      <ImpactNumbers metrics={profile.impactMetrics} />
      
      <ExperienceTimeline experiences={experience} />
      
      <ProjectsCarousel projects={projects} />
      
      <SkillsCollage categories={skills.categories} />
      
      <ContactColophon
        links={profile.links}
        name={profile.name}
      />
    </>
  )
}
