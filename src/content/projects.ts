import type { Discipline, Project } from '@/types/content'

/**
 * 工作室的公开项目。
 *
 * 数据事实来自各仓库源码与文档；任何新增条目都必须能在源项目里找到依据。
 * 数组顺序即首页与归档的展示顺序，采用策展顺序，不按时间倒序：
 * 先放旗舰项目（Flamingo），再放工具类，最后放桌面端。
 * `index` 必须与数组位置一致，`slug` 发布后不得修改。
 *
 * 正文固定三块：lead（是什么）、spec（技术事实）、heading + list（支持什么）。
 * 不写「问题」「方法」——读者要的是这个软件能做什么、用什么做的，
 * 不是它解决了谁的什么痛点。功能用名词短语罗列，不写成动词句。
 */
export const projects: Project[] = [
  {
    slug: 'flamingo',
    index: '01',
    year: '2026',
    span: '2024 — 2026',
    title: 'Flamingo',
    tagline: {
      zh: 'Android 端本地音乐播放器',
      en: 'Android local music player',
      ja: 'Android ローカル音楽プレーヤー',
    },
    summary: {
      zh: 'Android 端本地音乐播放器。支持曲库扫描、队列播放、逐字歌词与锁屏歌词。',
      en: 'An Android local music player. Library scanning, queue playback, word-synced lyrics and lock-screen lyrics.',
      ja: 'Android のローカル音楽プレーヤー。ライブラリのスキャン、キュー再生、歌詞の逐次表示、ロック画面の歌詞に対応する。',
    },
    category: { zh: 'Android 本地音乐播放器', en: 'Android local music player', ja: 'Android ローカル音楽プレーヤー' },
    disciplines: ['ANDROID', 'TOOL'],
    stack: ['KOTLIN', 'JETPACK COMPOSE', 'MEDIA3', 'ROOM', 'MMKV', 'GLANCE', 'NDK'],
    role: { zh: '设计与工程', en: 'Design and engineering', ja: '設計とエンジニアリング' },
    platform: { zh: 'Android 7.0+', en: 'Android 7.0+', ja: 'Android 7.0+' },
    status: { zh: '持续维护', en: 'Maintained', ja: '継続メンテナンス' },
    plate: 'aperture',
    density: 3,
    blocks: [
      {
        kind: 'lead',
        body: {
          zh: 'Android 端本地音乐播放器。',
          en: 'An Android local music player.',
          ja: 'Android のローカル音楽プレーヤー。',
        },
      },
      {
        kind: 'spec',
        items: [
          { label: { zh: '平台', en: 'Platform', ja: 'プラットフォーム' }, value: { zh: 'Android（compileSdk 36 / minSdk 24）', en: 'Android (compileSdk 36 / minSdk 24)', ja: 'Android（compileSdk 36 / minSdk 24）' } },
          { label: { zh: '界面', en: 'Interface', ja: 'インターフェース' }, value: { zh: 'Jetpack Compose + Material 3', en: 'Jetpack Compose + Material 3', ja: 'Jetpack Compose + Material 3' } },
          { label: { zh: '播放内核', en: 'Playback core', ja: '再生コア' }, value: { zh: 'AndroidX Media3 1.4 + ExoPlayer', en: 'AndroidX Media3 1.4 + ExoPlayer', ja: 'AndroidX Media3 1.4 + ExoPlayer' } },
          { label: { zh: '持久化', en: 'Persistence', ja: '永続化' }, value: { zh: 'Room + MMKV + Preferences DataStore', en: 'Room + MMKV + Preferences DataStore', ja: 'Room + MMKV + Preferences DataStore' } },
          { label: { zh: '原生模块', en: 'Native', ja: 'ネイティブモジュール' }, value: { zh: 'libfeng_vault / libmss_engine', en: 'libfeng_vault / libmss_engine', ja: 'libfeng_vault / libmss_engine' } },
        ],
      },
      {
        kind: 'heading',
        body: { zh: '功能', en: 'Features', ja: '機能' },
      },
      {
        kind: 'list',
        items: [
          { zh: '本地曲库扫描与队列播放', en: 'Local library scanning and queue playback', ja: 'ローカルライブラリのスキャンとキュー再生' },
          { zh: '逐字歌词与锁屏歌词', en: 'Word-synced lyrics and lock-screen lyrics', ja: '歌詞の逐次表示とロック画面の歌詞' },
          { zh: '通知、锁屏、车载与小部件共用同一份播放状态', en: 'Notification, lock screen, car display and widget share one playback state', ja: '通知、ロック画面、車載ディスプレイ、ウィジェットが同じ再生状態を共有する' },
          { zh: '双 ExoPlayer 交叉淡化，仅在队列自然推进时生效', en: 'Two ExoPlayer instances crossfade, only on natural queue advance', ja: '2 つの ExoPlayer をクロスフェードさせ、自然にキューが進む場合だけ適用する' },
          { zh: 'MSS 人声分离，失败时回退至 dry PCM', en: 'MSS vocal separation, falling back to dry PCM', ja: 'MSS のボーカル分離、失敗時は dry PCM にフォールバックする' },
          { zh: '锁屏歌词适配 ColorOS 与 vivo', en: 'Lock-screen lyrics on ColorOS and vivo', ja: 'ロック画面の歌詞は ColorOS と vivo に対応' },
        ],
      },
    ],
    links: [
      { label: { zh: 'GitHub', en: 'GitHub', ja: 'GitHub' }, href: 'https://github.com/Yos-X/FlamingoHere', external: true },
    ],
  },
  {
    slug: 'bilivideo-down',
    index: '02',
    year: '2024',
    span: '2023 — 2024',
    title: 'BiliVideoDown',
    tagline: {
      zh: '哔哩哔哩视频解析下载',
      en: 'Bilibili video parsing and download',
      ja: 'Bilibili 動画の解析とダウンロード',
    },
    summary: {
      zh: 'Android 端哔哩哔哩视频解析下载工具。支持视频、音频与字幕下载。',
      en: 'An Android tool for parsing and downloading Bilibili video. It handles video, audio and subtitle downloads.',
      ja: 'Android 向けの Bilibili 動画の解析とダウンロードツール。動画、音声、字幕のダウンロードに対応する。',
    },
    category: { zh: 'Android 视频解析工具', en: 'Android video parsing tool', ja: 'Android 動画解析ツール' },
    disciplines: ['ANDROID', 'TOOL'],
    stack: ['KOTLIN', 'JETPACK COMPOSE', 'EXOPLAYER', 'OKHTTP', 'ARIA', 'MMKV', 'MEDIAMUXER'],
    role: { zh: '设计与工程', en: 'Design and engineering', ja: '設計とエンジニアリング' },
    platform: { zh: 'Android 5.0+', en: 'Android 5.0+', ja: 'Android 5.0+' },
    status: { zh: '已发布', en: 'Released', ja: '公開済み' },
    plate: 'offset',
    density: 4,
    blocks: [
      {
        kind: 'lead',
        body: {
          zh: 'Android 端哔哩哔哩视频解析下载工具。',
          en: 'An Android tool for parsing and downloading Bilibili video.',
          ja: 'Android 向けの Bilibili 動画の解析とダウンロードツール。',
        },
      },
      {
        kind: 'spec',
        items: [
          { label: { zh: '平台', en: 'Platform', ja: 'プラットフォーム' }, value: { zh: 'Android（minSdk 21 / targetSdk 34）', en: 'Android (minSdk 21 / targetSdk 34)', ja: 'Android（minSdk 21 / targetSdk 34）' } },
          { label: { zh: '界面', en: 'Interface', ja: 'インターフェース' }, value: { zh: 'Jetpack Compose + Material 3', en: 'Jetpack Compose + Material 3', ja: 'Jetpack Compose + Material 3' } },
          { label: { zh: '播放', en: 'Playback', ja: '再生' }, value: { zh: 'ExoPlayer 2.19.1', en: 'ExoPlayer 2.19.1', ja: 'ExoPlayer 2.19.1' } },
          { label: { zh: '下载', en: 'Download', ja: 'ダウンロード' }, value: { zh: 'Aria 3.8.16 + android.media.MediaMuxer', en: 'Aria 3.8.16 + android.media.MediaMuxer', ja: 'Aria 3.8.16 + android.media.MediaMuxer' } },
          { label: { zh: '存储', en: 'Storage', ja: 'ストレージ' }, value: { zh: 'MMKV', en: 'MMKV', ja: 'MMKV' } },
        ],
      },
      {
        kind: 'heading',
        body: { zh: '功能', en: 'Features', ja: '機能' },
      },
      {
        kind: 'list',
        items: [
          { zh: '视频、音频与字幕下载', en: 'Video, audio and subtitle downloads', ja: '動画、音声、字幕のダウンロード' },
          { zh: '手动输入、剪贴板与分享三种解析入口', en: 'Three ways in: manual input, clipboard and share', ja: '手動入力、クリップボード、共有の 3 つの入口' },
          { zh: '弹幕与字幕单独处理', en: 'Danmaku and subtitles handled separately', ja: '弾幕と字幕を個別に扱う' },
          { zh: 'WBI 签名本地计算', en: 'WBI signatures computed locally', ja: 'WBI 署名はローカルで計算する' },
          { zh: '音视频两条轨合成 MP4', en: 'Audio and video tracks muxed into one MP4', ja: '音声と映像の 2 トラックを 1 つの MP4 に合成する' },
          { zh: 'b23 短链解析，BV 与 AV 号本地换算', en: 'b23 links parsed, BV and AV numbers converted locally', ja: 'b23 の短縮リンクを解析し、BV と AV 番号をローカルで換算する' },
        ],
      },
    ],
  },
  {
    slug: 'classcall',
    index: '03',
    year: '2025',
    span: '2023 — 2025',
    title: 'ClassCall',
    tagline: {
      zh: '课堂点名与分组抽取',
      en: 'Classroom roll-call and group draws',
      ja: '授業の点名とグループ抽選',
    },
    summary: {
      zh: 'Windows 端点名与分组抽取工具。支持从文本、表格或聊天记录导入名单。',
      en: 'A Windows desktop tool for roll-call and group draws. Rosters import from text, spreadsheets or chat logs.',
      ja: 'Windows デスクトップの点名とグループ抽選ツール。名簿はテキスト、表計算、チャットログから取り込める。',
    },
    category: { zh: 'Windows 桌面抽取工具', en: 'Windows desktop selection tool', ja: 'Windows デスクトップ抽選ツール' },
    disciplines: ['DESKTOP'],
    stack: ['KOTLIN', 'COMPOSE DESKTOP', 'KMP', 'VOYAGER', 'TOML', 'JAVAFX'],
    role: { zh: '设计与工程', en: 'Design and engineering', ja: '設計とエンジニアリング' },
    platform: { zh: 'Windows 桌面', en: 'Windows desktop', ja: 'Windows デスクトップ' },
    status: { zh: '运行中', en: 'In use', ja: '稼働中' },
    plate: 'grid',
    density: 2,
    blocks: [
      {
        kind: 'lead',
        body: {
          zh: 'Windows 端点名与分组抽取工具。',
          en: 'A Windows desktop tool for classroom roll-call and group draws.',
          ja: 'Windows デスクトップの点名とグループ抽選ツール。',
        },
      },
      {
        kind: 'spec',
        items: [
          { label: { zh: '平台', en: 'Platform', ja: 'プラットフォーム' }, value: { zh: 'Windows（Compose Desktop）', en: 'Windows (Compose Desktop)', ja: 'Windows（Compose Desktop）' } },
          { label: { zh: '框架', en: 'Framework', ja: 'フレームワーク' }, value: { zh: 'Kotlin Multiplatform + Voyager', en: 'Kotlin Multiplatform + Voyager', ja: 'Kotlin Multiplatform + Voyager' } },
          { label: { zh: '配置', en: 'Config', ja: '設定' }, value: { zh: '本地 TOML（config/settings.toml、groups.toml）', en: 'Local TOML (config/settings.toml, groups.toml)', ja: 'ローカル TOML（config/settings.toml、groups.toml）' } },
          { label: { zh: '打包', en: 'Packaging', ja: 'パッケージング' }, value: { zh: 'MSI 安装包，按用户安装', en: 'MSI package, per-user install', ja: 'MSI パッケージ、ユーザー単位のインストール' } },
        ],
      },
      {
        kind: 'heading',
        body: { zh: '功能', en: 'Features', ja: '機能' },
      },
      {
        kind: 'list',
        items: [
          { zh: '从文本、表格或聊天记录导入名单', en: 'Roster import from text, spreadsheets or chat logs', ja: 'テキスト、表計算、チャットログから名簿を取り込む' },
          { zh: '单组与多组抽取', en: 'Single-group and multi-group draws', ja: '1 グループと複数グループの抽選' },
          { zh: '抽取结果与名单存放于本地 TOML', en: 'Draw results and rosters stored in local TOML', ja: '抽選結果と名簿はローカルの TOML に保存する' },
          { zh: '抽取时每 50 ms 轮换一次，停止时确定结果', en: 'Names rotate every 50 ms and settle when stopped', ja: '抽選中は 50 ms ごとに切り替え、停止した時点で結果を確定する' },
          { zh: '两栏的 rotationY 固定为 ±10°', en: 'Both columns keep a fixed rotationY of ±10°', ja: '2 列の rotationY は±10°で固定する' },
        ],
      },
    ],
  },
  {
    slug: 'clashyou',
    index: '04',
    year: '2024',
    span: '2024',
    title: 'Clash You',
    tagline: {
      zh: 'Clash for Android 的 Material You 分支',
      en: 'A Material You branch of Clash for Android',
      ja: 'Clash for Android の Material You 派生版',
    },
    summary: {
      zh: '基于 Clash for Android 的 Material You 分支。上游已停止更新。',
      en: 'A Material You branch of Clash for Android. Upstream is discontinued.',
      ja: 'Clash for Android をベースにした Material You の派生版。上流の更新は終了している。',
    },
    category: { zh: 'Android 网络客户端', en: 'Android network client', ja: 'Android ネットワーククライアント' },
    disciplines: ['ANDROID', 'TOOL'],
    stack: ['KOTLIN', 'GOLANG', 'CMAKE', 'MATERIAL 3', 'ANDROIDX', 'GRADLE'],
    role: { zh: '设计与工程', en: 'Design and engineering', ja: '設計とエンジニアリング' },
    platform: { zh: 'Android 5.0+（推荐 12.0+）', en: 'Android 5.0+ (12.0+ recommended)', ja: 'Android 5.0+（12.0+推奨）' },
    status: { zh: '上游已停更', en: 'Upstream discontinued', ja: '上流の更新終了' },
    plate: 'intersect',
    density: 3,
    blocks: [
      {
        kind: 'lead',
        body: {
          zh: '基于 Clash for Android 的 Material You 分支。',
          en: 'A Material You branch of Clash for Android.',
          ja: 'Clash for Android をベースにした Material You の派生版。',
        },
      },
      {
        kind: 'spec',
        items: [
          { label: { zh: '平台', en: 'Platform', ja: 'プラットフォーム' }, value: { zh: 'Android 5.0+', en: 'Android 5.0+', ja: 'Android 5.0+' } },
          { label: { zh: '界面', en: 'Interface', ja: 'インターフェース' }, value: { zh: 'Material You（MD3）', en: 'Material You (MD3)', ja: 'Material You（MD3）' } },
          { label: { zh: '构建', en: 'Build', ja: 'ビルド' }, value: { zh: 'Gradle + Go 子模块 + CMake', en: 'Gradle + Go submodule + CMake', ja: 'Gradle + Go サブモジュール + CMake' } },
          { label: { zh: '产物', en: 'Artifact', ja: '成果物' }, value: { zh: 'foss flavor，多 ABI', en: 'foss flavor, multi-ABI', ja: 'foss フレーバー、マルチ ABI' } },
        ],
      },
      {
        kind: 'heading',
        body: { zh: '改动', en: 'Changes', ja: '変更点' },
      },
      {
        kind: 'list',
        items: [
          { zh: '界面独立为 design 模块，内核与配置沿用上游', en: 'The interface is its own design module; core and config stay upstream', ja: 'インターフェースを独立した design モジュールに分離し、コアと設定は上流のまま' },
          { zh: '配色取自系统 accent', en: 'Colours taken from the system accent', ja: '配色はシステムの accent から取る' },
          { zh: '声明 Android 14 所需的前台服务类型', en: 'Foreground service types required by Android 14 declared', ja: 'Android 14 が要求するフォアグラウンドサービスの種類を宣言する' },
          { zh: 'foss flavor 按 ABI 分别出包', en: 'The foss flavor ships per-ABI artifacts', ja: 'foss フレーバーは ABI ごとにパッケージを出力する' },
          { zh: '上游已停止更新，较新的内核特性不在支持范围内', en: 'Upstream is discontinued, so newer core features are out of scope', ja: '上流の更新は終了しており、新しいコア機能は対象外となる' },
        ],
      },
    ],
    links: [
      { label: { zh: 'GitHub', en: 'GitHub', ja: 'GitHub' }, href: 'https://github.com/Yos-X/ClashYou', external: true },
    ],
  },
]

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)

/** 归档筛选使用的领域顺序。 */
export const disciplineOrder: Discipline[] = ['ANDROID', 'DESKTOP', 'WEB', 'TOOL']
