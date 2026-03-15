import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { t } from '../../i18n'
import { services, dataStores } from '../../data/architecture'
import ScrollReveal from '../ui/ScrollReveal'

const layerColors = {
  gateway: 'border-grafana-blue bg-grafana-blue/10',
  services: 'border-grafana-green bg-grafana-green/10',
  external: 'border-grafana-orange bg-grafana-orange/10',
}

const layerTextColors = {
  gateway: 'text-grafana-blue',
  services: 'text-grafana-green',
  external: 'text-grafana-orange',
}

export default function Architecture({ lang }) {
  const [hoveredService, setHoveredService] = useState(null)

  const layers = [
    { key: 'gateway', label: lang === 'ru' ? 'API Gateway' : 'API Gateway' },
    { key: 'services', label: lang === 'ru' ? 'Микросервисы' : 'Core Services' },
    { key: 'external', label: lang === 'ru' ? 'Внешние интеграции' : 'External Integrations' },
  ]

  return (
    <section id="architecture" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('architecture.title', lang)}
            </h2>
            <p className="text-sm text-grafana-muted">{t('architecture.subtitle', lang)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grafana-panel">
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <rect x="4.5" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                <line x1="3.5" y1="6" x2="5.5" y2="8" stroke="currentColor" strokeWidth="0.75" />
                <line x1="10.5" y1="6" x2="8.5" y2="8" stroke="currentColor" strokeWidth="0.75" />
              </svg>
              SYSTEM TOPOLOGY
            </div>

            <div className="p-4 md:p-6 space-y-6">
              {/* Client layer */}
              <div className="text-center">
                <div className="inline-flex gap-4 items-center px-4 py-2 rounded-lg border border-grafana-border bg-grafana-bg">
                  <span className="text-xs font-mono text-grafana-muted">Web</span>
                  <span className="text-grafana-border">|</span>
                  <span className="text-xs font-mono text-grafana-muted">Mobile App</span>
                  <span className="text-grafana-border">|</span>
                  <span className="text-xs font-mono text-grafana-muted">Marketplaces</span>
                </div>
                <div className="flex justify-center my-2">
                  <div className="w-px h-6 bg-grafana-border" />
                </div>
              </div>

              {/* Service layers */}
              {layers.map((layer) => {
                const layerServices = services.filter(s => s.layer === layer.key)
                return (
                  <div key={layer.key}>
                    <div className={`text-xs font-mono mb-2 ${layerTextColors[layer.key]}`}>
                      {layer.label}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {layerServices.map(svc => (
                        <div
                          key={svc.id}
                          className={`relative p-3 rounded-lg border cursor-pointer transition-all duration-200 ${layerColors[svc.layer]} hover:scale-105`}
                          onMouseEnter={() => setHoveredService(svc.id)}
                          onMouseLeave={() => setHoveredService(null)}
                        >
                          <div className="text-xs font-semibold text-grafana-text mb-1">{svc.name}</div>
                          <div className="text-[10px] font-mono text-grafana-muted">{svc.tech}</div>
                          <div className="text-[10px] font-mono text-grafana-muted opacity-60">{svc.protocol}</div>

                          {/* Tooltip */}
                          <AnimatePresence>
                            {hoveredService === svc.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute z-10 left-0 right-0 top-full mt-2 p-3 rounded-lg bg-grafana-bg border border-grafana-border shadow-xl text-xs"
                              >
                                <div className="font-semibold text-grafana-text mb-1">{svc.name}</div>
                                <div className="text-grafana-muted">{svc.description[lang]}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                    {layer.key !== 'external' && (
                      <div className="flex justify-center my-3">
                        <div className="flex items-center gap-2 text-[10px] text-grafana-muted">
                          <div className="w-12 h-px bg-grafana-border" />
                          REST / gRPC / AMQP
                          <div className="w-12 h-px bg-grafana-border" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Data stores */}
              <div>
                <div className="flex justify-center my-3">
                  <div className="flex items-center gap-2 text-[10px] text-grafana-muted">
                    <div className="w-12 h-px bg-grafana-border" />
                    {t('architecture.data', lang)}
                    <div className="w-12 h-px bg-grafana-border" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dataStores.map(ds => (
                    <div key={ds.id} className="p-3 rounded-lg border border-grafana-purple/30 bg-grafana-purple/5 text-center">
                      <div className="text-lg mb-1">{ds.icon}</div>
                      <div className="text-xs font-semibold text-grafana-text">{ds.name}</div>
                      <div className="text-[10px] font-mono text-grafana-muted">{ds.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
