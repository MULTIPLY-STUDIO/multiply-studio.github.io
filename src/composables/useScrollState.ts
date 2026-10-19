import { computed, readonly, ref } from 'vue'
import { sections } from '@/app/sections'

/**
 * 首页的滚动读数。
 *
 * 页头（App 层）与首页（视图层）是两个组件树分支，若各自监听 scroll
 * 就会重复计算。这里用模块级单例：首页负责写入，页头只读。
 * 非首页路由下进度归零、活动区块退回封面。
 */
const progress = ref(0)
const activeId = ref<string>(sections[0]?.id ?? 'cover')

const setProgress = (value: number) => {
  progress.value = Math.min(1, Math.max(0, value))
}

const setActive = (id: string) => {
  activeId.value = id
}

const resetReading = () => {
  progress.value = 0
  activeId.value = sections[0]?.id ?? 'cover'
}

export const useScrollState = () => ({
  progress: readonly(progress),
  activeId: readonly(activeId),
  activeIndex: computed(() => {
    const index = sections.findIndex((section) => section.id === activeId.value)
    return index < 0 ? 0 : index
  }),
  setProgress,
  setActive,
  resetReading,
})
