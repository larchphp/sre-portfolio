import { t } from '../../i18n'
import { skillCategories } from '../../data/skills'
import SkillBar from '../ui/SkillBar'
import ScrollReveal from '../ui/ScrollReveal'

export default function TechStack({ lang }) {
  return (
    <section id="stack" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('stack.title', lang)}
            </h2>
            <p className="text-sm text-grafana-muted">{t('stack.subtitle', lang)}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.1}>
              <div className="grafana-panel h-full">
                <div className="grafana-panel-header">
                  <span className="text-base">{cat.icon}</span>
                  {t(cat.titleKey, lang)}
                </div>
                <div className="p-4">
                  {cat.skills.map(skill => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
