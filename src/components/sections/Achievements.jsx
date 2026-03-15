import { t } from '../../i18n'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedCounter from '../ui/AnimatedCounter'

const achievements = [
  {
    icon: '⏱',
    metric: { value: 80, suffix: '%', prefix: '' },
    title: { en: 'Reduced MTTR by 80%', ru: 'Снижение MTTR на 80%' },
    description: {
      en: 'From 2-10 hours to 30-60 minutes through observability stack implementation (Prometheus, Grafana, Loki, Tempo, Sentry).',
      ru: 'С 2-10 часов до 30-60 минут через внедрение стека наблюдаемости (Prometheus, Grafana, Loki, Tempo, Sentry).'
    },
    color: 'grafana-green',
  },
  {
    icon: '⚡',
    metric: { value: 95, suffix: '%', prefix: '' },
    title: { en: 'p99 Latency Reduced 95%', ru: 'p99 задержка снижена на 95%' },
    description: {
      en: 'Product Service p99: 20s → <1s. Isolated internal DDoS-like traffic by splitting into 3 deployment groups.',
      ru: 'Product Service p99: 20с → <1с. Изоляция внутреннего DDoS-подобного трафика разделением на 3 группы деплоя.'
    },
    color: 'grafana-blue',
  },
  {
    icon: '🔄',
    metric: { value: 10, suffix: '', prefix: '' },
    title: { en: '10-Stage CI/CD Pipeline', ru: '10-этапный CI/CD пайплайн' },
    description: {
      en: 'End-to-end pipeline: lint → test → SAST → build → migrate → canary → deploy → smoke → monitor → rollback.',
      ru: 'Полный пайплайн: lint → test → SAST → build → migrate → canary → deploy → smoke → monitor → rollback.'
    },
    color: 'grafana-cyan',
  },
  {
    icon: '📨',
    metric: { value: 0.01, suffix: '%', prefix: '<' },
    title: { en: 'Message Loss <0.01%', ru: 'Потеря сообщений <0.01%' },
    description: {
      en: '20+ queue retry strategies across 2 RabbitMQ clusters. Dead letter exchanges, exponential backoff, poison message handling.',
      ru: '20+ стратегий повторных попыток в 2 кластерах RabbitMQ. Dead letter exchanges, экспоненциальный backoff.'
    },
    color: 'grafana-purple',
  },
  {
    icon: '🚨',
    metric: { value: 50, suffix: '+', prefix: '' },
    title: { en: '50+ Incidents Resolved', ru: '50+ инцидентов решено' },
    description: {
      en: 'On-call incident response across infrastructure, databases, queues, auth, and 6 marketplace integrations.',
      ru: 'Дежурная реакция на инциденты: инфраструктура, БД, очереди, авторизация и 6 интеграций с маркетплейсами.'
    },
    color: 'grafana-red',
  },
  {
    icon: '📊',
    metric: { value: 15, suffix: '+', prefix: '' },
    title: { en: '15+ CronJobs Monitored', ru: '15+ CronJob на мониторинге' },
    description: {
      en: 'Implemented last-run-time monitoring after silent CronJob failure caused marketplace revenue drop.',
      ru: 'Внедрён мониторинг времени последнего запуска после тихого отказа CronJob, вызвавшего падение выручки маркетплейса.'
    },
    color: 'grafana-orange',
  },
]

export default function Achievements({ lang }) {
  return (
    <section id="achievements" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('achievements.title', lang)}
            </h2>
            <p className="text-sm text-grafana-muted">{t('achievements.subtitle', lang)}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="grafana-panel h-full p-5 group hover:border-grafana-muted/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{ach.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-2xl font-bold font-mono text-${ach.color} mb-1`}>
                      <AnimatedCounter
                        end={ach.metric.value}
                        prefix={ach.metric.prefix}
                        suffix={ach.metric.suffix}
                        decimals={ach.metric.value < 1 ? 2 : 0}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-grafana-text mb-2">
                      {ach.title[lang]}
                    </h3>
                    <p className="text-xs text-grafana-muted leading-relaxed">
                      {ach.description[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
