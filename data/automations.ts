export type Automation = {
  id: string
  title: string
  trigger: string
  actions: string[]
  tools: string[]
  impact?: { summary: string }
  link?: string
}

export const automations: Automation[] = [
  {
    id: 'port-advancer',
    title: 'Port Advancer – Self-serve port forwarding',
    trigger: 'Developer needs secure access from restricted network',
    actions: [
      'CLI triggers reverse proxy and port forwarding',
      'Validates auth and environment safety',
      'Outputs ready-to-use URLs for services',
    ],
    tools: ['Node.js', 'Networking', 'Bash'],
    impact: { summary: 'Adopted by 60+ users; weekly hours saved across team' },
    link: 'https://github.com/sarvarunajvm/port-advancer',
  },
  {
    id: 'quality-gate',
    title: 'CI Quality Gate – Coverage & checks on PR',
    trigger: 'Pull request opened or updated',
    actions: [
      'Run unit tests and coverage (JUnit5)',
      'Static analysis via SonarQube',
      'Status check blocks merge until healthy',
    ],
    tools: ['GitHub Actions', 'JUnit5', 'SonarQube'],
    impact: { summary: 'Sustained ~70% coverage; faster signal to reviewers' },
  },
  {
    id: 'anti-spam',
    title: 'Anti-Spam Guard – Reduce noise in events',
    trigger: 'Inbound signal indicates potential spam',
    actions: [
      'Apply heuristics and rate limiting',
      'Filter and quarantine suspicious events',
      'Audit trail for later review',
    ],
    tools: ['Java', 'Spring', 'Datadog'],
    impact: { summary: 'Spam reduced below 2%' },
  },
  {
    id: 'analytics-nrt',
    title: 'Near Real-time Analytics – Revenue visibility',
    trigger: 'Business event published',
    actions: [
      'Stream processing to aggregates',
      'Dashboard refresh on low-latency store',
      'Alerting on anomalies',
    ],
    tools: ['Kafka', 'BigQuery/BigTable', 'Micrometer'],
    impact: { summary: '+0.01% revenue lift; faster decision-making' },
  },
]
