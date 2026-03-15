export default function StatusBadge({ status = 'operational' }) {
  const config = {
    operational: {
      bg: 'bg-grafana-green/10',
      text: 'text-grafana-green',
      dot: 'bg-grafana-green',
      label: 'Operational',
    },
    degraded: {
      bg: 'bg-grafana-yellow/10',
      text: 'text-grafana-yellow',
      dot: 'bg-grafana-yellow',
      label: 'Degraded',
    },
    outage: {
      bg: 'bg-grafana-red/10',
      text: 'text-grafana-red',
      dot: 'bg-grafana-red',
      label: 'Outage',
    },
  }

  const c = config[status] || config.operational

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse-slow`} />
      {c.label}
    </span>
  )
}
