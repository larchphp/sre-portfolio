import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function SkillBar({ name, level }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="mb-3 last:mb-0">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-grafana-text font-medium">{name}</span>
        <span className="text-grafana-muted font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-grafana-bg rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-grafana-blue to-grafana-green"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  )
}
