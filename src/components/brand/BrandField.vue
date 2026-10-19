<script setup lang="ts">
/**
 * 标识场：两个正方形，承担开屏入场与全站版面背景。
 *
 * 交叠处的白色**由混合模式算出**，不画白块。
 *
 * ── 原理 ────────────────────────────────────────────────
 * 结构只有三层，同处一个 isolation 容器：
 *
 *   .bf-plate   白色底层，覆盖两块方块的【并集】
 *   .bf-sq--a   白色方块，mix-blend-mode: difference
 *   .bf-sq--b   白色方块，mix-blend-mode: difference
 *
 * difference 即逐通道 |backdrop − source|，在白色底(255)上：
 *
 *   第一块：|255 − 255| = 0     → 黑，读作黑正方形
 *   第二块叠在黑块上：|0 − 255| = 255 → 白，交叠处变白
 *   第二块叠在白底上：|255 − 255| = 0 → 黑，读作黑正方形
 *
 * 两块因此都是黑方块，只有交叠孔是白的。
 *
 * ── 关键约束 ────────────────────────────────────────────
 * ① 白色底层必须覆盖两块方块的**并集**。它一旦小于某个方块，方块伸出去的
 *    部分就没有 backdrop，difference 退化为原样输出白色 —— 在白纸上等于
 *    不可见，表现为「方块飞入途中只剩一块，或被裁成长方形」。
 *
 * ② 两层方块之间可以互为 backdrop（CSS Compositing L1：backdrop 包含
 *    已绘制的其他混合元素），所以第二块会正确地叠在第一块上。
 *
 * ③ isolation 放在容器上，把混合限制在标识内部，不影响页面其他层。
 *
 * ── 时间线 ──────────────────────────────────────────────
 *   ① 0   → 700ms    两块从画面右下角外、左上角外飞入，各就各位
 *   ② 700 → 1150ms   停留，白幕仍铺满，页面不可见
 *   ③ 1150→ 1850ms   标识放大并移到版面右侧，途中两块互换一次，白幕淡出
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * `intro`  首页封面：播放入场动画，落定后作为封面的底图，
     *          随封面一起滚走（绝对定位，不再是全站固定层）。
     * `static` 404 等页面：不播动画，直接作为所在容器的底图。
     * `inline` 容器内的静态小标识（工作室页主创区）。
     */
    mode?: 'intro' | 'static' | 'inline'
  }>(),
  { mode: 'static' },
)

const ENTER_MS = 700
const MOVE_MS = 700
/**
 * 窄屏的离场时长：整层渐隐，比原来 340ms 的幕布收起稍长一点。
 * 曲线与宽屏一致（easeOutExpo），写在 CSS 里。
 */
const NARROW_FADE_MS = 520
/** 窄屏：飞入落成后先停这么久，再收起幕布 */
const NARROW_HOLD_MS = 280

/**
 * 入场、移动、白幕淡出共用这一条缓动：easeOutExpo。
 * 与最初版本一致 —— 之前按数值推断换过 easeOutQuad / easeInOutCubic，
 * 观感并没有更好，已撤回。
 */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

interface Box {
  left: number
  top: number
  size: number
}

/* 标识原始几何（相对 --logo 的比例） */
const BIG = { offset: 0, ratio: 0.7805 }
const SMALL = { offset: 0.3902, ratio: 0.6098 }

/*
 * 入场只播一次。
 *
 * 装置挂在封面内部，路由来回切换会重新挂载。
 * 如果每次回来都播，用户在封面滚到一半、去别的页面再按返回时，
 * 会看到一个已经开始播的幕布盖在被滚动过的页面上 —— 没人接这段动画。
 *
 * 标记存在 sessionStorage 而不是 window 或模块作用域：
 *   - 模块作用域：开发时热更新会重新求值模块，标记被重置。
 *   - window：只活到这次文档卸载，在子页面按一次刷新就没了，
 *     再按返回首页又会重播一遍。
 *   - sessionStorage：同一个标签页内跨刷新、跨前进后退都还在，
 *     关掉标签页才清空 —— 正好等于「这次访问看过开场了」。
 */
const INTRO_FLAG = 'multiply-intro-settled'

/**
 * 本次文档里是否已经处理过入场。
 *
 * 光靠 sessionStorage 不够：站内从首页跳到子页面再按返回时，
 * 组件会重新挂载，而标记是「这次访问已经看过」这种粗粒度信息，
 * 用它挡住重播虽然也能成立，但语义绕了一圈。
 * 这里直接记「这个文档里已经处理过」，返回时不播；
 * 跨刷新、跨进后退的语义交给 sessionStorage。
 */
let introHandledInDocument = false

const introSettled = () => {
  try {
    return window.sessionStorage.getItem(INTRO_FLAG) === '1'
  } catch {
    // 隐私模式等场景下 storage 可能不可写，退化成每次进入都直接落定。
    return true
  }
}

const settleIntroFlag = () => {
  try {
    window.sessionStorage.setItem(INTRO_FLAG, '1')
  } catch {
    // 写不进去就算了：宁可下次不播，也不要因为它抛错打断入场。
  }
}

/**
 * 直接落在首页时清掉「已看过」标记，让刷新首页也能看到开场。
 *
 * 标记要跨刷新保留，是为了「在子页面刷新再返回首页」不重播；
 * 但如果这次文档本来就是从首页打开的（首次进入或原地刷新），
 * 那条规则不适用 —— 用户看的就是首页，开场应该重来一遍。
 *
 * 只在模块求值时判断一次，也就是只认这个文档的起始地址：
 * 之后在站内路由之间来回切换不会再清标记。
 */
const startedOnHome = (() => {
  if (typeof window === 'undefined') return false
  const hash = window.location.hash
  return hash === '' || hash === '#' || hash === '#/'
})()

if (startedOnHome) {
  try {
    window.sessionStorage.removeItem(INTRO_FLAG)
  } catch {
    // 清不掉就算了，退化成不播。
  }
}

const elA = ref<HTMLElement | null>(null)
const elB = ref<HTMLElement | null>(null)
const elPlate = ref<HTMLElement | null>(null)
const elRoot = ref<HTMLElement | null>(null)
const elScreen = ref<HTMLElement | null>(null)

let frame = 0
let startTime = 0
let vw = 0
let vh = 0

const isInline = () => props.mode === 'inline'

/**
 * 移动端（窄屏）不做第二阶段。
 *
 * 竖屏下正方形受视口宽度限制，放大到版面右侧的构图不成立，
 * 所以只保留第一阶段飞入，落成后幕布自下而上收起。
 */
/**
 * 方块最小边长。低于这个尺寸，标识的两个方块分不出「阶梯」，
 * 只剩一坨黑，作为封面底图不成立。
 */
const MIN_DEVICE_W = 180

/** 标识左边缘与封面文字之间至少留出的距离。 */
const CONTENT_GAP = 16

/**
 * 是否走「窄屏」分支。
 *
 * 之前按视口宽度拍了个 600px 的阈值，但只要宽度过了线、长度又够，
 * 手机竖屏其实完全放得下装置 —— 440×956 这类机器就被误判了。
 * 这里改成量真实版面：先算终态方块尺寸，再看它的左边缘
 * 会不会压到封面标题或口号。压到就不放装置，放得下就照常走两阶段。
 *
 * 结果在 measure() 里算一次并缓存：paint 每帧都要读，
 * 每帧调 getBoundingClientRect 是没必要的强制同步布局。
 */
let narrowMode = false

/** 入场是否已经结束（落定或直接落定）。结束后装置不再随视口变化重画。 */
let introFinished = false

/** 入场是否已经开始。没开始时不能画终态，否则第一帧会闪一下最终画面。 */
let introStarted = false

/** visualViewport 的 resize 监听，用于缩放结束后补一次重算。 */
let visualViewportListener: (() => void) | null = null

/** 终态方块边长。measure 里算一次，paint 每帧直接用，避免逐帧查 DOM。 */
let targetLogo = 0

const computeNarrow = () => {
  const logo = backgroundLogo()
  if (logo < MIN_DEVICE_W) return true

  const block = document.querySelector('.cover__identity')
  if (!block) return false

  /*
   * 看两块矩形是否真的相交，而不是只比水平方向。
   * 竖屏时标题块在左下、装置在上方，水平投影本来就重叠，
   * 只比 x 轴会把这种正常排布误判成冲突。
   */
  const scroll = window.scrollY
  const rect = block.getBoundingClientRect()
  const contentTop = rect.top + scroll
  const contentBottom = rect.bottom + scroll
  const layout = sideLayout(logo)
  const overlapsX = layout.ox < rect.right + CONTENT_GAP
  const overlapsY =
    layout.oy < contentBottom + CONTENT_GAP && layout.oy + logo > contentTop - CONTENT_GAP
  return overlapsX && overlapsY
}

const isNarrow = () => narrowMode

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 落成尺寸：居中、小 */
const settledLogo = () => Math.min(Math.min(vw, vh) * 0.44, 17 * 16)

/**
 * 页头高度：与 CSS 的 `clamp(3.5rem, 5.2vw, 4.5rem)` 等值。
 * CSS 与 JS 必须用同一条公式，否则装置与正文会错开十几像素。
 */
const HEADER_H = () => Math.min(Math.max(vw * 0.052, 56), 72)

/**
 * 横屏：方块最多占视口宽度的这个比例。横屏时方块通常撑满
 * 「页头下沿到屏幕底」，宽度只是兜底上限。
 */
const MAX_WIDTH_RATIO = 0.62

/**
 * 竖屏：方块最多占视口宽度的这个比例。
 *
 * 竖屏时标题块被压到左下角，装置独占上方，两者的水平投影重叠也没关系，
 * 所以不必再按「给文字留列宽」收窄 —— 只要上下不撞，方块可以做到接近整宽。
 */
const PORTRAIT_WIDTH_RATIO = 0.92

/** 竖屏：方块下沿与封面文字块上沿之间至少留出的距离。 */
const GAP_DEVICE_TEXT = 32

/**
 * 终态尺寸。
 *
 * 横屏：撑满页头下沿到屏幕底，宽度兜底。
 *
 * 竖屏：上方是一块独立区域，尺寸由「下沿不能压到标题块」反推 ——
 *   方块顶边 = 页头 + (竖带 − 方块) × 0.382
 *   要求 顶边 + 方块 ≤ 标题块顶边 − GAP
 * 解出上限后再与竖带高度、视口宽度取小。
 * 标题块越高，方块就越小；两者不会压在一起。
 */
const backgroundLogo = () => {
  const band = vh - HEADER_H()
  const block = document.querySelector('.cover__identity')

  // 横屏，或不是封面（404 等没有标题块的容器）：按老规则走。
  if (!isPortrait() || !block) {
    return Math.min(band, vw * MAX_WIDTH_RATIO)
  }

  const ratio = PORTRAIT_TOP_RATIO
  /*
   * 一律换算成文档坐标。
   * getBoundingClientRect() 是视口坐标，页面滚过之后同一个元素会读到负数，
   * 拿它算尺寸就会随滚动位置漂移 —— 表现为翻下去再翻回来，标识大小变了。
   */
  const textTop = block.getBoundingClientRect().top + window.scrollY
  const maxByText = (textTop - GAP_DEVICE_TEXT - HEADER_H() - band * ratio) / (1 - ratio)

  return Math.max(0, Math.min(band, vw * PORTRAIT_WIDTH_RATIO, maxByText))
}

interface Layout {
  logo: number
  ox: number
  oy: number
}

const centeredLayout = (logo: number): Layout => ({ logo, ox: (vw - logo) / 2, oy: (vh - logo) / 2 })

/**
 * 露出的比例：标识有这么多留在屏幕内，其余移出右边界。
 * 越大越靠左、露得越多。0.68 是手动调出来的观感值。
 */
const EXPOSE_RATIO = 0.68

/**
 * 竖屏时标识的纵向落点：不是居中，而是放在这条竖带的黄金分割处 ——
 * 从带顶往下取 0.382，整体偏上。横屏时标识通常撑满整条带，系数不起作用。
 * 这个比例与横向的露出比例是两件事，不要互相推导。
 */
const PORTRAIT_TOP_RATIO = 0.382

const isPortrait = () => vh > vw

const sideLayout = (logo: number): Layout => ({
  logo,
  ox: vw - logo * EXPOSE_RATIO,
  oy:
    HEADER_H() +
    (vh - HEADER_H() - logo) * (isPortrait() ? PORTRAIT_TOP_RATIO : 0.5),
})

const slotBox = (layout: Layout, slot: { offset: number; ratio: number }): Box => ({
  left: layout.ox + layout.logo * slot.offset,
  top: layout.oy + layout.logo * slot.offset,
  size: layout.logo * slot.ratio,
})

const place = (el: HTMLElement | null, box: Box) => {
  if (!el) return
  el.style.left = `${box.left}px`
  el.style.top = `${box.top}px`
  el.style.width = `${box.size}px`
  el.style.height = `${box.size}px`
}

/** 两块方块的并集 —— 白色底层必须盖住这个范围 */
const union = (a: Box, b: Box) => {
  const left = Math.min(a.left, b.left)
  const top = Math.min(a.top, b.top)
  const right = Math.max(a.left + a.size, b.left + b.size)
  const bottom = Math.max(a.top + a.size, b.top + b.size)
  return { left, top, width: right - left, height: bottom - top }
}

const paint = (elapsed: number) => {
  if (!elA.value || !elB.value || !elPlate.value || !elScreen.value || !elRoot.value) return

  /*
   * 两个进度严格分段，中间不重叠：
   *   enterT 在 [0, ENTER_MS) 内走完，之后恒为 1
   *   moveT  在 [ENTER_MS, ...) 才开始，之前恒为 0
   *
   * 之前写成 elapsed / ENTER_MS 与 (elapsed - ENTER_MS) / MOVE_MS 并存，
   * 在 elapsed 刚过 ENTER_MS 时 enterT 已到 1，但 moveT 还接近 0 —— 两段虽然
   * 理论上不重叠，但 enterT 的缓出曲线在末尾已近似 1，
   * 而 moveT 一旦开始就会立刻把位置拉向放大后的目标，
   * 造成第一阶段末尾那一下跳变。
   *
   * 这里把 enterT 的输入限制到 [0, ENTER_MS]，并在 HOLD 段显式保持 1，
   * 保证落定之后到第二阶段开始之间没有任何插值。
   */
  /*
   * 两个进度严格分段、互不重叠：
   *   [0, ENTER_MS)              飞入，enterT 0 -> 1
   *   [ENTER_MS, ...)            放大并互换，moveT 0 -> 1
   *
   * 飞入结束立刻接第二阶段，中间不静止。
   *
   * 第一阶段末尾的跳变来源：enterT 与 moveT 之间若有一点重叠，
   * 落定后的位置会立刻被第二阶段的终点拉走，表现为"啪"一下到位。
   */
  const enterT = easeOutExpo(clamp01(elapsed / ENTER_MS))

  /* 窄屏没有第二阶段：moveT 恒为 0，方块停在居中落成的位置 */
  const narrow = isNarrow()
  const moveRaw = narrow ? 0 : clamp01((elapsed - ENTER_MS) / MOVE_MS)
  const moveT = narrow ? 0 : easeOutExpo(moveRaw)

  const startLogo = settledLogo()

  /*
   * 两段各自只用一次缓动，且用的是同一条 easeOutExpo。
   *
   * 关键：终点几何必须用【未缓动】的值来定义，缓动只在最后一步施加。
   *   错误写法：endLayout = layoutAt(moveT)，再 lerp(enterA, endA, moveT)
   *             -> moveT 用了两次 = easeOutExpo(easeOutExpo(t))
   *             -> 起步更冲、收尾更拖，和第一阶段对不上。
   *   正确写法：endLayout 用 t = 1 的终点值，最后统一乘 moveT。
   *
   * 也不能用线性插值代替缓动 —— 那样第二阶段会匀速，与第一阶段不一致。
   */
  const startLayout = centeredLayout(startLogo)
  const endLayout = sideLayout(targetLogo)

  const vmax = Math.max(vw, vh)
  const off = 120 * (vmax / 100)

  /* 入场：从画面外飞到各自槽位 */
  const startA = slotBox(startLayout, SMALL)
  const startB = slotBox(startLayout, BIG)

  const enterA: Box = {
    left: lerp(vw, startA.left, enterT),
    top: lerp(vh, startA.top, enterT),
    size: lerp(off, startA.size, enterT),
  }
  const enterB: Box = {
    left: lerp(-off * 1.28, startB.left, enterT),
    top: lerp(-off * 1.28, startB.top, enterT),
    size: lerp(off * 1.28, startB.size, enterT),
  }

  /* 第二阶段终点：放大后的槽位，两块互换 */
  const endA = slotBox(endLayout, BIG)
  const endB = slotBox(endLayout, SMALL)

  /* 全程只用 moveT 插值一次 */
  const boxA: Box = {
    left: lerp(enterA.left, endA.left, moveT),
    top: lerp(enterA.top, endA.top, moveT),
    size: lerp(enterA.size, endA.size, moveT),
  }
  const boxB: Box = {
    left: lerp(enterB.left, endB.left, moveT),
    top: lerp(enterB.top, endB.top, moveT),
    size: lerp(enterB.size, endB.size, moveT),
  }

  place(elA.value, boxA)
  place(elB.value, boxB)

  // 白底盖住并集，并留一点余量，保证方块边缘也有 backdrop
  const u = union(boxA, boxB)
  const pad = 2
  const plate = elPlate.value
  plate.style.left = `${u.left - pad}px`
  plate.style.top = `${u.top - pad}px`
  plate.style.width = `${u.width + pad * 2}px`
  plate.style.height = `${u.height + pad * 2}px`

  /*
   * 白幕淡出：
   *   宽屏 —— 只在第二阶段中段开始揭开
   *   窄屏 —— 飞入的最后 40% 内淡出，没有第二阶段
   */
  if (narrow) {
    elScreen.value.style.opacity = '1'

    /*
     * 窄屏：飞入落成 -> 停一下 -> 整层渐隐。
     *
     * 渐隐是 CSS 动画，JS 只负责在停顿结束后挂上 is-fading-out，
     * 逐帧算进度等于换了第二条曲线。白幕与方块同处这一层，
     * 一个 opacity 同时作用在两者上，所以是「白底和 logo 一起淡掉」。
     */
    const fadeStart = ENTER_MS + NARROW_HOLD_MS
    const fading = elapsed >= fadeStart
    elRoot.value.classList.toggle('is-fading-out', fading)
    elRoot.value.classList.toggle('is-covering', !fading || elapsed < fadeStart + NARROW_FADE_MS)
    return
  }

  elRoot.value.classList.remove('is-fading-out')

  const phase2 = clamp01((elapsed - ENTER_MS) / MOVE_MS)
  // 前 35% 仍不透明，之后 65% 内淡到 0
  const fadeT = clamp01((phase2 - 0.35) / 0.65)
  elScreen.value.style.opacity = String(1 - easeOutExpo(fadeT))

  // 层级：第二阶段淡出完成前盖住页面
  elRoot.value?.classList.toggle('is-covering', phase2 < 0.98)
}

/**
 * 把标识的真实几何写入 CSS 变量，供排版避让使用。
 *
 * 页头高度在 JS 里是 clamp 后的实际值，CSS 里如果写死 4.5rem
 * 会与它差十几像素，导致正文右边界与标识左边缘错位、文字被压住。
 * 所以只在这里算一次，CSS 一律读变量。
 */
const publishGeometry = () => {
  const root = document.documentElement
  const logo = backgroundLogo()
  const layout = sideLayout(logo)
  root.style.setProperty('--brand-logo', `${logo}px`)
  root.style.setProperty('--brand-left', `${layout.ox}px`)
  root.style.setProperty('--brand-header', `${HEADER_H()}px`)

  // 装置在封面内部，正文不需要另外让位
  root.style.setProperty('--brand-inset', '0px')
}

let measuredVw = -1
let measuredVh = -1

/**
 * 用户是否正在双指缩放。
 *
 * 部分移动端浏览器在缩放时会把可视视口尺寸塞进 innerWidth/innerHeight，
 * 于是每次捏合都触发一次 resize，我们按新的「宽度」重算几何 ——
 * 标识跟着变小、位移，再缩一点就被判成窄屏直接淡出。
 *
 * visualViewport.scale 才是缩放手势的真实状态：只要大于 1 就说明
 * 用户在看放大后的画面，这时任何视口变化都不该改动版面几何。
 */
const isPinchZoomed = () => {
  const viewport = window.visualViewport
  return viewport ? viewport.scale > 1.01 : false
}

const measure = () => {
  if (isPinchZoomed()) return

  const nextVw = window.innerWidth
  const nextVh = window.innerHeight
  const widthChanged = nextVw !== measuredVw
  const heightChanged = nextVh !== measuredVh

  /*
   * 尺寸只在「宽度」变化时重算。
   *
   * 移动端滚动时地址栏收放会改 innerHeight 并触发 resize，
   * 一滚动就重算一次，标识会在两个大小之间来回跳 —— 这就是
   * 「翻下去再翻上来，大小变一次」的来源。竖屏下尺寸本来就由
   * 宽度与文字位置决定，高度只影响落点，不影响边长，所以高度变化
   * 只更新 vh，不动尺寸。
   */
  if (!widthChanged && targetLogo > 0) {
    if (heightChanged) vh = nextVh
    measuredVh = nextVh
    return
  }

  measuredVw = nextVw
  measuredVh = nextVh
  vw = nextVw
  vh = nextVh
  targetLogo = backgroundLogo()
  publishGeometry()
  narrowMode = computeNarrow()
  /*
   * 把判定结果交给 CSS：窄屏的渐显时长与宽屏不同，
   * 用类名而不是媒体查询，避免 JS 与 CSS 各有一套阈值。
   */
  document.documentElement.classList.toggle('intro-narrow', narrowMode)
}

/** 当前页面滚动量。滚动容器是 body，两种取法都兜一下。 */
const scrollOffset = () =>
  window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0

/**
 * 这一条历史记录「记得」的滚动位置。
 *
 * 返回首页时，浏览器不是瞬间把页面放到记忆位置，而是从顶部过渡过去
 * （html 上有 scroll-behavior: smooth）。所以判定时读实时位置永远读到 0，
 * 会误判成「在顶部」，播起动画之后页面才滚走 —— 表现为闪一下又消失。
 *
 * 位置本身记在 history.state 里（滚动容器是 window，路由进出时写入），
 * 这里直接读它，不看动画进行到哪一帧。
 */
const rememberedScroll = () => {
  const state = window.history.state as { scroll?: { top?: number } } | null
  const top = state?.scroll?.top
  return typeof top === 'number' ? top : 0
}

/** 判定用的滚动量：记忆位置与实时位置取大。 */
const effectiveScroll = () => Math.max(scrollOffset(), rememberedScroll())

/**
 * 直接落到终态，不播入场。
 * 用于：已经播过、页面已在滚动位置、用户要求减少动效。
 */
const settleDirectly = () => {
  introStarted = true
  paint(totalDuration())
  elRoot.value?.classList.remove('is-covering', 'is-fixed')
  introFinished = true
  window.addEventListener('resize', onResize, { passive: true })
}

/**
 * 窄屏：飞入 + 自下而上收起（收起从飞入的 72% 处开始，重叠一段）
 * 宽屏：飞入 + 放大互换
 */
const totalDuration = () =>
  isNarrow() ? ENTER_MS + NARROW_HOLD_MS + NARROW_FADE_MS : ENTER_MS + MOVE_MS

/**
 * 正文与页头开始渐显的时刻。
 *
 * 放在第二阶段**开始**的时候，而不是整段动画结束之后：
 * 淡入与放大互换同时进行，幕布还没完全撤走时文字已经在浮现，
 * 两者叠在同一段时间里，收尾不会出现「动画停了，字才出来」的断点。
 *
 * 窄屏没有第二阶段，改成从幕布收起的那一刻开始。
 */
const revealAt = () => (isNarrow() ? ENTER_MS + NARROW_HOLD_MS : ENTER_MS)

const startReveal = () => {
  document.documentElement.classList.add('is-revealed')
}

const tick = (now: number) => {
  if (!startTime) startTime = now
  const elapsed = now - startTime
  paint(elapsed)
  if (elapsed >= revealAt()) startReveal()
  if (elapsed < totalDuration()) {
    frame = requestAnimationFrame(tick)
    return
  }
  frame = 0
  introFinished = true
  startReveal()
  // 落定后交还给封面：脱离视口固定层，随封面一起滚走
  elRoot.value?.classList.remove('is-fixed')
  document.documentElement.classList.remove('is-intro')
  window.dispatchEvent(new Event('multiply:intro-done'))
}

/**
 * 视口变化时只做必要的事。
 *
 * 入场阶段要跟着重画，免得动画跑到一半尺寸对不上。
 * 入场结束之后装置只是封面里的一张静态底图，位置已经落定：
 * 这时再按 vh 重画，手机上滚一下就动一下（地址栏收放会改 innerHeight），
 * 双指缩放也会让可视视口变化，看上去就是「装置乱飞」。
 *
 * 因此结束后只在**宽度**变化时重画，高度变化一概不碰。
 */
const onResize = () => {
  // 双指缩放期间不改版面：可视视口变了，但布局视口没变。
  if (isPinchZoomed()) return

  /*
   * 入场还没开始就不要画。
   *
   * decide 要等一帧，而移动端在这个窗口里就会先来一次 resize
   * （地址栏收放会触发 visualViewport 的 resize）。那时一画就是
   * 终态几何，于是第一帧闪出最终画面，紧接着动画再从起点跑 ——
   * 看上去就是「第一帧是终态」。
   */
  if (!introStarted && !introFinished) return

  const previousVw = vw
  measure()
  if (!introFinished || vw !== previousVw) paint(totalDuration())
}

onMounted(() => {
  measure()

  if (isInline()) return

  /*
   * 缩放期间我们主动忽略了视口变化，松手后要补一次。
   * visualViewport 的 resize 在缩放结束时触发，此时 scale 回到 1，
   * 交给正常的 resize 流程处理即可。
   */
  const viewport = window.visualViewport
  const onVisualResize = () => {
    if (isPinchZoomed()) return
    onResize()
  }
  viewport?.addEventListener('resize', onVisualResize, { passive: true })
  visualViewportListener = onVisualResize

  // static：不播动画，直接作为容器底图落定
  if (props.mode === 'static') {
    settleDirectly()
    return
  }

  // 首帧之前就脱离容器、盖上整个视口，避免第一帧闪出正文
  elRoot.value?.style.setProperty('--bf-narrow-fade', `${NARROW_FADE_MS}ms`)
  elRoot.value?.classList.add('is-covering', 'is-fixed')
  document.documentElement.classList.add('is-intro')
  document.documentElement.classList.remove('is-revealed')

  /*
   * 等一帧再决定播不播。
   *
   * 浏览器恢复滚动位置不在首帧，而且带过渡动画：从顶部平滑滚到记忆位置。
   * 所以既不能只读 onMounted 时的实时位置（那时还是 0），
   * 也不能只读下一帧的实时位置（过渡刚起步，仍是 0 附近）。
   *
   * 判定改用 history.state 里记录的记忆位置，与实时位置取大。
   * 这样「返回一个滚过的首页」在动画开始前就能判出来，不会先播一下再消失。
   * 这段等待由白幕盖着整个视口，用户看不到区别。
   *
   * 判定只看「首屏在不在视野里」：
   *   ① 减少动效
   *   ② 本次文档里已经处理过（站内跳走再返回）
   *   ③ 这个标签页本次访问已经看过（跨刷新、跨前进后退）
   *   ④ 页面已经处在滚动位置 —— 首屏不在视野内，动画没有可承接的对象
   */
  const decide = () => {
    const restoredScroll = effectiveScroll()
    const playIntro =
      !introHandledInDocument && !reducedMotion() && !introSettled() && restoredScroll <= 8

    introHandledInDocument = true
    settleIntroFlag()

    if (!playIntro) {
      // 直接落定并揭开：不播动画，但内容要立刻可见。
      settleDirectly()
      document.documentElement.classList.add('is-revealed')
      document.documentElement.classList.remove('is-intro')
      return
    }

    introStarted = true
    frame = requestAnimationFrame(tick)
    window.addEventListener('resize', onResize, { passive: true })
    watchEarlyScroll()
  }

  requestAnimationFrame(decide)
})

/**
 * 迟到的滚动恢复。
 *
 * 有的浏览器把滚动位置放到 load 之后才恢复，一帧的等待未必够。
 * 真播起来了才发现首屏已经在视野外时，直接取消入场、落定并揭开，
 * 而不是让幕布盖着一段已经滚过的页面继续放大互换。
 */
let earlyScrollGuard: (() => void) | null = null
let earlyScrollTimer = 0

const stopEarlyScrollGuard = () => {
  if (earlyScrollGuard) {
    window.removeEventListener('scroll', earlyScrollGuard)
    earlyScrollGuard = null
  }
  if (earlyScrollTimer) {
    window.clearTimeout(earlyScrollTimer)
    earlyScrollTimer = 0
  }
}

const watchEarlyScroll = () => {
  stopEarlyScrollGuard()

  const guard = () => {
    if (effectiveScroll() <= 8) return
    stopEarlyScrollGuard()
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    settleDirectly()
    document.documentElement.classList.add('is-revealed')
    document.documentElement.classList.remove('is-intro')
  }

  earlyScrollGuard = guard
  window.addEventListener('scroll', guard, { passive: true })
  earlyScrollTimer = window.setTimeout(stopEarlyScrollGuard, 600)
}

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('resize', onResize)
  if (visualViewportListener) {
    window.visualViewport?.removeEventListener('resize', visualViewportListener)
    visualViewportListener = null
  }
  stopEarlyScrollGuard()
  document.documentElement.classList.remove('is-intro', 'is-revealed')
})
</script>

<template>
  <!-- 内联：容器内的静态标识 -->
  <div v-if="isInline()" class="bf-inline" aria-hidden="true">
    <svg viewBox="0 0 110 110" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="110" height="110" fill="#ffffff" />
      <rect x="0" y="0" width="78.05" height="78.05" fill="#ffffff" style="mix-blend-mode: difference" />
      <rect
        x="39.02"
        y="39.02"
        width="60.98"
        height="60.98"
        fill="#ffffff"
        style="mix-blend-mode: difference"
      />
    </svg>
  </div>

  <!-- 全站背景 -->
  <div v-else ref="elRoot" class="brand-field" aria-hidden="true">
    <span ref="elScreen" class="bf-screen" />
    <span ref="elPlate" class="bf-plate" />
    <span ref="elA" class="bf-sq" />
    <span ref="elB" class="bf-sq" />
  </div>
</template>

<style scoped>
.brand-field {
  /*
   * 默认是「容器底图」：绝对填满所在容器（封面 / 404 容器），
   * 随容器一起滚动，不再是全站固定层。
   *
   * 容器的顶端在页头下方，所以向上偏移一个页头高度，
   * 让内部坐标系与视口一致 —— 这样方块几何只按视口算一次即可。
   */
  position: absolute;
  left: 0;
  top: calc(-1 * var(--header-h));
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  /*
     混合限制在标识内部，不影响页面其他层。
     isolation 会建立自己的 stacking context，所以子层的 mix-blend-mode
     不会穿透到正文。
  */
  isolation: isolate;
}

/*
 * 入场期间：暂时脱离容器，盖住整个视口（含页头与页脚）。
 * 动画结束后由 JS 摘掉这个类，装置交还给封面。
 * 此时滚动位置在顶部，两种定位下图形位置完全重合，切换不会有跳动。
 */
.brand-field.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

/*
 * 开屏期间：盖住页面。
 * 必须高于页头（z-index 60）与正文（z-index 1），否则第一阶段
 * 后面的内容会提前露出来。
 */
.brand-field.is-covering {
  z-index: 100;
}

/*
 * 窄屏离场：整层一起渐隐。
 * 白幕、白色基底和两块方块同时在同一个元素上淡出，
 * 所以 logo 与白底是同一个透明度，不会出现谁先没的情况。
 * 时长与曲线和宽屏揭幕同族（easeOutExpo），只比它稍长一点。
 */
.brand-field.is-fading-out {
  animation: bf-fade-out var(--bf-narrow-fade, 520ms) var(--ease-out) both;
}

@keyframes bf-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.bf-screen {
  position: absolute;
  inset: 0;
  background: var(--paper);
}

/* 位置尺寸由 JS 逐帧写入，不加 transition，避免二次缓动 */
.bf-plate,
.bf-sq {
  position: absolute;
}

/* 白色底层：difference 的运算基底。始终不透明。 */
.bf-plate {
  background: #ffffff;
}

/* 两个方块：白色 + difference。叠黑成白，叠白成黑。 */
.bf-sq {
  background: #ffffff;
  mix-blend-mode: difference;
}

.bf-inline {
  position: absolute;
  inset: 0;
}

.bf-inline svg {
  width: 100%;
  height: 100%;
  isolation: isolate;
}
</style>
