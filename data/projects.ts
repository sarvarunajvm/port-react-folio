export type Project = {
  slug: string
  title: string
  summary: string
  impact: string[]
  stack: string[]
  links?: { demo?: string; github?: string }
}

export const projects: Project[] = [
  {
    slug: 'paypal-webhooks',
    title: 'PayPal Webhooks – Close product gap',
    summary: 'Closed webhook product gap with near real-time analytics and resilience.',
    impact: [
      'Adopted by ~10% of merchants',
      'Near real-time analytics → +0.01% revenue',
      'Spam reduced <2%',
      'API performance +1.5x',
      '95% on-time completion; 70% coverage with JUnit5',
    ],
    stack: ['Java', 'Spring', 'Kafka', 'Datadog'],
  },
  {
    slug: 'ble-migration',
    title: 'BLE Migration – Cost down, conversions up',
    summary: 'Migrated from RFID to BLE with WebSocket triangulation.',
    impact: [
      'Cost reduced by ~33%',
      '+5% conversions via WebSocket triangulation',
      'Legacy REST revamp → +2% engagement',
    ],
    stack: ['Java', 'Spring REST', 'WebSocket', 'BLE'],
  },
  {
    slug: 'storage-tuning',
    title: 'Storage Tuning – Faster responses',
    summary: 'Optimized storage and design alignment with C4 diagrams.',
    impact: [
      'Response time 1200ms → 700ms',
      'Stakeholder alignment 25% faster with C4',
    ],
    stack: ['PostgreSQL', 'Java', 'Architecture'],
  },
  {
    slug: 'port-advancer',
    title: 'Port Advancer – Self-serve networking tool',
    summary: 'CLI to enable secure port forwarding and reverse proxying in restricted networks.',
    impact: [
      'Adopted by 60+ users',
      'Hours saved weekly across the team',
    ],
    stack: ['Node.js', 'Networking'],
    links: { github: 'https://github.com/sarvarunajvm/port-advancer' },
  },
  {
    slug: 'utils-commons',
    title: 'utils-commons – Java utility suite',
    summary: 'Utilities for String, Number, Date, Collections, Zip, Blob.',
    impact: ['Developer productivity improvements'],
    stack: ['Java'],
    links: { github: 'https://github.com/sarvarunajvm/utils-commons' },
  },
  {
    slug: 'vue-embed-gist',
    title: 'vue-embed-gist – OSS contribution',
    summary: 'Contribution to package with ~270 weekly downloads.',
    impact: ['DX improvements for embedding gists'],
    stack: ['JavaScript', 'Vue'],
    links: { github: 'https://github.com/sudhanshu-15/vue-embed-gist/pull/13' },
  },
]
