import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { t } from '../../i18n'

const navItems = ['dashboard', 'incidents', 'metrics', 'stack', 'architecture', 'achievements', 'contact']

export default function Header({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-grafana-bg/95 backdrop-blur-md border-b border-grafana-border shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Name */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-grafana-green animate-pulse-slow glow-green" />
            <span className="font-mono text-sm font-semibold text-grafana-text">
              {t('header.name', lang)}
            </span>
            <span className="hidden sm:inline text-xs text-grafana-muted font-mono">
              / {t('header.role', lang)}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-3 py-1.5 text-xs font-medium text-grafana-muted hover:text-grafana-text transition-colors rounded"
              >
                {t(`header.nav.${item}`, lang)}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Status badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-grafana-green/10 text-grafana-green text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-grafana-green animate-pulse-slow" />
              {t('header.status', lang)}
            </div>

            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="px-2.5 py-1 rounded border border-grafana-border text-xs font-mono font-medium text-grafana-muted hover:text-grafana-text hover:border-grafana-muted transition-all"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-grafana-muted hover:text-grafana-text"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-grafana-panel border-b border-grafana-border px-4 py-3"
        >
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left px-3 py-2 text-sm text-grafana-muted hover:text-grafana-text transition-colors rounded"
            >
              {t(`header.nav.${item}`, lang)}
            </button>
          ))}
        </motion.nav>
      )}
    </header>
  )
}
