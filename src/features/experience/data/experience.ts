export interface Impact {
  metric: string;
  value: string;
  type: 'increase' | 'reduction' | 'neutral';
}

export interface Experience {
  id: string;
  designation: string;
  company: string;
  period: string;
  icon: string;
  achievements: string[];
  impact: Impact[];
}

export const experienceData: Experience[] = [
  {
    id: 'paypal',
    designation: 'Sr Software Engineer',
    company: 'PayPal',
    period: 'May 2021 - Present',
    icon: 'CreditCard',
    achievements: [
      'Resolved a product gap in webhooks, now used by 10% of merchants',
      'Implemented near-real-time analytics, increasing revenue by 0.01%',
      'Reduced spam to below 2% with various effective solutions',
      'Optimized certain API performance, improving response speed by 1.5x',
      'Achieved a 95% on-time completion rate in all initiatives',
      'Reached 70% code coverage along with JUnit 5 upgrade',
      'Improved team productivity through various process enhancements',
      'Served as Scrum Master for a quarter, achieving a 90% Say-Do ratio',
    ],
    impact: [
      { metric: 'Merchant Usage', value: '10%', type: 'increase' },
      { metric: 'API Speed', value: '1.5x', type: 'increase' },
      { metric: 'Code Coverage', value: '70%', type: 'neutral' },
    ],
  },
  {
    id: 'assetpulse',
    designation: 'Software Engineer',
    company: 'Assetpulse, Inc',
    period: 'Oct 2019 - May 2021',
    icon: 'TrendingUp',
    achievements: [
      'Revitalized a legacy product with Rest API, increasing user engagement by 2%',
      'Switched to Bluetooth Low Energy (BLE) from RFID, reducing costs by one-third',
      'Enhanced triangulation algorithm using WebSocket, improving customer conversion rates to 5%',
      'Implemented unit and functional tests, achieving 68% code coverage',
      'Reduced technical debt by 30 days',
    ],
    impact: [
      { metric: 'Cost Reduction', value: '33%', type: 'reduction' },
      { metric: 'Code Coverage', value: '68%', type: 'neutral' },
      { metric: 'Conversion Rate', value: '5%', type: 'increase' },
    ],
  },
  {
    id: 'wellspring',
    designation: 'Software Developer',
    company: 'Wellspring Software Labs',
    period: 'Feb 2018 - Sep 2019',
    icon: 'Code2',
    achievements: [
      'Configurable service locator pattern led to a 10% drop in API designs',
      'C4 diagrams helped align stakeholders 25% faster',
      'Optimized storage reduced average response time from 1200ms to 700ms',
      'Client recognition received for effectively solving a problem during a demo',
    ],
    impact: [
      { metric: 'Response Time', value: '700ms', type: 'reduction' },
      { metric: 'Stakeholder Align', value: '25%', type: 'increase' },
      { metric: 'API Efficiency', value: '10%', type: 'increase' },
    ],
  },
  {
    id: 'corenett',
    designation: 'Software Engineer',
    company: 'CoreNett Technologies',
    period: 'Jun 2016 - Dec 2017',
    icon: 'Network',
    achievements: [
      'Reduced RTB need by 10% with configurable backend systems',
      'Improved report performance by 30% using auto-paginated results',
    ],
    impact: [
      { metric: 'RTB Reduction', value: '10%', type: 'reduction' },
      { metric: 'Report Speed', value: '30%', type: 'increase' },
      { metric: 'Backend Config', value: '100%', type: 'neutral' },
    ],
  },
];
