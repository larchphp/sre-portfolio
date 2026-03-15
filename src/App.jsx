import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroDashboard from './components/sections/HeroDashboard'
import IncidentTimeline from './components/sections/IncidentTimeline'
import MetricsPanel from './components/sections/MetricsPanel'
import TechStack from './components/sections/TechStack'
import Architecture from './components/sections/Architecture'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'

export default function App() {
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-grafana-bg">
      <Header lang={lang} setLang={setLang} />
      <main>
        <HeroDashboard lang={lang} />
        <IncidentTimeline lang={lang} />
        <MetricsPanel lang={lang} />
        <TechStack lang={lang} />
        <Architecture lang={lang} />
        <Achievements lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
