import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { t } from '../../i18n'
import { incidents } from '../../data/incidents'
import IncidentCard from '../ui/IncidentCard'
import ScrollReveal from '../ui/ScrollReveal'

const categories = ['all', 'infrastructure', 'database', 'queue', 'auth', 'deployment', 'performance', 'monitoring']
const severities = ['all', 'critical', 'major', 'minor']

export default function IncidentTimeline({ lang }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSeverity, setActiveSeverity] = useState('all')
  const [activeYear, setActiveYear] = useState('all')

  const years = useMemo(() => {
    const y = [...new Set(incidents.map(inc => inc.year))].sort()
    return ['all', ...y]
  }, [])

  const filtered = useMemo(() => {
    return incidents.filter(inc => {
      if (activeCategory !== 'all' && inc.category !== activeCategory) return false
      if (activeSeverity !== 'all' && inc.severity !== activeSeverity) return false
      if (activeYear !== 'all' && inc.year !== activeYear) return false
      return true
    })
  }, [activeCategory, activeSeverity, activeYear])

  const labels = {
    impact: t('incidents.labels.impact', lang),
    rca: t('incidents.labels.rca', lang),
    resolution: t('incidents.labels.resolution', lang),
    prevention: t('incidents.labels.prevention', lang),
    mttr: t('incidents.labels.mttr', lang),
    timeline: t('incidents.labels.timeline', lang),
    detection: t('incidents.labels.detection', lang),
    investigation: t('incidents.labels.investigation', lang),
    resolved: t('incidents.labels.resolved', lang),
  }

  const FilterButton = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`grafana-btn text-xs ${active ? 'grafana-btn-active' : 'grafana-btn-inactive'}`}
    >
      {children}
    </button>
  )

  return (
    <section id="incidents" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="grafana-panel">
            {/* Panel header */}
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 13H1L7 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
                <line x1="7" y1="5" x2="7" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="7" cy="11" r="0.5" fill="currentColor" />
              </svg>
              {t('incidents.title', lang)}
              <span className="text-grafana-muted ml-2">({filtered.length})</span>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-grafana-border space-y-3">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <FilterButton
                    key={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === 'all' ? t('incidents.filters.all', lang) : t(`incidents.filters.${cat}`, lang)}
                  </FilterButton>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {/* Severity filters */}
                <div className="flex gap-2 mr-4">
                  {severities.map(sev => (
                    <FilterButton
                      key={sev}
                      active={activeSeverity === sev}
                      onClick={() => setActiveSeverity(sev)}
                    >
                      {sev === 'all' ? t('incidents.filters.all', lang) : t(`incidents.severity.${sev}`, lang)}
                    </FilterButton>
                  ))}
                </div>

                {/* Year filters */}
                <div className="flex gap-2">
                  {years.map(year => (
                    <FilterButton
                      key={year}
                      active={activeYear === year}
                      onClick={() => setActiveYear(year)}
                    >
                      {year === 'all' ? (lang === 'ru' ? 'Все годы' : 'All Years') : year}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Incident list */}
            <div className="p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map(incident => (
                  <motion.div
                    key={incident.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IncidentCard incident={incident} lang={lang} labels={labels} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-12 text-grafana-muted text-sm">
                  {lang === 'ru' ? 'Инцидентов не найдено' : 'No incidents match the current filters'}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
