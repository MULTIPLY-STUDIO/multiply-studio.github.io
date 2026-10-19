<script setup lang="ts">
/**
 * 指标对：左侧等宽标签、右侧数值。整行可点击（外部链接）或纯展示。
 * 尺寸固定，所以能作为网格中的对齐单元复用。
 */
import { computed } from 'vue'
import type { LocalizedText } from '@/types/content'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{
  label: LocalizedText
  value: string
  href?: string
}>()

const { t } = useLocale()

/*
 * 只有纯拉丁字母与数字的值才用等宽字体（年份、版本号、时区）。
 * 值里只要出现汉字就走汉字无衬线 —— 等宽字族的子集里没有汉字，
 * 中文会落到 generic monospace，而它在 Windows 上映射到系统宋体。
 */
const isLatin = computed(() => !/[\u4e00-\u9fff]/.test(props.value))

/*
 * 品牌名保持原样大小写：不套等宽字体，也不做任何 text-transform。
 * 等宽字体在某些平台的字形里把 x-height 拉得很高，Yos-X 看起来像全大写。
 */
const isBrandName = computed(() => /^Yos-X$/i.test(props.value))
</script>

<template>
  <div class="metric">
    <span class="metric__label">{{ t(label) }}</span>
    <a
      v-if="href"
      class="metric__value metric__value--link"
      :class="{ 'metric__value--mono': isLatin && !isBrandName }"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >{{ value }}</a>
    <span v-else class="metric__value" :class="{ 'metric__value--mono': isLatin && !isBrandName }">{{ value }}</span>
  </div>
</template>

<style scoped>
.metric {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
}

.metric__label {
  font-family: var(--font-han);
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
  color: var(--tint-65);
  flex: none;
}

.metric__value {
  text-align: right;
  font-family: var(--font-han);
  font-size: 1.0625rem;
  line-height: 1.4;
  color: var(--ink);
}

.metric__value--mono {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
}

.metric__value--link {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
}

.metric__value--link:hover,
.metric__value--link:focus-visible {
  text-decoration-thickness: 2px;
}
</style>
