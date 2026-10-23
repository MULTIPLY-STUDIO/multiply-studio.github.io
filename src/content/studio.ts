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
 * 设计：这个站用了什么。
 *
 * 一条一句，只陈述，不解释原理，不用比喻，不写「不是……是……」。
 */
export const designNotes: DesignNote[] = [
  {
    index: 'D1',
    title: { zh: '标识', en: 'Mark', ja: 'ロゴ' },
    body: {
      zh: '两个正方形叠加，交叠处留白。',
      en: 'Two overlapping squares, with the intersection left empty.',
      ja: '正方形二つの重なりで、重なった部分は白く抜く。',
    },
  },
  {
    index: 'D2',
    title: { zh: '版式', en: 'Layout', ja: 'レイアウト' },
    body: {
      zh: '单轴左对齐，区块之间只用留白分隔。',
      en: 'Single left axis, sections separated by whitespace only.',
      ja: '左軸を一本に揃え、区切りは余白のみで付ける。',
    },
  },
  {
    index: 'D3',
    title: { zh: '颜色', en: 'Colour', ja: '色' },
    body: {
      zh: '黑白灰三色，灰色由叠印产生。',
      en: 'Black, white and grey, with greys produced by multiply blending.',
      ja: '黒、白、グレーの三色で、グレーは乗算から生じる。',
    },
  },
  {
    index: 'D4',
    title: { zh: '字体', en: 'Type', ja: '書体' },
    body: {
      zh: '中文与拉丁文各一套字体，只保留站内用到的字。',
      en: 'One family each for Chinese and Latin, subset to the glyphs used here.',
      ja: '中国語とラテン語で各一書体、サイトで使う文字のみを収録する。',
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
