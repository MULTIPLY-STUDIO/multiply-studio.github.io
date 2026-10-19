/** 站点语言。中文为默认语言，英文与日文是并列的一等版本。 */
export type Locale = 'zh' | 'en' | 'ja'

/** 所有面向读者的文案都必须具备全部语言版本，组件不得内联业务文案。 */
export type LocalizedText = Record<Locale, string>

/** 项目归档的一级筛选口径，同时也是详情页与首页共用的分类枚举。 */
export type Discipline = 'ANDROID' | 'DESKTOP' | 'WEB' | 'TOOL'

/** 详情页正文块。阅读顺序即数组顺序，不允许组件自行重排。 */
export type ProjectBlock =
  | { kind: 'lead'; body: LocalizedText }
  | { kind: 'heading'; body: LocalizedText }
  | { kind: 'text'; body: LocalizedText }
  | { kind: 'list'; items: LocalizedText[] }
  | { kind: 'spec'; items: { label: LocalizedText; value: LocalizedText }[] }
  | { kind: 'quote'; body: LocalizedText; cite?: LocalizedText }

/** 项目封面几何图版：每个项目用一组确定性的黑白灰叠印图形代替截图。 */
export type PlateVariant = 'intersect' | 'stack' | 'aperture' | 'grid' | 'offset' | 'arc'

export interface ProjectLink {
  label: LocalizedText
  href: string
  external: boolean
}

export interface Project {
  /** 路由片段，同时用作稳定 id；发布后不得修改。 */
  slug: string
  /** 首页与归档共用的展示序号，两位数字。 */
  index: string
  year: string
  /** 起止年份，用于归档右侧的时间列。 */
  span: string
  title: string
  /** 中文副题；英文版式下会隐藏。 */
  titleCn?: string
  tagline: LocalizedText
  summary: LocalizedText
  category: LocalizedText
  disciplines: Discipline[]
  stack: string[]
  role: LocalizedText
  platform: LocalizedText
  status: LocalizedText
  plate: PlateVariant
  /** 几何图版的叠印数量，决定灰度层次。 */
  density: number
  blocks: ProjectBlock[]
  links?: ProjectLink[]
}
