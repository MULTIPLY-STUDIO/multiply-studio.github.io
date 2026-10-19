import { computed, readonly, ref } from 'vue'
import { siteContent } from '@/content/site'
import { defaultLocale, findLocale, locales } from '@/app/locales'
import type { Locale, LocalizedText } from '@/types/content'

const STORAGE_KEY = 'multiply-locale'

/** 浏览器语言前缀 → 站点语言。`zh-tw` 这类带地区的标签也命中。 */
const detectLocale = (language: string): Locale => {
  const normalized = language.toLowerCase()
  const matched = locales.find((locale) =>
    locale.prefixes.some((prefix) => normalized.startsWith(prefix)),
  )
  return matched?.id ?? 'en'
}

const readInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale
  const stored = window.localStorage.getItem(STORAGE_KEY)
  // 只接受清单里存在的 id：旧版本写下的值、或被手改过的值一律忽略。
  if (stored && findLocale(stored)) return stored as Locale
  return detectLocale(window.navigator.language)
}

const locale = ref<Locale>(readInitialLocale())

const applyDocumentLang = (next: Locale) => {
  if (typeof document === 'undefined') return
  const definition = findLocale(next)
  if (definition) document.documentElement.lang = definition.htmlLang
}

applyDocumentLang(locale.value)

/**
 * 全局语言状态。`t()` 是读取本地化文案的唯一入口；
 * 组件不得直接索引 `['zh']` / `['en']` / `['ja']`。
 */
export const useLocale = () => {
  const content = computed(() => siteContent)

  const t = (value: LocalizedText): string => value[locale.value]

  const setLocale = (next: Locale) => {
    if (locale.value === next) return
    locale.value = next
    applyDocumentLang(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
      // 文案长度变化会改变页面高度，通知订阅方重新测量。
      window.dispatchEvent(new Event('multiply:locale'))
    }
  }

  return {
    locale: readonly(locale),
    content,
    t,
    setLocale,
  }
}
