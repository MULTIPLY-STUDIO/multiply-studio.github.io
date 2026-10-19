<script setup lang="ts">
/**
 * 联系区块：一条通栏的巨型邮箱作为整行交互目标，
 * 右侧是外部渠道与复制动作。没有任何表单控件堆叠。
 */
import { useLocale } from '@/composables/useLocale'
import { useClipboard } from '@/composables/useClipboard'
import { socialLinks } from '@/content/studio'

const { content, t } = useLocale()
const { copied, copy } = useClipboard()
</script>

<template>
  <section id="contact" class="home-contact home-block">
    <p class="home-contact__label">{{ t(content.home.contactLabel) }}</p>

    <p class="home-contact__note prose" data-reveal>{{ t(content.home.contactNote) }}</p>

    <a :href="`mailto:${content.contact.email}`" class="home-contact__mail" data-reveal>
      <span class="home-contact__mail-text">{{ content.contact.email }}</span>
      <svg class="home-contact__mail-arrow" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M5 19L19 5M19 5H8M19 5v11" fill="none" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </a>

    <div class="home-contact__foot">
      <ul class="home-contact__socials">
        <li v-for="link in socialLinks" :key="link.label">
          <a :href="link.href" target="_blank" rel="noopener noreferrer" class="social">
            <span class="social__label">{{ link.label }}</span>
            <span class="social__handle">{{ link.handle }}</span>
          </a>
        </li>
      </ul>

      <button type="button" class="home-contact__copy" @click="copy(content.contact.email)">
        <span>{{ copied ? t(content.ui.copied) : t(content.ui.copy) }}</span>
        <svg class="home-contact__copy-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            :d="copied ? 'M3 8.5l3.5 3.5L13 5' : 'M6 3h7v7M13 3L3 13'"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
          />
        </svg>
        <span class="visually-hidden" aria-live="polite">{{ copied ? t(content.ui.copied) : '' }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.home-contact {
  padding-block: clamp(3rem, 6vw, 6rem) clamp(4rem, 8vw, 8rem);
}

/* 标签行：正文级字号 + 一条延伸的细线，替代原来的「05 —」编号小字。 */
.home-contact__head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.home-contact__label {
  font-family: var(--font-han);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.home-contact__rule {
  flex: 1;
  height: 1px;
  background: var(--tint-20);
}

.home-contact__title {
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
  font-size: clamp(2.6rem, 8.5vw, 9rem);
  max-width: 16ch;
}

.home-contact__note {
  margin-top: 1.25rem;
  max-width: 34rem;
  color: var(--tint-65);
}

/* 巨型邮箱：整行可点，下方一条实线，hover 时由左向右反白。 */
.home-contact__mail {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(2rem, 4vw, 3.5rem);
  padding: clamp(0.75rem, 1.6vw, 1.25rem) 0;
  overflow: hidden;
  isolation: isolate;
}

.home-contact__mail::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--base) var(--ease-in-out);
}

.home-contact__mail:hover::before,
.home-contact__mail:focus-visible::before {
  transform: scaleX(1);
}

.home-contact__mail-text {
  font-family: var(--font-sans);
  font-size: clamp(1.35rem, 5.2vw, 4.5rem);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.05;
  overflow-wrap: anywhere;
  transition: color var(--fast) var(--ease-out);
  transition-delay: 60ms;
}

.home-contact__mail-arrow {
  flex: none;
  transition: color var(--fast) var(--ease-out), transform var(--base) var(--ease-out);
  transition-delay: 60ms;
}

.home-contact__mail:hover .home-contact__mail-text,
.home-contact__mail:focus-visible .home-contact__mail-text,
.home-contact__mail:hover .home-contact__mail-arrow,
.home-contact__mail:focus-visible .home-contact__mail-arrow {
  color: var(--paper);
}

.home-contact__mail:hover .home-contact__mail-arrow,
.home-contact__mail:focus-visible .home-contact__mail-arrow {
  transform: translate(3px, -3px);
}

.home-contact__foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--gutter);
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}


.home-contact__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  /*
   * flex item 默认 min-width: auto，不会收缩到内容宽度以下。
   * 正文列被右侧标识压窄时，这一排链接会溢出到标识上。
   * 允许收缩后，自身的 flex-wrap 才能把它们折行。
   */
  min-width: 0;
  flex: 1 1 auto;
}

.social {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid transparent;
  transition: border-color var(--fast) var(--ease-out);
}

.social:hover,
.social:focus-visible {
  border-color: var(--ink);
}

.social__label {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.social__handle {
  color: var(--tint-50);
  text-transform: none;
  letter-spacing: 0.02em;
}

.home-contact__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--ink);
  /* 正文列偏窄时按钮会被压到换行，锁住单行 */
  white-space: nowrap;
  flex: none;
  transition: background var(--fast) var(--ease-out), color var(--fast) var(--ease-out);
}

.home-contact__copy:hover,
.home-contact__copy:focus-visible {
  background: var(--ink);
  color: var(--paper);
}

.home-contact__copy-icon {
  flex: none;
  display: block;
}

.home-contact__copy-state {
  min-width: 0.75rem;
  font-size: 0.875rem;
}

@media (max-width: 700px) {
  .home-contact__foot {
    flex-direction: column;
    gap: 1.25rem;
  }
}
</style>
