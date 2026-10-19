import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 入场揭示：给带 `data-reveal` 的元素在「进入或越过视口」后加上 `is-revealed`。
 *
 * 设计取舍（每一条都对应一种真实会踩到的失效，缺一条就会留下不可见内容）：
 *
 * 1. **不缓存节点**：组件重渲染会替换元素，缓存的旧节点已脱离文档，
 *    继续给它加类对用户毫无意义。每次扫描都重新查询。
 * 2. **判定「顶端越过视口底边」而不是「此刻相交」**：快速滚动、锚点跳转、
 *    前进/后退恢复都会让整块元素直接跳过视口，只判相交会永久漏掉它们。
 * 3. **布局变化要重扫**：字体晚到、语言切换、图片撑开都会移动元素位置。
 *    这些变化不产生 scroll 事件 —— 只监听 scroll 会让「被字体挤进视口」的
 *    元素永远停在 opacity: 0。因此额外用 ResizeObserver 观察文档高度。
 * 4. **样式层默认可见**，只在 JS 明确接管（<html> 有 .reveal-ready）后才隐藏。
 *    脚本失败或被禁用时内容依然可读，只是没有动画。
 */
const READY_CLASS = 'reveal-ready'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useReveal = (root?: () => HTMLElement | null) => {
  let frame = 0
  let stopped = false
  let resizeObserver: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined
  let ready = false

  const scope = () => root?.() ?? document

  const revealAll = () => {
    scope()
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((element) => element.classList.add('is-revealed'))
  }

  const sweep = () => {
    frame = 0
    if (stopped || !ready) return

    const limit = window.innerHeight
    let pending = 0

    scope()
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((element) => {
        if (element.classList.contains('is-revealed')) return
        if (element.getBoundingClientRect().top >= limit) {
          pending += 1
          return
        }
        element.classList.add('is-revealed')
      })

    /*
     * 不要在这里 detach。
     *
     * 页面里存在「筛选后重新渲染列表」这类动态内容（项目归档的标签筛选）：
     * 新渲染的 [data-reveal] 节点没有 is-revealed，如果此时监听已经撤掉，
     * 它们会永远停在 opacity: 0 —— 表现为多点几下筛选，下面的项目全都不见了。
     *
     * 监听成本很低（rAF 节流 + 查询已经揭示的直接跳过），
     * 一直挂到组件卸载由 onBeforeUnmount 统一清理。
     */
    void pending
  }

  const schedule = () => {
    if (frame) return
    frame = requestAnimationFrame(sweep)
  }

  const detach = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    resizeObserver?.disconnect()
    resizeObserver = undefined
    mutationObserver?.disconnect()
    mutationObserver = undefined
  }

  onMounted(() => {
    const targets = scope().querySelectorAll('[data-reveal]')
    if (targets.length === 0) return

    if (prefersReducedMotion()) {
      revealAll()
      return
    }

    document.documentElement.classList.add(READY_CLASS)
    ready = true

    /*
     * 首次扫描同步完成：从滚动中途刷新或带锚点进入时，视口内的元素
     * 否则会先以 opacity: 0 渲染一帧，用户看到一次整体闪白。
     */
    sweep()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    // 布局变化（字体晚到、语言切换、内容撑开）不产生 scroll 事件，必须单独观察。
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(schedule)
      resizeObserver.observe(document.documentElement)
      const body = document.body
      if (body) resizeObserver.observe(body)
    }

    /*
     * 筛选、语言切换、路由内列表更新都会替换节点而不产生滚动事件。
     * 观察子树变化，新节点一出现就补一次扫描。
     */
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        /*
         * 直接扫描而不是交给 rAF：后台标签页里 rAF 会被浏览器暂停，
         * 只靠 schedule 的话，筛选出的新行会一直停在 opacity: 0。
         */
        sweep()
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    document.fonts?.ready.then(schedule).catch(() => undefined)
  })

  onBeforeUnmount(() => {
    stopped = true
    detach()
    // 离开页面时撤掉接管标记，避免下一个视图的静态内容被隐藏。
    document.documentElement.classList.remove(READY_CLASS)
  })
}
