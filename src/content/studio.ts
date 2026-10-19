import type { Capability, ProcessStep, SocialLink } from '@/types/site'

/**
 * 工作室页的结构化内容，与首页共用同一批对外口径。
 * 每条只留必要信息：一句标题 + 一句话说明。
 */
export const capabilities: Capability[] = [
  {
    index: 'C1',
    title: { zh: '产品与界面系统', en: 'Product and interface systems', ja: 'プロダクトとインターフェースシステム' },
    body: {
      zh: '做信息架构、组件库和界面语言。',
      en: 'Covers information architecture, component libraries and interface language.',
      ja: '情報設計、コンポーネントライブラリ、インターフェースの言語を扱う。',
    },
    items: ['DESIGN SYSTEM', 'GRID & TYPOGRAPHY', 'COMPONENT LIBRARY', 'PROTOTYPE'],
  },
  {
    index: 'C2',
    title: { zh: '移动端工程', en: 'Mobile engineering', ja: 'モバイルの実装' },
    body: {
      zh: '用 Kotlin 和 Jetpack Compose，包含系统服务和原生模块。',
      en: 'Built with Kotlin and Jetpack Compose, including system services and native modules.',
      ja: 'Kotlin と Jetpack Compose で実装し、システムサービスとネイティブモジュールも含む。',
    },
    items: ['KOTLIN', 'JETPACK COMPOSE', 'MEDIA3', 'NDK / JNI'],
  },
  {
    index: 'C3',
    title: { zh: '桌面与工具', en: 'Desktop and tools', ja: 'デスクトップとツール' },
    body: {
      zh: '用 Compose Desktop 和命令行工具。',
      en: 'Built with Compose Desktop and command-line tools.',
      ja: 'Compose Desktop とコマンドラインツールで実装する。',
    },
    items: ['COMPOSE DESKTOP', 'KMP', 'CLI TOOLING', 'PACKAGING'],
  },
  {
    index: 'C4',
    title: { zh: '前端工程', en: 'Frontend engineering', ja: 'フロントエンドの実装' },
    body: {
      zh: '用 Vue 和 TypeScript 做静态站点和交互页面。',
      en: 'Static sites and interactive pages built with Vue and TypeScript.',
      ja: 'Vue と TypeScript で静的サイトとインタラクティブなページをつくる。',
    },
    items: ['VUE 3', 'TYPESCRIPT', 'VITE', 'MOTION'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: { zh: '界定', en: 'Frame', ja: '定義' },
    body: {
      zh: '把问题写成一句能判断真假的话。',
      en: 'Write the problem as a sentence that can be judged true or false.',
      ja: '問題を、真偽を判定できる一文に書き換える。',
    },
  },
  {
    index: '02',
    title: { zh: '结构', en: 'Structure', ja: '構造' },
    body: {
      zh: '确定数据、状态和页面之间的关系。',
      en: 'Decide how data, state and screens relate.',
      ja: 'データ、状態、画面の関係を決める。',
    },
  },
  {
    index: '03',
    title: { zh: '形态', en: 'Form', ja: '造形' },
    body: {
      zh: '在栅格上排版式、字阶和几何。',
      en: 'Lay out the grid, type scale and geometry.',
      ja: 'グリッドの上にレイアウト、文字サイズの段階、幾何を配置する。',
    },
  },
  {
    index: '04',
    title: { zh: '实现', en: 'Build', ja: '実装' },
    body: {
      zh: '直接写代码，不从设计稿转译。',
      en: 'Write the code directly rather than translating a design file.',
      ja: '設計データを写すのではなく、直接コードを書く。',
    },
  },
  {
    index: '05',
    title: { zh: '验证', en: 'Verify', ja: '検証' },
    body: {
      zh: '跑类型检查、构建和真机测试。',
      en: 'Run type checks, builds and device tests.',
      ja: '型検査、ビルド、実機テストを回す。',
    },
  },
]

/*
 * 对外渠道只放工作室账号：仓库是工作室的，
 * 个人频道（B 站、爱发电）不属于工作室的联系方式，不列在这里。
 */
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/MULTIPLY-STUDIO', handle: '@MULTIPLY-STUDIO' },
]
