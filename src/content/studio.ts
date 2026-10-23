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
      zh: '先把信息分层，再定组件和界面语言。组件库和栅格规则都写进代码，改版时按同一套改。',
      en: 'Information is layered first, then components and interface language follow. Component libraries and grid rules live in code, so a revision changes them in one place.',
      ja: 'まず情報を階層化し、そのあとコンポーネントとインターフェースの言語を決める。コンポーネントライブラリとグリッドの規則はコードに置き、改版は同じ場所で行う。',
    },
    items: ['DESIGN SYSTEM', 'GRID & TYPOGRAPHY', 'COMPONENT LIBRARY', 'PROTOTYPE'],
  },
  {
    index: 'C2',
    title: { zh: '移动端工程', en: 'Mobile engineering', ja: 'モバイルの実装' },
    body: {
      zh: '用 Kotlin 和 Jetpack Compose 写界面，系统服务和原生模块也自己接。锁屏、通知、小部件这类系统界面会一起适配。',
      en: 'Interfaces are written in Kotlin and Jetpack Compose, with system services and native modules handled in-house. Lock screen, notification and widget surfaces are adapted as part of the work.',
      ja: 'Kotlin と Jetpack Compose で UI を書き、システムサービスとネイティブモジュールも自前で扱う。ロック画面、通知、ウィジェットといったシステム側の表示も合わせて対応する。',
    },
    items: ['KOTLIN', 'JETPACK COMPOSE', 'MEDIA3', 'NDK / JNI'],
  },
  {
    index: 'C3',
    title: { zh: '桌面与工具', en: 'Desktop and tools', ja: 'デスクトップとツール' },
    body: {
      zh: '用 Compose Desktop 写桌面程序，打包成 MSI 或可执行文件；命令行工具和构建脚本一并交付。',
      en: 'Desktop programs are written in Compose Desktop and shipped as MSI or executables, with command-line tools and build scripts delivered alongside.',
      ja: 'Compose Desktop でデスクトップアプリを書き、MSI または実行ファイルとして配布し、コマンドラインツールとビルドスクリプトも合わせて渡す。',
    },
    items: ['COMPOSE DESKTOP', 'KMP', 'CLI TOOLING', 'PACKAGING'],
  },
  {
    index: 'C4',
    title: { zh: '前端工程', en: 'Frontend engineering', ja: 'フロントエンドの実装' },
    body: {
      zh: '用 Vue 和 TypeScript 写静态站点，构建产物直接放到静态托管上，不需要服务端。',
      en: 'Static sites are written in Vue and TypeScript; the build output goes straight onto static hosting with no server runtime.',
      ja: 'Vue と TypeScript で静的サイトを書き、ビルド成果物はそのまま静的ホスティングに置くのでサーバーは要らない。',
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
    title: { zh: '先写清楚要解决的问题', en: 'Write the problem down', ja: '問題を書き出す' },
    body: {
      zh: '把需求写成一句能判断真假的话。写不成这句，说明问题还没定下来，先不谈方案。',
      en: 'Turn the request into one sentence that can be judged true or false. If it cannot be written, the problem is not settled yet and the solution can wait.',
      ja: '要望を、真偽を判定できる一文に書き換える。この一文が書けないうちは問題が固まっていないので、解決策には進まない。',
    },
  },
  {
    index: '02',
    title: { zh: '把数据和状态定下来', en: 'Settle data and state', ja: 'データと状態を決める' },
    body: {
      zh: '确定数据从哪里来、由谁持有、什么时候变化。页面怎么画由这三件事决定，先定下来再动界面。',
      en: 'Decide where the data comes from, who owns it and when it changes. Those three answers determine the screens, so settle them before touching the interface.',
      ja: 'データがどこから来て、誰が持ち、いつ変わるのかを決める。画面の作りはこの三つで決まるので、先に固めてから UI に着手する。',
    },
  },
  {
    index: '03',
    title: { zh: '在栅格上排版', en: 'Lay out on the grid', ja: 'グリッドに配置する' },
    body: {
      zh: '按栅格定栏宽、字号层级和图形尺寸，所有元素落在同一套轴线上。',
      en: 'Set column widths, the type scale and figure sizes against the grid, so every element lands on the same axes.',
      ja: 'グリッドに沿って段組み幅、文字サイズの段階、図形の寸法を決め、すべての要素を同じ軸に載せる。',
    },
  },
  {
    index: '04',
    title: { zh: '直接写代码', en: 'Write the code', ja: 'コードを書く' },
    body: {
      zh: '按结构直接写实现，不从设计稿逐屏转译。样式在代码里定，改一次只改一处。',
      en: 'Implement against the structure directly instead of transcribing screen by screen. Styles live in the code, so a change happens in one place.',
      ja: '構造に沿って直接実装し、画面ごとに設計データを写すことはしない。スタイルはコード側で決め、変更は一か所で済ませる。',
    },
  },
  {
    index: '05',
    title: { zh: '跑检查再交付', en: 'Check before delivery', ja: '検査してから渡す' },
    body: {
      zh: '类型检查、构建、真机测试都要跑过。跑不过的不算完成。',
      en: 'Type checks, the build and device tests all have to pass. Anything that fails is not finished.',
      ja: '型検査、ビルド、実機テストをすべて通す。通らないものは完成とみなさない。',
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
