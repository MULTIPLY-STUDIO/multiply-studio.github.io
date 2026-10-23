import type { SiteContent } from '@/types/site'

/**
 * 站点全部面向读者的文案。组件不得内联业务文案，一律从这里取。
 *
 * 用语规范见 docs/spec/interface-copy.md：朴实通俗，陈述事实，不用比喻，
 * 不用「·」，不用「这不是……而是……」「把……变成……」这类句式。
 * 每个字段只写必要信息 —— 删掉形容词与语气，剩下的才是要说的。
 *
 * 三语规范见 docs/spec/i18n.md：三种语言是并列的一等版本，
 * 改动必须三处同时改，句数与句式性质保持一致。
 */
export const siteContent: SiteContent = {
  identity: {
    name: { zh: 'MULTIPLY 正片叠底', en: 'MULTIPLY', ja: 'MULTIPLY 正片叠底' },
    legalName: 'MULTIPLY STUDIO',
  },

  navigation: [
    { label: { zh: '首页', en: 'Home', ja: 'ホーム' }, to: '/' },
    { label: { zh: '项目', en: 'Work', ja: 'プロジェクト' }, to: '/work' },
    { label: { zh: '工作室', en: 'Studio', ja: 'スタジオ' }, to: '/studio' },
    { label: { zh: '联系', en: 'Contact', ja: 'コンタクト' }, to: '/contact' },
  ],

  ui: {
    menu: { zh: '打开导航', en: 'Open navigation', ja: 'ナビゲーションを開く' },
    close: { zh: '关闭导航', en: 'Close navigation', ja: 'ナビゲーションを閉じる' },
    language: { zh: '切换语言', en: 'Change language', ja: '言語を切り替える' },
    skipToContent: { zh: '跳到主要内容', en: 'Skip to content', ja: '本文へ進む' },
    backToTop: { zh: '返回顶部', en: 'Back to top', ja: 'ページ上部へ戻る' },
    allProjects: { zh: '全部项目', en: 'All work', ja: 'すべてのプロジェクト' },
    copy: { zh: '复制', en: 'Copy', ja: 'コピー' },
    copied: { zh: '已复制', en: 'Copied', ja: 'コピーした' },
  },

  home: {
    /**
     * 封面标题的两行文字。逐语言给出，而不是在组件里按 locale 分支：
     * 组件只负责排版，不负责决定标题写什么。
     */
    titleLines: {
      zh: ['正片', '叠底'],
      en: ['MULTI', 'PLY'],
      ja: ['正片', '叠底'],
    },
    slogan: {
      zh: '就现在，喧闹起来吧。',
      en: "Let's make some noise.",
      ja: '今こそ、騒ごう。',
    },
    workLabel: { zh: '项目', en: 'Work', ja: 'プロジェクト' },
    workTitle: { zh: '公开项目', en: 'Public work', ja: '公開プロジェクト' },
    studioLabel: { zh: '工作室', en: 'Studio', ja: 'スタジオ' },
    studioTitle: { zh: '设计与实现', en: 'Design and implementation', ja: 'デザインと実装' },
    contactLabel: { zh: '联系', en: 'Contact', ja: 'コンタクト' },
    contactTitle: { zh: '联系', en: 'Contact', ja: 'コンタクト' },
  },

  work: {
    title: { zh: '项目', en: 'Work', ja: 'プロジェクト' },
    filterAll: { zh: '全部', en: 'All', ja: 'すべて' },
    columns: {
      index: { zh: '编号', en: 'No.', ja: '番号' },
      year: { zh: '年份', en: 'Year', ja: '年' },
      project: { zh: '项目', en: 'Project', ja: 'プロジェクト' },
      discipline: { zh: '领域', en: 'Discipline', ja: '領域' },
    },
    empty: {
      zh: '该领域暂无公开项目。',
      en: 'No public projects in this area.',
      ja: 'この領域に公開中のプロジェクトはない。',
    },
  },

  project: {
    back: { zh: '返回项目列表', en: 'Back to index', ja: 'プロジェクト一覧へ戻る' },
    stack: { zh: '技术栈', en: 'Stack', ja: '技術スタック' },
    role: { zh: '负责范围', en: 'Role', ja: '担当範囲' },
    platform: { zh: '平台', en: 'Platform', ja: 'プラットフォーム' },
    status: { zh: '状态', en: 'Status', ja: '状態' },
    year: { zh: '年份', en: 'Year', ja: '年' },
    links: { zh: '链接', en: 'Links', ja: 'リンク' },
    next: { zh: '下一个项目', en: 'Next project', ja: '次のプロジェクト' },
  },

  studio: {
    title: { zh: '工作室', en: 'Studio', ja: 'スタジオ' },
    lead: {
      zh: '软件产品、界面系统与工程实现。',
      en: 'Software products, interface systems and engineering implementation.',
      ja: 'ソフトウェア製品、インターフェースシステム、実装。',
    },
    capabilityLabel: { zh: '能力', en: 'Capabilities', ja: '能力' },
    designLabel: { zh: '设计', en: 'Design', ja: 'デザイン' },
    founderLabel: { zh: '主创', en: 'Principal', ja: '主宰' },
    founderName: 'Yos-X',
    founderBody: {
      zh: '独立开发者与设计师。Android 系统功能、Compose 界面、桌面工具与前端。',
      en: 'Independent developer and designer. Android platform features, Compose interfaces, desktop tools and frontend.',
      ja: '独立した開発者兼デザイナー。Android のプラットフォーム機能、Compose のインターフェース、デスクトップツール、フロントエンド。',
    },
  },

  contact: {
    title: { zh: '联系', en: 'Contact', ja: 'コンタクト' },
    email: 'multiply-studio@outlook.com',
    socialsLabel: { zh: '其他渠道', en: 'Elsewhere', ja: 'その他の窓口' },
  },

  footer: {
    legal: '© 2026 MULTIPLY STUDIO',
  },

  notFound: {
    title: '404',
    body: { zh: '该地址无对应页面。', en: 'No page at this address.', ja: 'このアドレスにページはない。' },
    home: { zh: '返回首页', en: 'Back to home', ja: 'ホームへ戻る' },
    work: { zh: '查看项目', en: 'View work', ja: 'プロジェクトを見る' },
  },
}
