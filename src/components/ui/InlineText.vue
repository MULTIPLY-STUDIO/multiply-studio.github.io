<script setup lang="ts">
/**
 * 行内文本：把内容里的反引号片段渲染为 <code>，其余原样输出。
 *
 * 项目正文需要区分「技术名」与「叙述」，但不需要完整 Markdown。
 * 用组件而不是在模板里做 v-html，保证任何内容都不会被当作 HTML 注入。
 */
import { computed } from 'vue'
import { parseInline } from '@/features/inline'

const props = defineProps<{ value: string }>()

const tokens = computed(() => parseInline(props.value))
</script>

<template>
  <template v-for="(token, index) in tokens" :key="index">
    <code v-if="token.kind === 'code'" class="inline-code">{{ token.value }}</code>
    <template v-else>{{ token.value }}</template>
  </template>
</template>

<style scoped>
.inline-code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  letter-spacing: 0.01em;
  /* 细底纹而不是彩色高亮：仍然只有黑白灰。 */
  padding: 0.05em 0.28em;
  background: var(--tint-10);
  /* 换行时底纹跟着断行，不会在行尾留下半截色块。 */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
</style>
