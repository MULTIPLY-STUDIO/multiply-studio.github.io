import type { Capability, DesignNote, SocialLink } from '@/types/site'

/**
 * 工作室页的结构化内容，与首页共用同一批对外口径。
 * 每条只留必要信息：一句标题 + 一句话说明。
 */
export const capabilities: Capability[] = [
  {
    index: 'C1',
    title: { zh: '产品与界面系统', en: 'Product and interface systems', ja: 'プロダクトとインターフェースシステム' },
    body: {
      zh: '信息架构、组件库与界面语言。组件库与栅格规则写在代码里。',
      en: 'Information architecture, component libraries and interface language. Component libraries and grid rules live in the code.',
      ja: '情報設計、コンポーネントライブラリ、インターフェースの言語。コンポーネントライブラリとグリッドの規則はコードに置く。',
    },
    items: ['DESIGN SYSTEM', 'GRID & TYPOGRAPHY', 'COMPONENT LIBRARY', 'PROTOTYPE'],
  },
  {
    index: 'C2',
    title: { zh: '移动端工程', en: 'Mobile engineering', ja: 'モバイルの実装' },
    body: {
      zh: 'Android 应用，含系统服务与原生模块。使用 Kotlin 与 Jetpack Compose。',
      en: 'Android apps including system services and native modules. Kotlin and Jetpack Compose.',
      ja: 'Android アプリで、システムサービスとネイティブモジュールを含む。Kotlin と Jetpack Compose を使用する。',
    },
    items: ['KOTLIN', 'JETPACK COMPOSE', 'MEDIA3', 'NDK / JNI'],
  },
  {
    index: 'C3',
    title: { zh: '桌面与工具', en: 'Desktop and tools', ja: 'デスクトップとツール' },
    body: {
      zh: '桌面程序与命令行工具，打包成 MSI 安装包。使用 Compose Desktop。',
      en: 'Desktop programs and command-line tools, packaged as MSI installers. Compose Desktop.',
      ja: 'デスクトップアプリとコマンドラインツールで、MSI インストーラにまとめる。Compose Desktop を使用する。',
    },
    items: ['COMPOSE DESKTOP', 'KMP', 'CLI TOOLING', 'PACKAGING'],
  },
  {
    index: 'C4',
    title: { zh: '前端工程', en: 'Frontend engineering', ja: 'フロントエンドの実装' },
    body: {
      zh: '静态站点，构建产物为静态文件。使用 Vue 与 TypeScript。',
      en: 'Static sites with static build output. Vue and TypeScript.',
      ja: '静的サイトで、ビルド成果物は静的ファイル。Vue と TypeScript を使用する。',
    },
    items: ['VUE 3', 'TYPESCRIPT', 'VITE', 'MOTION'],
  },
]

/*
 * 设计：这个站长什么样。
 *
 * 用日常说法讲清楚看到的东西，不写实现参数。
 * 读者要看的是「为什么是这样」，不是「rem 值是多少」。
 */
export const designNotes: DesignNote[] = [
  {
    index: 'D1',
    title: { zh: '标识', en: 'Mark', ja: 'ロゴ' },
    body: {
      zh: '两个正方形叠在一起，交叠的地方留一个白孔。白孔不是画上去的，是两块叠加时算出来的。',
      en: 'Two squares stacked, with a white hole where they overlap. The hole is not drawn; it falls out of the overlap.',
      ja: '正方形を二つ重ね、重なった部分に白い穴を残す。穴は描いたものではなく、重なりから生まれる。',
    },
  },
  {
    index: 'D2',
    title: { zh: '版式', en: 'Layout', ja: 'レイアウト' },
    body: {
      zh: '所有区块从左边同一条线开始，行距和留白比字号更用力。区块之间靠空白分开，不画框。',
      en: 'Every section starts on the same left line, and spacing carries more weight than type size. Sections are separated by blank space, not boxes.',
      ja: 'どのセクションも左の同じ線から始まる。字の大きさより、行間と余白で差を付ける。区切りは空白で、枠は使わない。',
    },
  },
  {
    index: 'D3',
    title: { zh: '颜色', en: 'Colour', ja: '色' },
    body: {
      zh: '只有黑、白和灰。灰是把两层黑叠起来得到的，不是调出来的。没有别的颜色。',
      en: 'Black, white and grey only. The greys come from stacking two blacks, not from a palette. No other colour.',
      ja: '黒、白、グレーだけ。グレーは黒を二層重ねて得たもので、色を選んだものではない。ほかの色は使わない。',
    },
  },
  {
    index: 'D4',
    title: { zh: '字体', en: 'Type', ja: '書体' },
    body: {
      zh: '中文和英文各有一套，大标题用粗笔画，正文用细笔画。字体文件只保留站内用到的字，打开时只加载其中两套。',
      en: 'One family for Chinese and one for Latin, heavy strokes for headings and light for body text. Only the characters used on the site are kept, and two families load up front.',
      ja: '中国語とラテン語で別の書体。見出しは太い画、本文は細い画。サイトで使う文字だけを残し、最初は二つだけを読み込む。',
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
