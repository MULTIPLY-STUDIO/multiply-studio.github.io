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
 * 设计：这个站的具体参数。
 *
 * 只写数字、比例和取值，不写流派定义，也不写「不用什么」。
 * 读者要判断风格，看这些数字就够了。
 */
export const designNotes: DesignNote[] = [
  {
    index: 'D1',
    title: { zh: '标识', en: 'Mark', ja: 'ロゴ' },
    body: {
      zh: '大方块占 78.05%，小方块占 60.98%，错位 39.02%。两个正方形叠加，交叠处的白孔由 difference 混合算出，不画白块。',
      en: 'Large square at 78.05%, small at 60.98%, offset 39.02%. Two overlapping squares; the hole is a difference blend, not a drawn shape.',
      ja: '大方形 78.05%、小方形 60.98%、ずれ 39.02%。正方形二つの重なりで、交差部の白い穴は difference の合成による。',
    },
  },
  {
    index: 'D2',
    title: { zh: '栅格', en: 'Grid', ja: 'グリッド' },
    body: {
      zh: '页边距 clamp(1.25rem, 4.2vw, 5rem)，栏距 clamp(1.25rem, 2.6vw, 2.75rem)。所有区块的左边缘落在同一条线上。',
      en: 'Page margin clamp(1.25rem, 4.2vw, 5rem), gutter clamp(1.25rem, 2.6vw, 2.75rem). Every section shares one left edge.',
      ja: '余白 clamp(1.25rem, 4.2vw, 5rem)、段間 clamp(1.25rem, 2.6vw, 2.75rem)。全セクションの左端は同じ線に載る。',
    },
  },
  {
    index: 'D3',
    title: { zh: '灰度', en: 'Greys', ja: 'グレー' },
    body: {
      zh: '七个灰阶，从 #f4f4f4 到 #333333。全部由两层黑以 multiply 混合得出，调色盘里没有独立的灰色。',
      en: 'Seven steps from #f4f4f4 to #333333, all produced by multiply blending two blacks. No grey is picked by hand.',
      ja: '#f4f4f4 から #333333 までの七段階。すべて二層の黒を multiply で合成した結果で、単独のグレーは使わない。',
    },
  },
  {
    index: 'D4',
    title: { zh: '字体', en: 'Typefaces', ja: '書体' },
    body: {
      zh: '六种自托管字体，共 1.5 MB。按页面实际字符集做子集，首屏只加载其中两种。',
      en: 'Six self-hosted families, 1.5 MB in total. Each is subset to the characters used, and only two load on the first screen.',
      ja: '自前配信の六書体、合計 1.5 MB。実際に使う文字だけに絞り込み、最初の画面では二つだけを読み込む。',
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
