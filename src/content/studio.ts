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
      zh: '版面由矩形与直线构成，不用曲线装饰。标识是两个正方形叠加，交叠处的白孔由 difference 混合算出，不绘制白块。',
      en: 'The layout is built from rectangles and straight lines, with no curved ornament. The mark is two overlapping squares; the white hole at their intersection is computed by a difference blend, not drawn as a white shape.',
      ja: '版面は矩形と直線で構成し、曲線の装飾を使わない。ロゴは正方形を二つ重ねたもので、重なり部分の白い穴は difference の合成で算出し、白い図形として描かない。',
    },
  },
  {
    index: 'D2',
    title: { zh: '瑞士国际主义', en: 'Swiss International Style', ja: 'スイス・インターナショナル' },
    body: {
      zh: '严格栅格，左轴对齐，正文与标题共用同一条起始线。分区靠留白与字重，不靠线框与卡片。',
      en: 'A strict grid with left-axis alignment; body text and headings start on the same line. Sections are separated by whitespace and weight, not by rules or cards.',
      ja: '厳密なグリッドと左軸の揃えで、本文と見出しは同じ開始線に載る。区切りは余白と字重で付け、罫線やカードでは区切らない。',
    },
  },
  {
    index: 'D3',
    title: { zh: '三色系统', en: 'Three-colour system', ja: '三色のシステム' },
    body: {
      zh: '只用黑、白与叠印产生的灰。所有灰色来自正片叠底的计算结果。',
      en: 'Only black, white and the greys produced by multiply blending. Every grey comes from the calculation, and no hue is introduced.',
      ja: '黒、白、そして乗算で生じたグレーだけを使う。グレーはすべて計算の結果で、色相は導入しない。',
    },
  },
  {
    index: 'D4',
    title: { zh: '字体', en: 'Typefaces', ja: '書体' },
    body: {
      zh: '五种自托管字体各有分工：中文正文、中文展示字、拉丁字、衬线与等宽。按页面实际用到的字符集做子集，首屏只加载其中两种。',
      en: 'Five self-hosted families, each with one job: Chinese body, Chinese display, Latin, serif and monospace. Each is subset to the characters the site actually uses, and only two load on the first screen.',
      ja: '自前で配信する五つの書体を用途別に使い分ける。中国語本文、中国語の表示用、ラテン、セリフ、等幅で、実際に使う文字だけに絞り込み、最初の画面では二つだけを読み込む。',
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
