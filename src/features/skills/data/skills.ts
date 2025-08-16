import { formatYearsOfExperience } from '../../../shared/utils/experience';

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  experience?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

// Dynamic years for skills that match career start
const fullExperience = formatYearsOfExperience();

// Helper function to calculate tech experience based on start year
const getTechExp = (startYear: number): string => {
  const years = new Date().getFullYear() - startYear;
  return years > 0 ? `${years}+ years` : '< 1 year';
};

export const skillsData: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Back-end',
    skills: [
      {
        id: 'java',
        name: 'Java',
        icon: 'Coffee',
        proficiency: 'expert',
        experience: fullExperience,
      },
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        icon: 'Leaf',
        proficiency: 'expert',
        experience: getTechExp(2017), // Started Jan 2017
      },
      {
        id: 'spring-security',
        name: 'Spring Security',
        icon: 'Shield',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
      {
        id: 'spring-rest',
        name: 'Spring REST',
        icon: 'Api',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'jax-rs',
        name: 'JAX-RS',
        icon: 'Code',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'soap',
        name: 'SOAP',
        icon: 'FileCode',
        proficiency: 'intermediate',
        experience: getTechExp(2019),
      },
      {
        id: 'websockets',
        name: 'WebSockets',
        icon: 'Cable',
        proficiency: 'advanced',
        experience: getTechExp(2019),
      },
      {
        id: 'hibernate',
        name: 'Hibernate/JPA',
        icon: 'Database',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'maven',
        name: 'Maven',
        icon: 'Package',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'gradle',
        name: 'Gradle',
        icon: 'Package2',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'junit',
        name: 'JUnit',
        icon: 'TestTube',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'mockito',
        name: 'Mockito',
        icon: 'TestTube2',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-end',
    skills: [
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: 'Hexagon',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
      {
        id: 'vuejs',
        name: 'Vue.js',
        icon: 'Triangle',
        proficiency: 'expert',
        experience: getTechExp(2018),
      },
      {
        id: 'reactjs',
        name: 'React.js',
        icon: 'Atom',
        proficiency: 'advanced',
        experience: getTechExp(2019),
      },
      {
        id: 'html-css',
        name: 'HTML5/CSS3',
        icon: 'Code2',
        proficiency: 'expert',
        experience: fullExperience,
      },
      {
        id: 'vuex',
        name: 'Vuex',
        icon: 'Store',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'redux',
        name: 'Redux',
        icon: 'Layers',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
      {
        id: 'npm',
        name: 'NPM',
        icon: 'Package',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'jest',
        name: 'Jest',
        icon: 'TestTube',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'cypress',
        name: 'Cypress',
        icon: 'TestTube2',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      {
        id: 'oracle',
        name: 'Oracle',
        icon: 'Database',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        icon: 'Database',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'h2',
        name: 'H2',
        icon: 'HardDrive',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
      {
        id: 'redis',
        name: 'Redis',
        icon: 'Zap',
        proficiency: 'intermediate',
        experience: getTechExp(2019),
      },
      {
        id: 'bigquery',
        name: 'BigQuery',
        icon: 'Cloud',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
      {
        id: 'bigtable',
        name: 'BigTable',
        icon: 'Table',
        proficiency: 'beginner',
        experience: '1+ year',
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    skills: [
      {
        id: 'jenkins',
        name: 'Jenkins',
        icon: 'Workflow',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: 'Github',
        proficiency: 'expert',
        experience: getTechExp(2019),
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: 'Container',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'gcp',
        name: 'Google Cloud',
        icon: 'Cloud',
        proficiency: 'advanced',
        experience: getTechExp(2019),
      },
      {
        id: 'aws',
        name: 'AWS',
        icon: 'CloudCog',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
      {
        id: 'otel',
        name: 'OpenTelemetry',
        icon: 'Activity',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
      {
        id: 'micrometer',
        name: 'Micrometer',
        icon: 'BarChart3',
        proficiency: 'advanced',
        experience: getTechExp(2019),
      },
      {
        id: 'splunk',
        name: 'Splunk',
        icon: 'LineChart',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
      {
        id: 'datadog',
        name: 'Datadog',
        icon: 'TrendingUp',
        proficiency: 'intermediate',
        experience: getTechExp(2021),
      },
    ],
  },
  {
    id: 'tools-collaboration',
    title: 'Tools & Collaboration',
    skills: [
      {
        id: 'git',
        name: 'Git',
        icon: 'GitBranch',
        proficiency: 'expert',
        experience: fullExperience,
      },
      {
        id: 'jira',
        name: 'JIRA',
        icon: 'Kanban',
        proficiency: 'expert',
        experience: getTechExp(2016),
      },
      {
        id: 'confluence',
        name: 'Confluence',
        icon: 'BookOpen',
        proficiency: 'advanced',
        experience: getTechExp(2017),
      },
      {
        id: 'oas',
        name: 'OAS 2.0',
        icon: 'FileText',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      {
        id: 'kafka',
        name: 'AMQ/Kafka',
        icon: 'MessageSquare',
        proficiency: 'intermediate',
        experience: getTechExp(2019),
      },
      {
        id: 'oauth',
        name: 'OAuth2',
        icon: 'Key',
        proficiency: 'advanced',
        experience: getTechExp(2018),
      },
      { id: 'jwt', name: 'JWT', icon: 'Lock', proficiency: 'expert', experience: getTechExp(2017) },
      {
        id: 'sonarqube',
        name: 'SonarQube',
        icon: 'ScanLine',
        proficiency: 'advanced',
        experience: getTechExp(2019),
      },
    ],
  },
];
