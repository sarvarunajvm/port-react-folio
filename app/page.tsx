import { HeroViewport } from '@/components/home/HeroViewport';
import { WorksGallery } from '@/components/home/WorksGallery';
import { Expertise } from '@/components/home/Expertise';
import profile from '@/data/profile.json';
import home from '@/data/home.json';
import projects from '@/data/projects.json';

export default function Home() {
  return (
    <>
      <HeroViewport profile={profile} home={home} />

      <div className="relative bg-[var(--surface)]">
        <WorksGallery projects={projects} />
      </div>

      <div className="relative bg-[var(--surface-container-lowest)]">
        <Expertise />
      </div>
    </>
  );
}
