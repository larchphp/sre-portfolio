import ru from './ru.json'
import en from './en.json'

const translations = { ru, en }

export function t(key, lang = 'en') {
  const keys = key.split('.')
  let value = translations[lang]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

export { ru, en }
