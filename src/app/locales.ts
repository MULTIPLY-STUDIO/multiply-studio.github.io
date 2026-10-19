import type { Locale } from '@/types/content'

/**
 * 站点语言清单：语言切换菜单与 `useLocale` 共用的唯一来源。
 *
 * 新增一门语言只需要在 `types/content.ts` 的 `Locale` 里加一个 id，
 * 再在这里补一条定义 —— 菜单、`<html lang>`、本地存储校验、
 * 浏览器语言推断都会自动跟上，不需要再改组件。
 */
export interface LocaleDefinition {
  id: Locale
  /** 切换菜单里显示的名字。语言切换一律用该语言自己的写法。 */
  label: string
  /** 写到 `<html lang>` 上的 BCP 47 标签。 */
  htmlLang: string
  /** 浏览器语言前缀，用于首次访问时推断。越靠前优先级越高。 */
  prefixes: string[]
}

export const locales: readonly LocaleDefinition[] = [
  { id: 'zh', label: '中文', htmlLang: 'zh-CN', prefixes: ['zh'] },
  { id: 'en', label: 'English', htmlLang: 'en', prefixes: ['en'] },
  { id: 'ja', label: '日本語', htmlLang: 'ja', prefixes: ['ja'] },
]

export const defaultLocale: Locale = 'zh'

export const findLocale = (id: string): LocaleDefinition | undefined =>
  locales.find((locale) => locale.id === id)

/**
 * 汉字文化圈语言：这些语言共用一套汉字排版参数
 * （正字距、较松的行高、展示字用狸叶黑体），拉丁语言则不用。
 */
export const isCjkLocale = (id: Locale) => id !== 'en'
