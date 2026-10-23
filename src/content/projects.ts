import type { Discipline, Project } from '@/types/content'

/**
 * 工作室的公开项目。
 *
 * 数据事实来自各仓库源码与文档；任何新增条目都必须能在源项目里找到依据。
 * 数组顺序即首页与归档的展示顺序，采用策展顺序，不按时间倒序：
 * 先放旗舰项目（Flamingo），再放工具类，最后放桌面端。
 * `index` 必须与数组位置一致，`slug` 发布后不得修改。
 *
 * 正文固定六块：lead、spec、「问题」+ text、「方法」+ list。
 * 结果由 `status` 字段承担，不再单独成段。
 */
export const projects: Project[] = [
  {
    slug: 'flamingo',
    index: '01',
    year: '2026',
    span: '2024 — 2026',
    title: 'Flamingo',
    tagline: { zh: '播放本地曲库，状态同步到系统界面', en: 'Local library playback, state synced to system surfaces', ja: 'ローカルライブラリを再生し、再生状態をシステムの表示に同期する' },
    summary: {
      zh: 'Android 端本地音乐播放器。曲库扫描、队列播放、逐字歌词与锁屏歌词共用同一个 Media3 会话。',
      en: 'A local music player for Android. Scanning, queue playback, word-synced lyrics and lock-screen lyrics share one Media3 session.',
      ja: 'Android のローカル音楽プレーヤー。スキャン取り込み、キュー再生、歌詞の逐次表示、ロック画面の歌詞が同じ Media3 セッションを共有する。',
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
          zh: 'Android 端类 Apple Music 风格本地音乐播放器。',
          en: 'An Android local music player whose notification, lock screen, car display and home widget share one Media3 session.',
          ja: 'Android のローカル音楽プレーヤーであり、通知、ロック画面、車載ディスプレイ、ウィジェットが同じメディアセッションを共有する。',
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
        body: { zh: '问题', en: 'The problem', ja: '課題' },
      },
      {
        kind: 'text',
        body: {
          zh: '播放状态需要同步到通知、锁屏、车载与小部件。媒体扫描、歌单、队列与历史的读写方式不同，无法共用同一份状态。',
          en: 'Playback state has to reach the notification, lock screen, car display and widget. Media scanning, playlists, the queue and history follow different read/write patterns, so they cannot share one state store.',
          ja: '再生状態は通知、ロック画面、車載ディスプレイ、ウィジェットに同期する必要がある。メディアスキャン、プレイリスト、キュー、履歴は読み書きの方式が異なり、同じ状態管理にまとめられない。',
        },
      },
      {
        kind: 'heading',
        body: { zh: '方法', en: 'The approach', ja: 'アプローチ' },
      },
      {
        kind: 'list',
        items: [
          { zh: '双 ExoPlayer 交叉淡化，仅在队列自然推进时生效', en: 'Two ExoPlayer instances crossfade, only on natural queue advance.', ja: '2 つの ExoPlayer をクロスフェードさせ、自然にキューが進む場合だけ適用する。' },
          { zh: '逐字歌词按时间轴推进，解析与渲染分离', en: 'Word-synced lyrics advance along a timeline, with parsing and rendering kept apart.', ja: '歌詞は時間軸に沿って逐次表示し、解析と描画を分離する。' },
          { zh: '锁屏歌词适配 ColorOS 与 vivo', en: 'Lock-screen lyrics work on ColorOS and vivo.', ja: 'ロック画面の歌詞は ColorOS と vivo に対応している。' },
          { zh: 'MSS 人声分离失败时回退至 dry PCM', en: 'MSS vocal separation falls back to dry PCM when it fails.', ja: 'MSS のボーカル分離に失敗したときは dry PCM にフォールバックする。' },
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
    tagline: { zh: '哔哩哔哩视频解析与下载', en: 'Bilibili video parsing and download', ja: 'Bilibili 動画の解析とダウンロード' },
    summary: {
      zh: 'Android 端哔哩哔哩视频解析与下载工具。弹幕与字幕单独处理，BV 与 AV 号在本地换算。',
      en: 'An Android tool for parsing and downloading Bilibili video. Danmaku and subtitles are handled separately, and BV and AV convert locally.',
      ja: 'Android 向けの Bilibili 動画の解析とダウンロードツール。弾幕と字幕は個別に処理し、BV と AV はローカルで換算する。',
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
          zh: 'Android 端哔哩哔哩视频解析与下载工具，解析流程统一。',
          en: 'An Android tool that parses and downloads Bilibili video, with three input routes into one parsing flow.',
          ja: 'Android 向けの Bilibili 動画の解析とダウンロードツールであり、3 つの入力方法が同じ解析フローを通る。',
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
        body: { zh: '问题', en: 'The problem', ja: '課題' },
      },
      {
        kind: 'text',
        body: {
          zh: '投稿与番剧的接口、鉴权、分片结构不同，输入只有一个链接。音视频分为两条流，下载后需要合成 MP4。',
          en: 'Uploads and bangumi use different endpoints, authorisation and segment layouts, while the user supplies one link. Audio and video arrive as two streams and have to become one MP4.',
          ja: '投稿と番組の API、認証、セグメント構造はそれぞれ異なるが、ユーザーが渡すのは 1 本のリンクだけ。音声と映像は 2 本のストリームで、ダウンロード後に 1 つの MP4 へ合成する必要がある。',
        },
      },
      {
        kind: 'heading',
        body: { zh: '方法', en: 'The approach', ja: 'アプローチ' },
      },
      {
        kind: 'list',
        items: [
          { zh: '手动输入、剪贴板与分享共用同一个解析器', en: 'Manual input, the clipboard and share intents all reach one parser.', ja: '手動入力、クリップボード、共有のいずれも同じパーサーに入る。' },
          { zh: 'WBI 签名本地计算', en: 'WBI signatures are computed locally.', ja: 'WBI 署名はローカルで計算する。' },
          { zh: '自研 muxer 将音视频两条轨合成 MP4', en: 'A muxer implemented in the project joins the audio and video tracks into one MP4.', ja: '音声と映像の 2 トラックは、プロジェクト内で実装した muxer が 1 つの MP4 に合成する。' },
          { zh: 'b23 短链解析，本地换算 BV 与 AV 号', en: 'b23 links are expanded first, and BV and AV convert locally.', ja: 'b23 の短縮リンクを先に展開し、BV と AV はローカルで換算する。' },
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
    tagline: { zh: '课堂点名与分组抽取工具', en: 'A desktop tool for classroom roll-call and group draws', ja: '授業の点名とグループ抽選ツール' },
    summary: {
      zh: 'Compose Desktop 编写的课堂抽取工具。单组与多组抽取、分组管理与设置存放于本地 TOML。',
      en: 'A Compose Desktop classroom tool. Single- and multi-group draws, group management and settings live in local TOML.',
      ja: 'Compose Desktop で作った授業用の抽選ツール。1 グループの抽選、複数グループの抽選、グループ管理、設定はローカルの TOML に保存する。',
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
          en: 'A Windows desktop tool for classroom roll-call and group draws, keeping results and rosters in one local config.',
          ja: 'Windows デスクトップの点名とグループ抽選ツールであり、抽選結果と名簿は同じローカル設定に保存する。',
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
        body: { zh: '问题', en: 'The problem', ja: '課題' },
      },
      {
        kind: 'text',
        body: {
          zh: '支持从文本、表格或聊天记录等多种途径导入名单。支持多种抽取方式。',
          en: 'Rosters arrive as text, spreadsheets or chat logs in inconsistent formats. A session may draw one group or several, and the result has to stay on screen.',
          ja: '名簿はテキスト、表計算、チャットログなどの形式で届くことが多く、書式は統一されていない。1 回の授業で 1 グループだけを抽選することも複数グループを抽選することもあり、結果は画面に残したままにする必要がある。',
        },
      },
      {
        kind: 'heading',
        body: { zh: '方法', en: 'The approach', ja: 'アプローチ' },
      },
      {
        kind: 'list',
        items: [
          { zh: '设置与分组存放于 config/*.toml', en: 'Settings and groups live in config/*.toml.', ja: '設定とグループは config/*.toml に保存する。' },
          { zh: '单组与多组的计数是两个独立的 key', en: 'Single- and multi-group counts are two separate keys.', ja: '1 グループと複数グループのカウントは別々のキーで持つ。' },
          { zh: '抽取时每 50 ms 轮换一次，停止时确定结果', en: 'Names rotate every 50 ms while drawing and settle when stopped.', ja: '抽選中は 50 ms ごとに切り替え、停止した時点で結果を確定する。' },
          { zh: '两栏的 rotationY 固定为 ±10°', en: 'Both columns keep a fixed rotationY of ±10°.', ja: '2 列の rotationY は±10°で固定する。' },
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
    tagline: { zh: '界面重做成 Material You，内核沿用上游', en: 'A Material You interface on the upstream core', ja: 'Material You で作り直したインターフェースと上流のままのコア' },
    summary: {
      zh: '基于 Clash for Android 的 Material You 分支。',
      en: 'An Android client branched from Clash for Android, with a Material You interface and foreground service support for newer system versions.',
      ja: 'Android クライアントの派生版であり、インターフェースを Material You で作り直し、配色の抽出とフォアグラウンドサービスを新しいシステムに対応させた。',
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
          en: 'A branch of Clash for Android that rebuilds the interface layer while core and config semantics stay upstream.',
          ja: 'Clash for Android の分岐で、インターフェース層を作り直し、コアと設定の意味は変えていない。',
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
        body: { zh: '问题', en: 'The problem', ja: '課題' },
      },
      {
        kind: 'text',
        body: {
          zh: '上游已停止更新。界面与权限模型早于当前 Android，较新的内核特性不在支持范围内。',
          en: 'Upstream shipped its final version and moved to long-term maintenance, with an interface and permission model that predate current Android, so newer core features are out of scope.',
          ja: '上流は最後のバージョンを出したあと長期メンテナンスに移り、インターフェースと権限モデルは現在の Android より前の設計のため、新しいコア機能は対象外となる。',
        },
      },
      {
        kind: 'heading',
        body: { zh: '方法', en: 'The approach', ja: 'アプローチ' },
      },
      {
        kind: 'list',
        items: [
          { zh: '界面独立为 design 模块', en: 'The interface is split into its own design module.', ja: 'インターフェースを独立した design モジュールに分離する。' },
          { zh: '配色取自系统 accent', en: 'Colours are taken from the system accent.', ja: '配色はシステムの accent から取る。' },
          { zh: '声明 Android 14 所需的前台服务类型', en: 'The foreground service types required by Android 14 are declared.', ja: 'Android 14 が要求するフォアグラウンドサービスの種類を宣言する。' },
          { zh: 'foss flavor 按 ABI 分别出包', en: 'The foss flavor ships per-ABI artifacts.', ja: 'foss フレーバーは ABI ごとにパッケージを出力する。' },
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
