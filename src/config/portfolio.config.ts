import { calculateYearsOfExperience } from '../shared/utils/experience';
import { calculateTotalProjects, calculateTotalSkills } from '../shared/utils/statistics';

interface SectionConfig {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

export interface PortfolioConfig {
  personal: {
    firstname: string;
    lastname: string;
    titles: string[];
    avatar?: string;
  };
  status: {
    available: boolean;
    availableText: string;
    collaborateText: string;
    learningText: string;
    connectText: string;
  };
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    techStackSize: number;
  };
  resume: {
    path: string;
    downloadName: string;
  };
  sections: {
    experience: SectionConfig;
    projects: SectionConfig;
    skills: SectionConfig;
    contact: SectionConfig;
    resume: SectionConfig;
  };
  layout: {
    showClock: boolean;
    showAvatar: boolean;
    animatedBackground: boolean;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    firstname: 'Saravanan',
    lastname: 'Kalimuthu',
    titles: ['Software Engineer', 'Java Developer', 'Code Enthusiast!'],
    avatar: 'photo.png',
  },

  status: {
    available: true,
    availableText: 'Open to opportunities',
    collaborateText: "Let's collaborate",
    learningText: 'Always learning',
    connectText: "Let's connect",
  },

  stats: {
    yearsOfExperience: calculateYearsOfExperience(),
    projectsCompleted: calculateTotalProjects(),
    techStackSize: calculateTotalSkills(),
  },

  resume: {
    path: '/Resume.pdf',
    downloadName: 'Saravanan_Kalimuthu_Resume.pdf',
  },

  sections: {
    experience: {
      title: 'Experience',
      subtitle: 'Journey',
      icon: 'Briefcase',
      color: 'blue-500',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Portfolio',
      icon: 'Rocket',
      color: 'purple-500',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Tech Stack',
      icon: 'Code2',
      color: 'green-500',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Connect',
      icon: 'Mail',
      color: 'red-500',
    },
    resume: {
      title: 'Resume',
      subtitle: 'Download',
      icon: 'Download',
      color: 'orange-700',
    },
  },

  layout: {
    showClock: true,
    showAvatar: true,
    animatedBackground: true,
  },
};
