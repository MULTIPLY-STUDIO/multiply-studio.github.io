import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { sections } from '@/app/sections'
import { useScrollState } from './useScrollState'

/**
 * 首页滚动监听：把文档滚动换算成 0–1 进度与当前区块。
 *
 * 用 rAF 合并高频 scroll，并且只在数值真正变化时写响应式，
 * 避免每帧都触发页头重渲染。
 */
export const useScrollReading = () => {
  const { setProgress, setActive } = useScrollState()
  const mounted = ref(false)
  let frame = 0
  let lastProgress = -1
  let lastId = ''

  const read = () => {
    frame = 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    if (Math.abs(next - lastProgress) > 0.0015) {
      lastProgress = next
      setProgress(next)
    }

    // 区块判定用视口上 1/3 处的交点，比 IntersectionObserver 更适合长短不一的分段。
    const probe = window.scrollY + window.innerHeight * 0.34
    let current = sections[0]?.id ?? 'cover'
    for (const section of sections) {
      const element = document.getElementById(section.anchor)
      if (!element) continue
      if (element.offsetTop <= probe) current = section.id
    }
    if (current !== lastId) {
      lastId = current
      setActive(current)
    }
  }

  const onScroll = () => {
    if (frame) return
    frame = requestAnimationFrame(read)
  }

  const remeasure = () => {
    lastProgress = -1
    onScroll()
  }

  onMounted(async () => {
    await nextTick()
    read()
    mounted.value = true
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', remeasure, { passive: true })
    // 字体晚到会改变高度，加载完成后再测一次。
    document.fonts?.ready.then(remeasure).catch(() => undefined)
  })

  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', remeasure)
  })

  return { mounted, remeasure }
}
