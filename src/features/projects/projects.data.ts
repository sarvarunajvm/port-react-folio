export interface Project {
  id: string;
  title: string;
  description: string;
  language: string;
  technologies: string[];
  url: string;
  npmLink?: string;
  highlights: string[];
  icon?: string;
}

export const projects: Project[] = [
  {
    id: 'utils-commons',
    title: 'Utils-Commons',
    language: 'Java',
    technologies: ['Java', 'Maven', 'JUnit'],
    url: 'https://github.com/sarvarunajvm/utils-commons',
    description:
      'Inspired by "Apache Commons IO." Contains utilities for String, Number, Date, Set, List, BLOB, and Zip.',
    highlights: [
      'Comprehensive utility library for Java development',
      'Inspired by Apache Commons IO architecture',
      'Covers essential data types and operations',
    ],
    icon: 'Code2',
  },
  {
    id: 'port-advancer',
    title: 'Port-Advancer',
    language: 'NodeJS',
    technologies: ['Node.js', 'Express', 'Socket.io'],
    url: 'https://github.com/sarvarunajvm/port-advancer',
    description:
      'Created a user-friendly tool that allows over 60 employees to easily perform port forwarding and reverse proxying for secure internet access within a restricted network.',
    highlights: [
      'Serves 60+ employees in production',
      'Simplifies network security management',
      'Enterprise-grade tool for restricted networks',
    ],
    icon: 'Network',
  },
  {
    id: 'vue-embed-gist',
    title: 'vue-embed-gist',
    language: 'JavaScript/Vue',
    technologies: ['Vue.js', 'JavaScript', 'NPM'],
    url: 'https://github.com/sudhanshu-15/vue-embed-gist/pull/13',
    npmLink: 'http://goo.gl/Hjkx2j',
    description: 'Contributed to an open-source project that averages 270 downloads per week.',
    highlights: [
      '270 downloads per week average',
      'Open-source contribution',
      'Vue.js ecosystem component',
    ],
    icon: 'Package',
  },
];
