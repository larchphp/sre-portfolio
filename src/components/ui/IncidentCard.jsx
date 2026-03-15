import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const severityConfig = {
  critical: { bg: 'bg-grafana-red/10', border: 'border-grafana-red/30', text: 'text-grafana-red', label: { en: 'Critical', ru: 'Критический' } },
  major: { bg: 'bg-grafana-orange/10', border: 'border-grafana-orange/30', text: 'text-grafana-orange', label: { en: 'Major', ru: 'Мажорный' } },
  minor: { bg: 'bg-grafana-yellow/10', border: 'border-grafana-yellow/30', text: 'text-grafana-yellow', label: { en: 'Minor', ru: 'Минорный' } },
}

const categoryColors = {
  infrastructure: 'bg-grafana-blue/20 text-grafana-blue',
  database: 'bg-grafana-purple/20 text-grafana-purple',
  queue: 'bg-grafana-orange/20 text-grafana-orange',
  auth: 'bg-grafana-red/20 text-grafana-red',
  deployment: 'bg-grafana-cyan/20 text-grafana-cyan',
  performance: 'bg-grafana-yellow/20 text-grafana-yellow',
  monitoring: 'bg-grafana-green/20 text-grafana-green',
}

export default function IncidentCard({ incident, lang = 'en', labels }) {
  const [isOpen, setIsOpen] = useState(false)
  const sev = severityConfig[incident.severity]
  const totalDuration = incident.timelineSteps.reduce((sum, s) => sum + s.duration, 0)

  return (
    <motion.div
      layout
      className={`grafana-panel cursor-pointer transition-all duration-300 hover:border-grafana-muted/50 ${isOpen ? 'ring-1 ring-grafana-muted/30' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-2 mb-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${sev.bg} ${sev.border} ${sev.text}`}>
            {sev.label[lang]}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColors[incident.category]}`}>
            {incident.category}
          </span>
          <span className="text-xs text-grafana-muted ml-auto font-mono">{incident.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold mb-2 text-grafana-text">
          {incident.title[lang]}
        </h3>

        {/* Impact preview */}
        <p className="text-sm text-grafana-muted line-clamp-2">
          {incident.impact[lang]}
        </p>

        {/* MTTR badge */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-grafana-muted font-mono">
            MTTR: <span className="text-grafana-text">{incident.mttr}</span>
          </span>
          <span className="text-xs text-grafana-muted ml-auto">
            {isOpen ? '▴' : '▾'} {isOpen ? (lang === 'ru' ? 'Свернуть' : 'Collapse') : (lang === 'ru' ? 'Подробнее' : 'Details')}
          </span>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-5 border-t border-grafana-border pt-4 space-y-4">
              {/* Timeline bar */}
              <div>
                <div className="text-xs font-medium text-grafana-muted mb-2">{labels.timeline}</div>
                <div className="flex h-3 rounded-full overflow-hidden bg-grafana-bg">
                  {incident.timelineSteps.map((step, i) => {
                    const colors = {
                      detection: 'bg-grafana-red',
                      investigation: 'bg-grafana-orange',
                      resolution: 'bg-grafana-green',
                    }
                    const width = (step.duration / totalDuration) * 100
                    return (
                      <div
                        key={i}
                        className={`${colors[step.phase]} relative group`}
                        style={{ width: `${width}%` }}
                        title={`${step.phase}: ${step.duration >= 60 ? `${Math.round(step.duration / 60)}h` : `${step.duration}min`}`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-grafana-muted mt-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-grafana-red inline-block" />{labels.detection}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-grafana-orange inline-block" />{labels.investigation}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-grafana-green inline-block" />{labels.resolved}</span>
                </div>
              </div>

              {/* Impact */}
              <div>
                <div className="text-xs font-medium text-grafana-muted mb-1">{labels.impact}</div>
                <p className="text-sm text-grafana-text">{incident.impact[lang]}</p>
              </div>

              {/* Root Cause */}
              <div>
                <div className="text-xs font-medium text-grafana-muted mb-1">{labels.rca}</div>
                <p className="text-sm text-grafana-text">{incident.rca[lang]}</p>
              </div>

              {/* Resolution */}
              <div>
                <div className="text-xs font-medium text-grafana-muted mb-1">{labels.resolution}</div>
                <p className="text-sm text-grafana-text">{incident.resolution[lang]}</p>
              </div>

              {/* Prevention */}
              <div>
                <div className="text-xs font-medium text-grafana-muted mb-1">{labels.prevention}</div>
                <p className="text-sm text-grafana-text">{incident.prevention[lang]}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
