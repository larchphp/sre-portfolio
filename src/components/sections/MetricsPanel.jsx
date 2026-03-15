import { t } from '../../i18n'
import { reliabilityMetrics, scaleMetrics } from '../../data/metrics'
import MetricCard from '../ui/MetricCard'
import ScrollReveal from '../ui/ScrollReveal'

export default function MetricsPanel({ lang }) {
  return (
    <section id="metrics" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('metrics.title', lang)}
            </h2>
            <p className="text-sm text-grafana-muted">{t('metrics.subtitle', lang)}</p>
          </div>
        </ScrollReveal>

        {/* Reliability Row */}
        <ScrollReveal delay={0.1}>
          <div className="grafana-panel mb-4">
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L4 6L7 9L10 3L13 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('metrics.reliability', lang)}
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {reliabilityMetrics.map(m => (
                <MetricCard
                  key={m.id}
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  label={m.label[lang]}
                  description={m.description[lang]}
                  color={m.color}
                  trend={m.trend}
                  decimals={m.id === 'message-loss' ? 2 : m.id === 'sla' ? 1 : 0}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Scale Row */}
        <ScrollReveal delay={0.2}>
          <div className="grafana-panel">
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="8" width="3" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
                <rect x="5.5" y="5" width="3" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
                <rect x="10" y="1" width="3" height="12" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
              {t('metrics.scale', lang)}
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {scaleMetrics.map(m => (
                <MetricCard
                  key={m.id}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label[lang]}
                  description={m.description[lang]}
                  color={m.color}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
