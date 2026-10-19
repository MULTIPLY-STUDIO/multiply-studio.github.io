<script setup lang="ts">
/**
 * 首页：封面 → 项目 → 工作室 → 联系 五段纵向版面。
 *
 * 使用常规文档流而非全屏吸附：内容长度随语言与视口变化，
 * 强制吸附会在中英切换时产生不可控的断点。滚动进度只驱动
 * 页头读数与封面装置的位移，不参与布局。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useScrollReading } from '@/composables/useScrollReading'
import { useScrollState } from '@/composables/useScrollState'
import { useReveal } from '@/composables/useReveal'
import CoverSection from '@/sections/CoverSection.vue'
import WorkSection from '@/sections/WorkSection.vue'
import StudioSection from '@/sections/StudioSection.vue'
import ContactSection from '@/sections/ContactSection.vue'

const page = ref<HTMLElement | null>(null)
const { remeasure } = useScrollReading()
const { resetReading } = useScrollState()
useReveal(() => page.value)

/** 语言切换后段落高度变化，需要重算进度。 */
const onLocale = () => remeasure()

onMounted(() => {
  window.addEventListener('multiply:locale', onLocale)
})

onBeforeUnmount(() => {
  window.removeEventListener('multiply:locale', onLocale)
  resetReading()
})
</script>

<template>
  <div ref="page" class="home">
    <CoverSection />
    <div class="home__shell">
      <WorkSection />
      <StudioSection />
      <ContactSection />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: block;
}

.home__shell {
  /*
   * 只做常规左右边距。给右侧标识的让位由 .site-main 统一处理，
   * 在这里再加会叠成双份，正文被挤得过窄。
   */
  padding-inline: var(--page-x);
}

</style>
