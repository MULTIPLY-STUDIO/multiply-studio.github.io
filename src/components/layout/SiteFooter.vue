<script setup lang="ts">
/**
 * 全站页脚。四栏信息：品牌声明 / 站点索引 / 外部渠道 / 返回顶部。
 *
 * 排布规则：页脚不留装饰性小字。原先把版权、时区、年份拆成三列 0.6rem 的
 * 等宽小字，现在合并成一行正文级说明，只保留确实需要告知的信息。
 */
import { useLocale } from '@/composables/useLocale'
import SiteMark from '@/components/brand/SiteMark.vue'

const { content, t } = useLocale()

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <SiteMark variant="wordmark" class="site-footer__wordmark" />
        </div>

        <nav class="site-footer__nav" :aria-label="t(content.ui.menu)">
          <RouterLink
            v-for="item in content.navigation"
            :key="item.to"
            :to="item.to"
            class="footer-link"
          >
            {{ t(item.label) }}
          </RouterLink>
        </nav>


        <button type="button" class="site-footer__top-button" @click="scrollTop">
          <span>{{ t(content.ui.backToTop) }}</span>
          <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
            <path d="M6 11V1M6 1L1 6M6 1l5 5" fill="none" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </button>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__legal">{{ content.footer.legal }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--paper);
}

.site-footer__inner {
  padding: clamp(2.5rem, 5vw, 4.5rem) var(--page-x) clamp(1.5rem, 3vw, 2.25rem);
}

/*
 * 页脚顶部两行：
 *   第一行  完整字标（独占一行，宽度不受其它列挤压）
 *   第二行  站点索引靠左、返回顶部靠右
 *
 * 换成完整字标之后，再按三列排会让导航列只剩几十像素，
 * 日文的「プロジェクト」会被挤成两行。改成这个结构后，
 * 宽度变化只影响换行，不影响列宽分配。
 */
.site-footer__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'brand brand'
    'nav   button';
  gap: 1.75rem var(--gutter);
  align-items: center;
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.site-footer__brand {
  grid-area: brand;
}

.site-footer__nav {
  grid-area: nav;
}

.site-footer__top-button {
  grid-area: button;
  justify-self: end;
}

.site-footer__brand {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

/*
 * 完整字标（图形 + MULTIPLY + 正片叠底），按 331:126 的比例缩放。
 * 高度取 2.5rem 而不是更小：原始文件里「正片叠底」只占字标高度的 38%，
 * 压到 2rem 时中文只剩 12px 左右，会糊。
 */
.site-footer__brand .site-footer__wordmark {
  height: 2.5rem;
  width: auto;
  flex: none;
  display: block;
}

/* 品牌声明用正文字号，不再是页脚里最小的一行。 */

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: var(--font-han);
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--tint-80);
  transition: color var(--fast) var(--ease-out);
}

.footer-link:hover,
.footer-link:focus-visible {
  color: var(--ink);
}

.footer-link__handle {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  color: var(--tint-50);
}

.site-footer__top-button {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--ink);
  font-family: var(--font-han);
  font-size: 0.9375rem;
  transition: background var(--fast) var(--ease-out), color var(--fast) var(--ease-out);
}

.site-footer__top-button:hover,
.site-footer__top-button:focus-visible {
  background: var(--ink);
  color: var(--paper);
}

.site-footer__bottom {
  padding-top: 1.25rem;
}

.site-footer__legal {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--tint-50);
}

/* 窄到放不下时，按钮单独提一行，导航占满整行。 */
@media (max-width: 420px) {
  .site-footer__top {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'brand'
      'nav'
      'button';
    justify-items: start;
  }

  .site-footer__top-button {
    justify-self: start;
  }
}
</style>
