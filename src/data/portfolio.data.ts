/**
 * Portfolio Data - Single Source of Truth
 * All portfolio content and configuration in one place
 */

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  firstname: 'Saravanan',
  lastname: 'Kalimuthu',
  nickname: 'Martian',
  email: 'sarvaruna@outlook.com',
  phone: '+91 979-087-0737',
  location: {
    city: 'Chennai',
    country: 'India',
    timezone: 'IST',
  },
  titles: ['Senior Software Engineer', 'Java Developer', 'Code Enthusiast!'],
  bio: 'Results-oriented software engineer with expertise in Java development and full-stack technologies. Passionate about building scalable enterprise applications and contributing to open-source projects.',
  availability: {
    status: 'Available',
    message: 'Open to new opportunities',
  },
  social: {
    github: 'https://github.com/sarvarunajvm',
    linkedin: 'https://www.linkedin.com/in/saravanan-kalimuthu-01a0a9113',
    stackoverflow: 'https://stackoverflow.com/users/12595188/saravanan-kalimuthu?tab=profile',
    devto: 'https://dev.to/sarvarunajvm',
  },
  resume: {
    path: '/resume.pdf',
    downloadName: 'Saravanan_Kalimuthu_Resume.pdf',
  },
};

// ============================================
// UI CONTENT & LABELS
// ============================================
export const uiContent = {
  navigation: {
    profileHint: 'View my profile',
    cards: [
      {
        id: 'experience',
        emoji: '💼',
        color: 'blue',
        hintEmoji: '🏢',
        hintText: 'View my journey',
        title: 'Experience',
        subtitle: 'Professional Journey',
      },
      {
        id: 'projects',
        emoji: '🚀',
        color: 'purple',
        hintEmoji: '☕',
        hintText: 'Explore my work',
        title: 'Projects',
        subtitle: "Things I've Built",
      },
      {
        id: 'skills',
        emoji: '💻',
        color: 'green',
        hintEmoji: '✨',
        hintText: 'See my expertise',
        title: 'Skills',
        subtitle: 'Tech Stack',
      },
      {
        id: 'contact',
        emoji: '📄',
        color: 'red',
        hintEmoji: '📥',
        hintText: 'Download resume',
        title: 'Download Resume',
        subtitle: 'Get my latest CV',
      },
    ],
    defaultHint: 'Click to explore',
  },
  hero: {
    stats: {
      years: {
        label: 'Years',
        fullLabel: 'Years Experience',
      },
      projects: {
        label: 'Projects',
        fullLabel: 'Completed Projects',
      },
      tech: {
        label: 'Tech',
        fullLabel: 'Tech Stack',
      },
    },
  },
  about: {
    contactForm: {
      title: 'Send Message',
      subtitle: "Have a project in mind? Let's connect!",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message...',
      sendButton: 'Send',
      emailSubject: 'Contact from Portfolio',
    },
    sections: {
      contact: {
        title: 'Contact Info',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        locationLabel: 'Location',
      },
    },
  },
  experience: {
    previousRoles: 'Previous Roles',
    keyAchievements: 'Key Achievements',
    current: 'Current',
    yearsLabel: 'Years',
    companiesLabel: 'Companies',
    projectsLabel: 'Career Projects',
  },
  projects: {
    stats: {
      openSource: 'Open Source',
      downloads: 'Downloads',
      users: 'Users',
      modules: 'Utility Modules',
      activeUsers: 'Active Users',
      weeklyDownloads: 'Weekly Downloads',
    },
    buttons: {
      github: 'GitHub',
      npm: 'NPM',
      pr: 'PR',
    },
  },
  skills: {
    proficiencyLevels: {
      expert: 'Expert',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Learning',
    },
  },
};

// ============================================
// STATISTICS
// ============================================
export const statistics = {
  yearsOfExperience: 9,
  projectsCompleted: 25,
  techStackSize: 48,
  companiesWorked: 4,
};

// ============================================
// EXPERIENCE DATA
// ============================================
export const experienceData = [
  {
    id: 'paypal',
    company: 'PayPal',
    designation: 'Sr Software Engineer',
    period: 'May 2021 - Present',
    icon: 'CreditCard',
    current: true,
    achievements: [
      'Resolved a product gap in webhooks, now used by 10% of merchants',
      'Implemented near-real-time analytics, increasing revenue by 0.01%',
      'Reduced spam to below 2% with various effective solutions',
      'Optimized certain API performance, improving response speed by 1.5x',
      'Achieved a 95% on-time completion rate in all the initiatives',
      'Reached 70% code coverage along with the Junit 5 upgrade',
      'Improved team productivity through various process enhancements',
      'Served as Scrum Master for a quarter, achieving a 90% Say-Do ratio',
    ],
    impact: [
      { metric: 'API Speed', value: '1.5x', type: 'increase' },
      { metric: 'Code Coverage', value: '70%', type: 'increase' },
      { metric: 'On-time Delivery', value: '95%', type: 'neutral' },
    ],
  },
  {
    id: 'assetpulse',
    company: 'Assetpulse, Inc',
    designation: 'Software Engineer',
    period: 'Oct 2019 - May 2021',
    icon: 'TrendingUp',
    achievements: [
      'Revitalized a legacy product with Rest API, increasing user engagement by 2%',
      'Switched to Bluetooth Low Energy (BLE) from RFID, reducing costs by one-third',
      'Enhanced a triangulation algorithm using WebSocket, improving customer conversion rates to 5%',
      'Implemented unit and functional tests, achieving 68% code coverage',
      'Reduced technical debt by 30 days',
    ],
  },
  {
    id: 'wellspring',
    company: 'Wellspring Software Labs',
    designation: 'Software Developer',
    period: 'Feb 2018 - Sep 2019',
    icon: 'Code2',
    achievements: [
      'Configurable service locator pattern led to a 10% drop in API designs',
      'C4 diagrams helped align stakeholders 25% faster',
      'Optimized storage reduced average response time from 1200ms to 700ms',
      'Client recognition received for effectively solving a problem during a demo',
    ],
  },
  {
    id: 'corenett',
    company: 'CoreNett Technologies',
    designation: 'Software Engineer',
    period: 'Jun 2016 - Dec 2017',
    icon: 'Network',
    achievements: [
      'Reduced RTB need by 10% with configurable backend systems',
      'Improved report performance by 30% using auto-paginated results',
    ],
  },
];

// ============================================
// PROJECTS DATA
// ============================================
export const projectsData = [
  {
    id: 'utils-commons',
    name: 'Utils-Commons',
    description:
      'Inspired by "Apache Commons IO." Contains utilities for String, Number, Date, Set, List, BLOB, and Zip.',
    tech: 'Java',
    status: 'Production Ready',
    metrics: {
      modules: 7,
    },
    url: 'https://github.com/sarvarunajvm/utils-commons',
    createdDate: '2020-03-01',
  },
  {
    id: 'port-advancer',
    name: 'Port-Advancer',
    description:
      'User-friendly tool that allows over 60 employees to easily perform port forwarding and reverse proxying for secure internet access within a restricted network.',
    tech: 'NodeJS',
    status: 'Enterprise',
    metrics: {
      users: 60,
    },
    url: 'https://github.com/sarvarunajvm/port-advancer',
    createdDate: '2019-08-01',
  },
  {
    id: 'vue-embed-gist',
    name: 'vue-embed-gist',
    description: 'Contributed to an open-source project that averages 270 downloads per week.',
    tech: 'JavaScript/Vue',
    status: 'Open Source',
    metrics: {
      weeklyDownloads: 270,
    },
    url: 'https://github.com/sudhanshu-15/vue-embed-gist/pull/13',
    npmLink: 'https://www.npmjs.com/package/vue-embed-gist',
    createdDate: '2019-02-01',
  },
];

// ============================================
// SKILLS DATA
// ============================================
export const skillsData = [
  {
    id: 'backend',
    category: 'Backend',
    title: 'Back-end',
    skills: [
      { id: 'java', name: 'Java', proficiency: 'expert', icon: 'Coffee' },
      { id: 'spring-boot', name: 'Spring Boot', proficiency: 'expert', icon: 'Leaf' },
      { id: 'spring-security', name: 'Spring Security', proficiency: 'advanced', icon: 'Shield' },
      { id: 'spring-rest', name: 'Spring REST', proficiency: 'expert', icon: 'Api' },
      { id: 'jax-rs', name: 'JAX-RS', proficiency: 'advanced', icon: 'Code' },
      { id: 'soap', name: 'SOAP', proficiency: 'intermediate', icon: 'FileCode' },
      { id: 'websockets', name: 'WebSockets', proficiency: 'advanced', icon: 'Cable' },
      { id: 'hibernate', name: 'Hibernate/JPA', proficiency: 'expert', icon: 'Database' },
      { id: 'maven', name: 'Maven', proficiency: 'expert', icon: 'Package' },
      { id: 'gradle', name: 'Gradle', proficiency: 'advanced', icon: 'Package2' },
      { id: 'junit', name: 'JUnit', proficiency: 'expert', icon: 'TestTube' },
      { id: 'mockito', name: 'Mockito', proficiency: 'advanced', icon: 'TestTube2' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    title: 'Front-end',
    skills: [
      { id: 'nodejs', name: 'NodeJs', proficiency: 'advanced', icon: 'Hexagon' },
      { id: 'vuejs', name: 'VueJs', proficiency: 'expert', icon: 'Triangle' },
      { id: 'reactjs', name: 'ReactJs', proficiency: 'advanced', icon: 'Atom' },
      { id: 'html-css', name: 'HTML5/CSS3', proficiency: 'expert', icon: 'Code2' },
      { id: 'vuex', name: 'Vuex', proficiency: 'advanced', icon: 'Store' },
      { id: 'redux', name: 'Redux', proficiency: 'intermediate', icon: 'Layers' },
      { id: 'npm', name: 'NPM', proficiency: 'expert', icon: 'Package' },
      { id: 'jest', name: 'Jest', proficiency: 'advanced', icon: 'TestTube' },
      { id: 'cypress', name: 'Cypress', proficiency: 'intermediate', icon: 'TestTube2' },
    ],
  },
  {
    id: 'databases',
    category: 'Database',
    title: 'Databases',
    skills: [
      { id: 'oracle', name: 'Oracle', proficiency: 'advanced', icon: 'Database' },
      { id: 'postgres', name: 'Postgres', proficiency: 'expert', icon: 'Database' },
      { id: 'h2', name: 'H2', proficiency: 'advanced', icon: 'HardDrive' },
      { id: 'redis', name: 'Redis', proficiency: 'intermediate', icon: 'Zap' },
      { id: 'bigquery', name: 'BigQuery', proficiency: 'intermediate', icon: 'Cloud' },
      { id: 'bigtable', name: 'BigTable', proficiency: 'beginner', icon: 'Table' },
    ],
  },
  {
    id: 'devops',
    category: 'DevOps & Deployment',
    title: 'DevOps & Deployment',
    skills: [
      { id: 'jenkins', name: 'Jenkins', proficiency: 'advanced', icon: 'Workflow' },
      { id: 'github-actions', name: 'Github Actions', proficiency: 'expert', icon: 'Github' },
      { id: 'docker', name: 'Docker', proficiency: 'advanced', icon: 'Container' },
      { id: 'gcp', name: 'Google Cloud', proficiency: 'advanced', icon: 'Cloud' },
      { id: 'aws', name: 'AWS', proficiency: 'intermediate', icon: 'CloudCog' },
      { id: 'otel', name: 'Otel', proficiency: 'intermediate', icon: 'Activity' },
      { id: 'micrometer', name: 'Micrometer', proficiency: 'advanced', icon: 'BarChart3' },
      { id: 'splunk', name: 'Splunk', proficiency: 'intermediate', icon: 'LineChart' },
      { id: 'datadog', name: 'Datadog', proficiency: 'intermediate', icon: 'TrendingUp' },
    ],
  },
  {
    id: 'tools-collaboration',
    category: 'Tools & Others',
    title: 'Tools & Others',
    skills: [
      { id: 'git', name: 'Git', proficiency: 'expert', icon: 'GitBranch' },
      { id: 'jira', name: 'JIRA', proficiency: 'expert', icon: 'Kanban' },
      { id: 'confluence', name: 'Confluence', proficiency: 'advanced', icon: 'BookOpen' },
      { id: 'oas', name: 'OAS 2.0', proficiency: 'advanced', icon: 'FileText' },
      { id: 'kafka', name: 'AMQ/Kafka', proficiency: 'intermediate', icon: 'MessageSquare' },
      { id: 'oauth', name: 'OAuth2', proficiency: 'advanced', icon: 'Key' },
      { id: 'jwt', name: 'JWT', proficiency: 'expert', icon: 'Lock' },
      { id: 'sonarqube', name: 'SonarQube', proficiency: 'advanced', icon: 'ScanLine' },
    ],
  },
];

// ============================================
// EDUCATION DATA
// ============================================
export const educationData = [
  {
    id: 'mca',
    degree: 'MCA',
    field: 'Master of Computer Applications',
    institution: 'University of Madras',
    period: '2016 - 2019',
    grade: '6.48 CGPA',
    achievements: [
      'Developed a cloud-based service for secure data storage',
      'Implemented double encryption with a safe key',
      'Completed advanced coursework in software engineering',
    ],
  },
  {
    id: 'bca',
    degree: 'BCA',
    field: 'Bachelor of Computer Applications',
    institution: 'Gurunanak College',
    period: '2011 - 2014',
    grade: '6.24 CGPA',
    achievements: [
      'Member of the National Honor Society',
      'Designed a webpage for internal exams',
      'Active participant in college tech events',
    ],
  },
];

// ============================================
// EMOJI MAPPINGS
// ============================================
export const emojiMappings = {
  icons: {
    CreditCard: '💳',
    TrendingUp: '📈',
    Code2: '💻',
    Network: '🌐',
    Briefcase: '💼',
  },
  sections: {
    profile: '👨‍💻',
    contact: '📞',
    email: '📧',
    phone: '📱',
    location: '📍',
    message: '💬',
    send: '🚀',
    education: '🎓',
    achievement: '🎯',
    success: '✓',
    increase: '📈',
    decrease: '📉',
    neutral: '📊',
    tool: '🔧',
    users: '👥',
    downloads: '📊',
    github: '🌿',
    npm: '📦',
    bullet: '•',
    chevron: '👉',
    point: '👆',
    photo: '📸',
    dev: '≠',
  },
};

// ============================================
// TECHNOLOGY START DATES (for experience calculation)
// ============================================
export const techStartDates = {
  // Backend
  java: '2016-06-01',
  'spring-boot': '2017-01-01',
  'spring-security': '2017-06-01',
  'rest-api': '2016-09-01',
  microservices: '2018-01-01',
  graphql: '2020-01-01',
  grpc: '2021-01-01',
  rabbitmq: '2019-01-01',
  kafka: '2020-06-01',
  // Frontend
  javascript: '2016-06-01',
  typescript: '2019-01-01',
  react: '2019-06-01',
  vue: '2018-01-01',
  vuex: '2018-01-01',
  redux: '2019-06-01',
  nextjs: '2021-01-01',
  nodejs: '2018-06-01',
  npm: '2016-06-01',
  webpack: '2018-01-01',
  vite: '2021-06-01',
  // Databases
  mysql: '2016-06-01',
  postgresql: '2017-01-01',
  mongodb: '2018-01-01',
  redis: '2019-01-01',
  h2: '2017-01-01',
  oracle: '2016-09-01',
  cassandra: '2020-01-01',
  elasticsearch: '2019-06-01',
  // DevOps & Cloud
  docker: '2018-06-01',
  kubernetes: '2020-01-01',
  aws: '2019-01-01',
  terraform: '2020-06-01',
  ansible: '2019-06-01',
  prometheus: '2020-01-01',
  grafana: '2020-01-01',
  elk: '2019-06-01',
  // Tools & Collaboration
  git: '2016-06-01',
  jenkins: '2017-01-01',
  jira: '2016-06-01',
  'github-actions': '2020-01-01',
  maven: '2016-06-01',
  gradle: '2018-01-01',
  intellij: '2016-06-01',
  oauth: '2018-01-01',
  jwt: '2017-06-01',
  sonarqube: '2018-01-01',
};

// ============================================
// EXPORT ALL DATA AS SINGLE OBJECT
// ============================================
export const portfolioData = {
  personal: personalInfo,
  ui: uiContent,
  stats: statistics,
  experience: experienceData,
  projects: projectsData,
  skills: skillsData,
  education: educationData,
  emojis: emojiMappings,
  techDates: techStartDates,
};

export default portfolioData;
