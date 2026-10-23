<script setup lang="ts">
/**
 * 联系页：巨型邮箱为主交互，右侧给出主创信息。
 *
 * 不做表单提交：静态站点没有后端，表单只会给出错误的发送承诺。
 * 也不写接单承诺 —— 页面只陈述联系方式，不暗示业务状态。
 * 右侧保留主创简介：邮箱与仓库是工作室的，但对外说明「谁在做」仍然有意义。
 */
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import { useClipboard } from '@/composables/useClipboard'
import { socialLinks } from '@/content/studio'

const { content, t } = useLocale()
const { copied, copy } = useClipboard()

const page = ref<HTMLElement | null>(null)
useReveal(() => page.value)
</script>

<template>
  <div ref="page" class="contact-view page">
    <header class="contact-view__hero">
      <h1 class="contact-view__title display-brush">{{ t(content.contact.title) }}</h1>
    </header>

    <div class="contact-view__body">
      <div class="contact-view__main">
        <a :href="`mailto:${content.contact.email}`" class="contact-view__mail">
          <span class="contact-view__mail-text">{{ content.contact.email }}</span>
          <span class="contact-view__mail-arrow" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <path d="M6 26L26 6M26 6H11M26 6v15" fill="none" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </span>
        </a>

        <div class="contact-view__actions">
          <button
            type="button"
            class="contact-view__copy"
            :class="{ 'is-copied': copied }"
            @click="copy(content.contact.email)"
          >
            <span>{{ copied ? t(content.ui.copied) : t(content.ui.copy) }}</span>
            <span class="contact-view__copy-mark" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="15" height="15">
                <path
                  :d="copied ? 'M3 8.5l3.5 3.5L13 5' : 'M6 3h7v7M13 3L3 13'"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
              </svg>
            </span>
            <span class="visually-hidden" aria-live="polite">{{ copied ? t(content.ui.copied) : '' }}</span>
          </button>
        </div>

        <section class="contact-view__socials">
          <h2 class="contact-view__socials-label">{{ t(content.contact.socialsLabel) }}</h2>
          <ul>
            <li v-for="link in socialLinks" :key="link.label">
              <a :href="link.href" target="_blank" rel="noopener noreferrer" class="contact-social">
                <span class="contact-social__label">{{ link.label }}</span>
                <span class="contact-social__handle">{{ link.handle }}</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <aside class="contact-view__brief">
        <h2 class="contact-view__brief-label">{{ t(content.studio.founderLabel) }}</h2>
        <p class="brief-item" data-reveal>{{ content.studio.founderName }}</p>
        <p class="brief-note" data-reveal>{{ t(content.studio.founderBody) }}</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contact-view__hero {
  padding: clamp(1.75rem, 3.5vw, 3rem) var(--page-x) clamp(1rem, 2vw, 1.5rem);
}

.contact-view__title {
  font-size: clamp(3.4rem, 12vw, 11rem);
  line-height: 1;
}


.contact-view__body {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(2rem, 4vw, 4rem) var(--page-x) clamp(3rem, 6vw, 6rem);
  align-items: start;
}

/* 状态行：正文级字号，原来是一个 0.6875rem 的等宽小字。 */
.contact-view__status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-han);
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}

.contact-view__dot {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--ink);
}

/* —— 巨型邮箱 —— */
.contact-view__mail {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(1.25rem, 2.5vw, 2rem);
  padding-bottom: clamp(0.75rem, 1.4vw, 1.1rem);
  overflow: hidden;
}

.contact-view__mail-text {
  font-family: var(--font-sans);
  font-size: clamp(1.6rem, 5.6vw, 4.75rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  overflow-wrap: anywhere;
  transition: transform var(--base) var(--ease-out);
}

.contact-view__mail-arrow {
  flex: none;
  color: var(--tint-35);
  transition: color var(--fast) var(--ease-out), transform var(--base) var(--ease-out);
}

.contact-view__mail:hover .contact-view__mail-arrow,
.contact-view__mail:focus-visible .contact-view__mail-arrow {
  color: var(--ink);
  transform: translate(3px, -3px);
}

.contact-view__mail:hover .contact-view__mail-text,
.contact-view__mail:focus-visible .contact-view__mail-text {
  transform: translateX(0.35rem);
}

.contact-view__actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.contact-view__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-han);
  font-size: 0.9375rem;
  transition: background var(--fast) var(--ease-out), color var(--fast) var(--ease-out);
}

.contact-view__copy:hover,
.contact-view__copy:focus-visible {
  background: var(--ink);
  color: var(--paper);
}

.contact-view__copy-mark {
  display: grid;
  place-items: center;
  font-size: 0.875rem;
}

.contact-view__note {
  max-width: 26rem;
  font-family: var(--font-han);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--tint-65);
}

/* —— 其他渠道 —— */
.contact-view__socials {
  margin-top: clamp(2.25rem, 4vw, 3.25rem);
}

.contact-view__socials-label,
.contact-view__brief-label {
  font-family: var(--font-han);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding-bottom: 0.6rem;
}

.contact-view__socials ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
}

.contact-view__socials li {
  background: var(--paper);
}

.contact-social {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.9rem 1rem;
  height: 100%;
  transition: background var(--fast) var(--ease-out), color var(--fast) var(--ease-out);
}

.contact-social:hover,
.contact-social:focus-visible {
  background: var(--ink);
  color: var(--paper);
}

.contact-social__label {
  font-family: var(--font-han);
  font-size: 1rem;
  font-weight: 600;
}

.contact-social__handle {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  color: var(--tint-50);
}

.contact-social:hover .contact-social__handle,
.contact-social:focus-visible .contact-social__handle {
  color: var(--tint-20);
}

/* —— 右栏：主创信息 —— */
.brief-item {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  padding-block: clamp(0.4rem, 0.9vw, 0.7rem);
}

.brief-note {
  font-family: var(--font-han);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--tint-65);
  max-width: 30ch;
  margin-top: 0.6rem;
}

@media (max-width: 1000px) {
  .contact-view__body {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-view__socials ul {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
