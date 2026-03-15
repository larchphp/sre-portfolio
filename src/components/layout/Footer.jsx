export default function Footer({ lang }) {
  return (
    <footer className="border-t border-grafana-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-grafana-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grafana-green animate-pulse-slow" />
            <span className="font-mono">SRE Portfolio Dashboard</span>
          </div>
          <div className="font-mono">
            {lang === 'ru' ? 'Построено с' : 'Built with'} React + Vite + Tailwind
          </div>
          <div className="font-mono">
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
