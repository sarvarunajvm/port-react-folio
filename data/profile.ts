export const profile = {
  name: 'Saravanan Kalimuthu',
  title: 'Senior Software Engineer',
  email: 'sarvaruna@outlook.com',
  phone: '+91 979-087-0737',
  summary:
    '8+ years in Java/Full‑stack. I build reliable web apps and automations that save teams time.',
  links: {
    github: 'https://github.com/sarvarunajvm',
    linkedin: 'https://www.linkedin.com/in/saravanan-kalimuthu-01a0a9113',
    resume: '/Resume.pdf',
    calendly: '',
  },
  impact: [
    { k: 'Webhook gap closed', v: '10% merchants' },
    { k: 'API performance', v: '+1.5x' },
    { k: 'BLE migration', v: '-33% cost' },
    { k: 'Response time', v: '1200ms → 700ms' },
  ],
}

export type Experience = {
  company: string
  role: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: 'PayPal',
    role: 'Sr Software Engineer',
    period: 'May 2021 – Present',
    bullets: [
      'Closed webhook product gap → used by 10% of merchants',
      'Near real-time analytics → +0.01% revenue',
      'Reduced spam <2%; API perf +1.5x',
      '95% on-time completion; 70% coverage (JUnit5)',
      'Scrum Master quarter → 90% Say‑Do'
    ],
  },
  {
    company: 'Assetpulse, Inc',
    role: 'Software Engineer',
    period: 'Oct 2019 – May 2021',
    bullets: [
      'REST API revamp → +2% engagement',
      'RFID → BLE migration → −33% cost',
      'Triangulation via WebSocket → +5% conversions',
      '68% coverage; −30 days technical debt',
    ],
  },
  {
    company: 'Wellspring Software Labs',
    role: 'Software Developer',
    period: 'Feb 2018 – Sep 2019',
    bullets: [
      'Service locator pattern → −10% API designs',
      'C4 diagrams → 25% faster stakeholder alignment',
      'Storage tuning → 1200ms → 700ms',
    ],
  },
  {
    company: 'CoreNett Technologies',
    role: 'Software Engineer',
    period: 'Jun 2016 – Dec 2017',
    bullets: [
      'Configurable backends → −10% RTB need',
      'Auto‑paginated reports → +30% performance',
    ],
  },
]

export const skills = {
  backend: ['Java', 'Spring Boot', 'Spring Security', 'REST', 'JAX‑RS', 'SOAP', 'WebSockets', 'Hibernate/JPA', 'Maven', 'Gradle', 'JUnit', 'Mockito'],
  frontend: ['React', 'Vue', 'Node.js', 'HTML5/CSS3', 'Redux', 'Vuex', 'Jest', 'Cypress'],
  databases: ['Oracle', 'PostgreSQL', 'H2', 'Redis', 'BigQuery', 'BigTable'],
  devops: ['Jenkins', 'GitHub Actions', 'Docker', 'GCP', 'AWS', 'OpenTelemetry', 'Micrometer', 'Splunk', 'Datadog'],
  other: ['OAS 2.0', 'Kafka', 'OAuth2', 'JWT', 'SonarQube', 'Git', 'JIRA', 'Confluence']
}
