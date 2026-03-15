import { t } from '../../i18n'
import MetricCard from '../ui/MetricCard'
import ScrollReveal from '../ui/ScrollReveal'

const statusServices = [
  { name: 'Order Service', status: 'operational' },
  { name: 'Product Service', status: 'operational' },
  { name: 'Auth Service', status: 'operational' },
  { name: 'Delivery Service', status: 'operational' },
  { name: 'Payment Service', status: 'operational' },
  { name: 'Loyalty Service', status: 'operational' },
  { name: 'API Gateway', status: 'operational' },
  { name: 'Notification Service', status: 'operational' },
]

export default function HeroDashboard({ lang }) {
  return (
    <section id="dashboard" className="pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          {/* Title block */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-grafana-green/10 text-grafana-green text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-grafana-green animate-pulse-slow" />
              SYSTEM STATUS: ALL OPERATIONAL
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {t('hero.title', lang)}
            </h1>
            <p className="text-lg md:text-xl text-grafana-muted max-w-2xl mx-auto">
              <span className="text-grafana-text font-medium">{t('hero.company', lang)}</span>
              {' — '}
              {t('hero.subtitle', lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* Stat panels */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <MetricCard
              value={50}
              suffix="+"
              label={t('hero.stats.incidents', lang)}
              color="red"
            />
            <MetricCard
              value={10}
              suffix="+"
              label={t('hero.stats.services', lang)}
              color="blue"
            />
            <MetricCard
              value={100}
              suffix="K+"
              label={t('hero.stats.events', lang)}
              color="purple"
            />
            <MetricCard
              value={99.9}
              suffix="%"
              label={t('hero.stats.sla', lang)}
              color="green"
              decimals={1}
            />
          </div>
        </ScrollReveal>

        {/* Service status bar */}
        <ScrollReveal delay={0.3}>
          <div className="grafana-panel">
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                <circle cx="7" cy="7" r="2" fill="currentColor" />
              </svg>
              SERVICE STATUS
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {statusServices.map(svc => (
                <div key={svc.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-grafana-green flex-shrink-0 animate-pulse-slow" />
                  <span className="text-grafana-muted truncate">{svc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
