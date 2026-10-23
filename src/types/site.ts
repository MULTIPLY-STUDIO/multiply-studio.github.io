import type { Discipline, Locale, LocalizedText } from './content'

export interface SectionDefinition {
  id: string
  index: string
  /** 页头导航与页内编号共用的标题。 */
  title: LocalizedText
  /** 锚点名，与 DOM id 一致。 */
  anchor: string
}

export interface NavItem {
  label: LocalizedText
  to: string
}

export interface Capability {
  index: string
  title: LocalizedText
  body: LocalizedText
  items: string[]
}

export interface ProcessStep {
  index: string
  title: LocalizedText
  body: LocalizedText
}

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export interface SiteContent {
  /** 工作室的固定事实，几乎不变。 */
  identity: {
    name: LocalizedText
    legalName: string
  }
  navigation: NavItem[]
  ui: {
    menu: LocalizedText
    close: LocalizedText
    language: LocalizedText
    skipToContent: LocalizedText
    backToTop: LocalizedText
    allProjects: LocalizedText
    copy: LocalizedText
    copied: LocalizedText
  }
  home: {
    /** 封面标题的两行文字，逐语言给出，组件不按 locale 分支拼标题。 */
    titleLines: Record<Locale, string[]>
    /** 封面标题下方的口号。 */
    slogan: LocalizedText
    /**
     * 封面下方的工作室概况。原来的做法是把地址、时区、页码拆成贴在四角的小字，
     * 那些属于装饰性文字；现在合并成正文大小的事实列表。
     */
    workLabel: LocalizedText
    workTitle: LocalizedText
    studioLabel: LocalizedText
    studioTitle: LocalizedText
    contactLabel: LocalizedText
    contactTitle: LocalizedText
  }
  work: {
    title: LocalizedText
    note: LocalizedText
    filterAll: LocalizedText
    columns: { index: LocalizedText; year: LocalizedText; project: LocalizedText; discipline: LocalizedText }
    empty: LocalizedText
  }
  project: {
    back: LocalizedText
    stack: LocalizedText
    role: LocalizedText
    platform: LocalizedText
    status: LocalizedText
    year: LocalizedText
    links: LocalizedText
    next: LocalizedText
  }
  studio: {
    title: LocalizedText
    lead: LocalizedText
    capabilityLabel: LocalizedText
    processLabel: LocalizedText
    founderLabel: LocalizedText
    founderName: string
    founderBody: LocalizedText
  }
  contact: {
    title: LocalizedText
    email: string
    socialsLabel: LocalizedText
  }
  footer: {
    legal: string
  }
  notFound: {
    title: string
    body: LocalizedText
    home: LocalizedText
    work: LocalizedText
  }
}

export interface DisciplineDefinition {
  id: Discipline | 'ALL'
  label: LocalizedText
}
