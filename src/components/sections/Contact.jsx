import { t } from '../../i18n'
import ScrollReveal from '../ui/ScrollReveal'

const contacts = [
  {
    key: 'email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
  {
    key: 'telegram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: '@your_telegram',
    href: 'https://t.me/your_telegram',
  },
  {
    key: 'linkedin',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 8V14M10 14V10.5C10 9.67 10.67 9 11.5 9C12.33 9 13 9.67 13 10.5V14M6 6H6.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    value: 'linkedin.com/in/your-profile',
    href: 'https://linkedin.com/in/your-profile',
  },
  {
    key: 'github',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 13.54 4.29 16.53 7.47 17.59C7.87 17.66 8.02 17.42 8.02 17.21V15.63C5.73 16.13 5.26 14.52 5.26 14.52C4.89 13.59 4.35 13.35 4.35 13.35C3.6 12.84 4.4 12.85 4.4 12.85C5.23 12.91 5.66 13.69 5.66 13.69C6.4 14.94 7.57 14.56 8.04 14.36C8.12 13.81 8.33 13.43 8.56 13.21C6.76 12.99 4.86 12.25 4.86 9.21C4.86 8.34 5.17 7.63 5.68 7.08C5.59 6.85 5.32 6.04 5.77 4.95C5.77 4.95 6.47 4.7 8.01 5.73C8.67 5.53 9.34 5.44 10 5.44C10.66 5.44 11.33 5.53 11.99 5.73C13.53 4.7 14.23 4.95 14.23 4.95C14.68 6.04 14.41 6.85 14.32 7.08C14.83 7.63 15.14 8.34 15.14 9.21C15.14 12.26 13.24 12.99 11.43 13.21C11.72 13.47 11.99 13.98 11.99 14.76V17.21C11.99 17.42 12.13 17.67 12.54 17.59C15.71 16.53 18 13.54 18 10C18 5.58 14.42 2 10 2Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
    value: 'github.com/your-profile',
    href: 'https://github.com/your-profile',
  },
]

export default function Contact({ lang }) {
  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('contact.title', lang)}
            </h2>
            <p className="text-sm text-grafana-muted">{t('contact.subtitle', lang)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grafana-panel">
            <div className="grafana-panel-header">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1" />
                <path d="M2 13C2 10.24 4.24 8 7 8C9.76 8 12 10.24 12 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              CONTACT INFO
            </div>
            <div className="p-6 space-y-4">
              {contacts.map(c => (
                <a
                  key={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-grafana-bg transition-colors group"
                >
                  <div className="text-grafana-muted group-hover:text-grafana-blue transition-colors">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-grafana-muted mb-0.5">{t(`contact.${c.key}`, lang)}</div>
                    <div className="text-sm text-grafana-text font-mono">{c.value}</div>
                  </div>
                </a>
              ))}

              {/* Download Resume */}
              <div className="pt-4 border-t border-grafana-border text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-grafana-blue/20 text-grafana-blue border border-grafana-blue/30 hover:bg-grafana-blue/30 transition-all text-sm font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2V11M8 11L5 8M8 11L11 8M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('contact.resume', lang)}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
