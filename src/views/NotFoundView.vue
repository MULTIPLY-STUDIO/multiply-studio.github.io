<script setup lang="ts">
/**
 * 404：品牌装置作为背景图形，左侧给出页码与返回入口。
 * 不做幽默文案，保持与其他页面同一套字阶。
 */
import { useLocale } from '@/composables/useLocale'
import BrandField from '@/components/brand/BrandField.vue'

const { content, t } = useLocale()
</script>

<template>
  <div class="not-found">
    <!-- 装置：不播入场动画，直接作为本页底图 -->
    <BrandField mode="static" />

    <div class="not-found__text">
      <h1 class="not-found__title display">{{ content.notFound.title }}</h1>
      <p class="not-found__body prose">{{ t(content.notFound.body) }}</p>

      <nav class="not-found__links">
        <RouterLink to="/" class="not-found__link">
          <span>{{ t(content.notFound.home) }}</span>
          <span aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/work" class="not-found__link">
          <span>{{ t(content.notFound.work) }}</span>
          <span aria-hidden="true">→</span>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  min-height: calc(100svh - var(--header-h));
  padding: clamp(2rem, 5vw, 4rem) var(--page-x) clamp(2rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  /* 装置会伸出边界，裁掉 */
  overflow: hidden;
}

.not-found__text {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* 停在装置左侧，不与黑色图形重叠 */
  max-width: min(34rem, 46vw);
}

.not-found__title {
  font-size: clamp(6rem, 22vw, 18rem);
  letter-spacing: -0.06em;
  line-height: 0.72;
}

.not-found__body {
  color: var(--tint-65);
  max-width: 26ch;
}

.not-found__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-top: 1rem;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.4rem;
  font-family: var(--font-han);
  font-size: 1rem;
  transition: opacity var(--fast) var(--ease-out);
}

.not-found__link:hover,
.not-found__link:focus-visible {
  opacity: 0.55;
}

@media (max-width: 600px) {
  /* 窄屏装置会落到画面中央，与文字重叠，这里不显示 */
  .not-found :deep(.brand-field) {
    display: none;
  }

  .not-found__text {
    max-width: none;
  }
}
</style>
