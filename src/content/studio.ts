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
 * 设计：这个站本身用了什么，怎么用的。
 *
 * 写法上只陈述构成与参数，不解释为什么好看、不写设计理念。
 * 每条给一个可核对的事实（比例、层数、来源），读者自己去判断。
 */
export const designNotes: DesignNote[] = [
  {
    index: 'D1',
    title: { zh: '构成主义', en: 'Constructivism', ja: '構成主義' },
    body: {
      zh: '矩形与直线，不用曲线。标识为两个正方形叠加，交叠处由 difference 混合算出白孔。',
      en: 'Rectangles and straight lines, no curves. The mark is two overlapping squares; the hole is a difference blend.',
      ja: '矩形と直線で、曲線は使わない。ロゴは正方形二つの重なりで、交差部は difference の合成による白い穴。',
    },
  },
  {
    index: 'D2',
    title: { zh: '瑞士国际主义', en: 'Swiss International Style', ja: 'スイス・インターナショナル' },
    body: {
      zh: '严格栅格，左轴对齐。分区靠留白与字重，不用线框与卡片。',
      en: 'Strict grid, left-axis alignment. Sections divided by whitespace and weight, not rules or cards.',
      ja: '厳密なグリッドと左軸の揃え。区切りは余白と字重で付け、罫線とカードは使わない。',
    },
  },
  {
    index: 'D3',
    title: { zh: '三色系统', en: 'Three-colour system', ja: '三色のシステム' },
    body: {
      zh: '黑、白与叠印产生的灰。灰色来自正片叠底的计算，不引入色相。',
      en: 'Black, white and greys from multiply blending. Greys are computed, no hue is introduced.',
      ja: '黒、白、乗算で生じたグレー。グレーは計算によるもので、色相は導入しない。',
    },
  },
  {
    index: 'D4',
    title: { zh: '字体', en: 'Typefaces', ja: '書体' },
    body: {
      zh: '五种自托管字体：中文正文、中文展示字、拉丁字、衬线与等宽。按实际字符集做子集，首屏加载其中两种。',
      en: 'Five self-hosted families: Chinese body, Chinese display, Latin, serif, monospace. Subset to the characters used; two load on the first screen.',
      ja: '自前配信の五書体で、中国語本文、中国語表示用、ラテン、セリフ、等幅。実際の文字に絞り込み、最初の画面では二つを読み込む。',
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
