export const skillCategories = [
  {
    id: 'orchestration',
    titleKey: 'stack.categories.orchestration',
    icon: '⎈',
    skills: [
      { name: 'Kubernetes', level: 90 },
      { name: 'Docker', level: 95 },
      { name: 'Helm', level: 85 },
      { name: 'HPA / VPA', level: 80 },
    ],
  },
  {
    id: 'cicd',
    titleKey: 'stack.categories.cicd',
    icon: '⟳',
    skills: [
      { name: 'GitLab CI', level: 90 },
      { name: 'External Secrets Operator', level: 75 },
      { name: 'Canary Deployments', level: 70 },
      { name: 'Migration Validation', level: 85 },
    ],
  },
  {
    id: 'observability',
    titleKey: 'stack.categories.observability',
    icon: '◉',
    skills: [
      { name: 'Prometheus', level: 90 },
      { name: 'Grafana', level: 95 },
      { name: 'Loki', level: 80 },
      { name: 'Tempo', level: 75 },
      { name: 'Sentry', level: 85 },
      { name: 'OpenTelemetry', level: 70 },
    ],
  },
  {
    id: 'messaging',
    titleKey: 'stack.categories.messaging',
    icon: '⇄',
    skills: [
      { name: 'RabbitMQ', level: 90 },
      { name: 'gRPC', level: 80 },
      { name: 'REST API', level: 95 },
      { name: 'AMQP', level: 85 },
    ],
  },
  {
    id: 'databases',
    titleKey: 'stack.categories.databases',
    icon: '⊞',
    skills: [
      { name: 'MySQL / Percona', level: 85 },
      { name: 'ClickHouse', level: 75 },
      { name: 'Redis HA', level: 90 },
      { name: 'KeyDB', level: 70 },
    ],
  },
  {
    id: 'reliability',
    titleKey: 'stack.categories.reliability',
    icon: '⛊',
    skills: [
      { name: 'Retry Strategies', level: 90 },
      { name: 'Circuit Breaker', level: 85 },
      { name: 'Rate Limiting', level: 80 },
      { name: 'Distributed Locks', level: 75 },
      { name: 'Load Shedding', level: 70 },
    ],
  },
]
