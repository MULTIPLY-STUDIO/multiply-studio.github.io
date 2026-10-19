import { siteContent } from '@/content/site'
import type { Locale } from '@/types/content'

/**
 * 文档标题。
 *
 * 标题由内容层拼出来，而不是写死在路由表里 —— 否则每加一门语言，
 * 都要回头把 `meta.title` 里的「项目 / Work」再补一段日文。
 * 路由只声明「这是哪个页面」（`meta.titleKey`），怎么写交给这里。
 */
export type TitleKey = 'home' | 'work' | 'project' | 'studio' | 'contact' | 'not-found'

const brand = (locale: Locale) => siteContent.identity.name[locale]

const patterns: Record<TitleKey, (locale: Locale) => string> = {
  /** 首页标题就是站名本身，不附加任何定位语。 */
  home: (locale) => brand(locale),
  work: (locale) => `${siteContent.work.title[locale]} — ${brand(locale)}`,
  project: (locale) => `${siteContent.work.title[locale]} — ${brand(locale)}`,
  studio: (locale) => `${siteContent.studio.title[locale]} — ${brand(locale)}`,
  contact: (locale) => `${siteContent.contact.title[locale]} — ${brand(locale)}`,
  'not-found': (locale) => `404 — ${brand(locale)}`,
}

export const documentTitle = (key: unknown, locale: Locale): string => {
  if (typeof key === 'string' && key in patterns) {
    return patterns[key as TitleKey](locale)
  }
  return brand(locale)
}
