import AnimatedCounter from './AnimatedCounter'

export default function MetricCard({ value, prefix = '', suffix = '', label, description, color = 'green', trend, decimals = 0 }) {
  const colorMap = {
    green: 'text-grafana-green',
    red: 'text-grafana-red',
    blue: 'text-grafana-blue',
    orange: 'text-grafana-orange',
    yellow: 'text-grafana-yellow',
    purple: 'text-grafana-purple',
    cyan: 'text-grafana-cyan',
  }

  const trendIcon = {
    up: '↑',
    down: '↓',
    stable: '→',
  }

  return (
    <div className="grafana-stat group hover:border-grafana-muted/50 transition-all duration-300">
      <div className={`text-3xl md:text-4xl font-bold font-mono ${colorMap[color] || colorMap.green} mb-2`}>
        <AnimatedCounter end={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        {trend && (
          <span className="text-lg ml-1 opacity-60">{trendIcon[trend]}</span>
        )}
      </div>
      <div className="text-sm font-medium text-grafana-text mb-1">{label}</div>
      {description && (
        <div className="text-xs text-grafana-muted">{description}</div>
      )}
    </div>
  )
}
