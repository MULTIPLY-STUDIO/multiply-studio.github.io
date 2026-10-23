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
      zh: '信息按层级组织，组件与界面语言照这套层级定。组件库与栅格规则写在代码里。',
      en: 'Information is organised in layers, and components and interface language follow those layers. Component libraries and grid rules live in the code.',
      ja: '情報を階層に分け、コンポーネントとインターフェースの言語はその階層に合わせて決める。コンポーネントライブラリとグリッドの規則はコードに置く。',
    },
    items: ['DESIGN SYSTEM', 'GRID & TYPOGRAPHY', 'COMPONENT LIBRARY', 'PROTOTYPE'],
  },
  {
    index: 'C2',
    title: { zh: '移动端工程', en: 'Mobile engineering', ja: 'モバイルの実装' },
    body: {
      zh: '界面使用 Kotlin 与 Jetpack Compose 写，系统服务与原生模块也在实现范围内。',
      en: 'Interfaces are written in Kotlin and Jetpack Compose, and system services and native modules are part of the scope.',
      ja: 'UI は Kotlin と Jetpack Compose で書き、システムサービスとネイティブモジュールも実装範囲に含む。',
    },
    items: ['KOTLIN', 'JETPACK COMPOSE', 'MEDIA3', 'NDK / JNI'],
  },
  {
    index: 'C3',
    title: { zh: '桌面与工具', en: 'Desktop and tools', ja: 'デスクトップとツール' },
    body: {
      zh: '桌面程序使用 Compose Desktop 写，打包成 MSI 安装包，命令行工具与构建脚本一并提供。',
      en: 'Desktop programs are written in Compose Desktop, packaged as MSI installers, and delivered with command-line tools and build scripts.',
      ja: 'デスクトップアプリは Compose Desktop で書き、MSI インストーラにまとめ、コマンドラインツールとビルドスクリプトも合わせて渡す。',
    },
    items: ['COMPOSE DESKTOP', 'KMP', 'CLI TOOLING', 'PACKAGING'],
  },
  {
    index: 'C4',
    title: { zh: '前端工程', en: 'Frontend engineering', ja: 'フロントエンドの実装' },
    body: {
      zh: '站点使用 Vue 与 TypeScript 写，构建产物是一组静态文件，放到静态托管上直接运行。',
      en: 'Sites are written in Vue and TypeScript, and the build output is a set of static files that runs directly on static hosting.',
      ja: 'サイトは Vue と TypeScript で書き、ビルド成果物は静的ファイル一式で、静的ホスティングに置けばそのまま動く。',
    },
    items: ['VUE 3', 'TYPESCRIPT', 'VITE', 'MOTION'],
  },
]

/*
 * 流程：每一步都写「具体做了什么、做完能确认什么」，不写格言。
 *
 * 之前五条是「界定／结构／形态／实现／验证」各配一句四字或短句，
 * 句子之间结构一致、信息量接近零，读起来像从方法论模板里抄的。
 * 现在每条给出可核对的动作与判据，标题也从单字改成动宾短语。
 */
export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: { zh: '先写清楚问题', en: 'Write the problem down', ja: '問題を書き出す' },
    body: {
      zh: '需求写成一句话，这句话需要能够验证。',
      en: 'The requirement is written as one sentence, and that sentence has to be verifiable.',
      ja: '要件を一文に書き、その一文は検証できるものでなければならない。',
    },
  },
  {
    index: '02',
    title: { zh: '确定数据与状态', en: 'Settle data and state', ja: 'データと状態を決める' },
    body: {
      zh: '数据从哪里来、由谁持有、什么时候变化。这三件事定下来之后才能动界面。',
      en: 'Where the data comes from, who owns it and when it changes. The interface waits until those three are settled.',
      ja: 'データがどこから来て、誰が持ち、いつ変わるのか。この三つが決まってから UI に着手する。',
    },
  },
  {
    index: '03',
    title: { zh: '按栅格排版', en: 'Lay out on the grid', ja: 'グリッドに配置する' },
    body: {
      zh: '栏宽、字号、图形尺寸都按同一套栅格计算。',
      en: 'Column widths, type sizes and figure dimensions are calculated from one grid.',
      ja: '段組み幅、文字サイズ、図形の寸法は同じグリッドから算出する。',
    },
  },
  {
    index: '04',
    title: { zh: '直接写代码', en: 'Write the code', ja: 'コードを書く' },
    body: {
      zh: '界面按结构直接写成代码，不经过设计稿逐屏还原。样式写在一个文件里。',
      en: 'The interface is written as code against the structure, without transcribing a design file screen by screen. Styles live in one file.',
      ja: 'インターフェースは構造に沿って直接コードとして書き、設計データを画面ごとに写さない。スタイルは一つのファイルに置く。',
    },
  },
  {
    index: '05',
    title: { zh: '交付前跑完检查', en: 'Pass the checks before delivery', ja: '受け渡し前に検査を通す' },
    body: {
      zh: '类型检查、构建、真机测试各跑一遍，三项都通过才算完成。',
      en: 'Type checks, the build and device tests each run once, and the work counts as done when all three pass.',
      ja: '型検査、ビルド、実機テストをそれぞれ一度通し、三つすべてが通った時点で完成とする。',
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
