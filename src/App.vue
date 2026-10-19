<script setup lang="ts">
/**
 * 应用外壳：页头 + 路由视图 + 页脚。
 *
 * 品牌装置不在这里 —— 它只属于封面与 404 页，由各自视图内部挂载，
 * 跟着所在容器一起滚动。
 */
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { useLocale } from '@/composables/useLocale'
import { documentTitle } from '@/app/seo'

const route = useRoute()
const { t, content, locale } = useLocale()
const main = ref<HTMLElement | null>(null)

/**
 * 文档标题跟随路由与语言。两处任一变化都重算，
 * 否则切到日文后标签页会停在上一门语言的标题上。
 */
watch(
  () => [route.name, locale.value] as const,
  () => {
    document.title = documentTitle(route.name, locale.value)
  },
  { immediate: true },
)

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    if (document.activeElement && document.activeElement !== document.body) {
      main.value?.focus({ preventScroll: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <a class="skip-link" href="#main">{{ t(content.ui.skipToContent) }}</a>
  <SiteHeader />
  <main id="main" ref="main" class="site-main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style scoped>
/*
 * 页头是 fixed 的，正文统一在这里让出页头高度。
 * 各视图只需要按正常文档流排版，不要再自己加 calc(var(--header-h) + …)。
 */
.site-main {
  position: relative;
  z-index: 1;
  min-height: 60vh;
  padding-top: var(--header-h);
}

.site-main:focus {
  outline: none;
}
</style>
