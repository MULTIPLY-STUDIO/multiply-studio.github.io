<script setup lang="ts">
/**
 * 语言切换菜单。
 *
 * 按钮沿用页头的方形描边按钮，点开后在按钮下方展开一块**平贴**的白色面板：
 * 1px 实线外框、条目之间一条发丝线，没有圆角、没有投影。
 * 展开动画与移动端面板同一套：`clip-path` 自下而上切入，不做位移与缩放。
 *
 * 语言清单来自 `@/app/locales`，新增语言不需要改这个组件。
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { locales } from '@/app/locales'

const { content, t, locale, setLocale } = useLocale()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)
const list = ref<HTMLElement | null>(null)

const label = computed(() => t(content.value.ui.language))

const toggle = () => {
  open.value = !open.value
}

const close = (restoreFocus = false) => {
  if (!open.value) return
  open.value = false
  if (restoreFocus) button.value?.focus()
}

const choose = (id: (typeof locales)[number]['id']) => {
  setLocale(id)
  close(true)
}

/** 点击外部关闭。用 pointerdown，避免和按钮自身的 click 打架。 */
const onPointerDown = (event: PointerEvent) => {
  if (!open.value) return
  if (root.value && !root.value.contains(event.target as Node)) close()
}

/** 打开后把焦点交给当前语言那一项，键盘用户可以直接回车确认或继续移动。 */
const focusCurrent = () => {
  const items = list.value?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')
  if (!items) return
  const current = Array.from(items).find((item) => item.getAttribute('aria-checked') === 'true')
  ;(current ?? items[0])?.focus()
}

const onKeyDown = (event: KeyboardEvent) => {
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close(true)
    return
  }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  const items = Array.from(
    list.value?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [],
  )
  if (items.length === 0) return
  const index = items.indexOf(document.activeElement as HTMLButtonElement)
  const step = event.key === 'ArrowDown' ? 1 : -1
  const next = index < 0 ? 0 : (index + step + items.length) % items.length
  items[next]?.focus()
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  focusCurrent()
})

document.addEventListener('pointerdown', onPointerDown)
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <div ref="root" class="lang-menu" @keydown="onKeyDown">
    <button
      ref="button"
      type="button"
      class="header-button"
      :aria-label="label"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <!-- Tabler Icons: language（MIT）。线性描边，与全站图标同一套语言。 -->
      <svg
        class="header-button__glyph"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
        stroke-linejoin="miter"
        aria-hidden="true"
      >
        <path d="M4 5h7" />
        <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
        <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
        <path d="M12 20l4 -9l4 9" />
        <path d="M19.1 18h-6.2" />
      </svg>
    </button>

    <Transition name="lang-menu">
      <ul v-if="open" ref="list" class="lang-menu__list" role="menu" :aria-label="label">
        <li v-for="item in locales" :key="item.id">
          <button
            type="button"
            class="lang-menu__item"
            role="menuitemradio"
            :aria-checked="locale === item.id"
            :lang="item.htmlLang"
            @click="choose(item.id)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang-menu {
  position: relative;
}

.lang-menu__list {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 70;
  min-width: 9rem;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--paper);
  border: var(--rule);
}

.lang-menu__list > li + li {
  border-top: var(--rule-hair);
}

/*
 * 条目是文字按钮，不做胶囊、不做圆角。
 * 悬停与当前语言都用反白：与页头按钮的悬停语言一致。
 */
.lang-menu__item {
  display: block;
  width: 100%;
  padding: 0.55rem 0.85rem;
  font-family: var(--font-han);
  font-size: 1rem;
  letter-spacing: 0.02em;
  text-align: left;
  color: var(--ink);
  background: var(--paper);
  transition: background var(--fast) var(--ease-out), color var(--fast) var(--ease-out);
}

.lang-menu__item:hover,
.lang-menu__item:focus-visible,
.lang-menu__item[aria-checked='true'] {
  background: var(--ink);
  color: var(--paper);
}

.lang-menu__item:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

/* 展开：自下而上切入，与移动端面板同一套动作 */
.lang-menu-enter-active,
.lang-menu-leave-active {
  transition: clip-path var(--fast) var(--ease-in-out);
}

.lang-menu-enter-from,
.lang-menu-leave-to {
  clip-path: inset(0 0 100% 0);
}

.lang-menu-enter-to,
.lang-menu-leave-from {
  clip-path: inset(0 0 0 0);
}
</style>
