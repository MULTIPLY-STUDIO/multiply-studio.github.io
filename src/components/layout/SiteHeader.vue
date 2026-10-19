<script setup lang="ts">
/**
 * 全站页头。瑞士式三段网格：左品牌 / 中导航 / 右工具。
 * 桌面为横向导航，移动端折叠为整屏反白面板（按顺序展开、逆序收起）。
 */
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useScrollState } from '@/composables/useScrollState'
import { sections } from '@/app/sections'
import SiteMark from '@/components/brand/SiteMark.vue'
import LanguageMenu from '@/components/layout/LanguageMenu.vue'

const { content, t } = useLocale()
const { activeIndex } = useScrollState()
const route = useRoute()

const menuOpen = ref(false)

const navItems = computed(() => content.value.navigation)

/** 首页用滚动状态判断，其余页面用路径前缀判断。 */
const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  if (to === '/work') return route.path.startsWith('/work')
  return route.path === to
}

const onHome = computed(() => route.path === '/')

/**
 * 页头右侧只保留一项有信息量的读数：当前所处区块的名字。
 * 原先的「01 / 05」是纯装饰性计数，删掉；区块名本身能告诉用户在哪。
 */
const sectionLabel = computed(() => {
  if (!onHome.value) return ''
  const definition = sections[activeIndex.value]
  return definition ? t(definition.title) : ''
})

/** 当前区块已经由导航下划线标出，页头读数只在滚动到中部区块时提供额外信息。 */
const showSectionLabel = computed(() => onHome.value && activeIndex.value > 0)

const closeMenu = () => {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.body.classList.toggle('is-locked', open)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

onBeforeUnmount(() => {
  document.body.classList.remove('is-locked')
})
</script>

<template>
  <header class="site-header" :class="{ 'is-menu-open': menuOpen }">
    <div class="site-header__grid">
      <!-- 方标。站名交给链接的 aria-label，图形本身不带文字。 -->
      <RouterLink to="/" class="site-header__brand" :aria-label="t(content.identity.name)">
        <SiteMark variant="mark" class="site-header__mark" />
      </RouterLink>

      <nav class="site-header__nav" :aria-label="t(content.ui.menu)">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          <span class="nav-link__label">{{ t(item.label) }}</span>
        </RouterLink>
      </nav>

      <div class="site-header__tools">
        <span v-if="showSectionLabel" class="site-header__section">{{ sectionLabel }}</span>
        <LanguageMenu />
        <button
          type="button"
          class="header-button header-button--menu"
          :aria-label="menuOpen ? t(content.ui.close) : t(content.ui.menu)"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-glyph" :class="{ 'is-open': menuOpen }" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
      </div>
    </div>
  </header>

  <Transition name="panel">
    <div v-if="menuOpen" class="mobile-panel">
      <nav class="mobile-panel__nav" :aria-label="t(content.ui.menu)">
        <RouterLink
          v-for="(item, index) in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-panel__link"
          :style="{ '--i': index }"
          @click="closeMenu"
        >
          <span class="mobile-panel__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="mobile-panel__label display">{{ t(item.label) }}</span>
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  height: var(--header-h);
  background: var(--paper);
}

.site-header__grid {
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  padding-inline: var(--page-x);
  column-gap: var(--gutter);
}

/* —— 品牌 ——
   方标是正方形，尺寸就是边长。 */
.site-header__brand {
  display: inline-flex;
  align-items: center;
  height: 100%;
  min-width: 0;
}

/*
 * 方标边长。略低于页头高度，留出上下呼吸。
 *
 * 选择器带上 .site-header__brand 是为了压过 SiteMark 内部的 `--mark`
 * 尺寸规则（那条写的是 100%），否则图形会被拉满整个页头。
 */
.site-header__brand .site-header__mark {
  height: clamp(1.75rem, 2.2vw, 2.1rem);
  width: auto;
  flex: none;
  display: block;
}

/* —— 导航 —— */
.site-header__nav {
  display: flex;
  align-items: center;
  height: 100%;
  gap: clamp(0.75rem, 2vw, 2rem);
}

/*
 * 导航是界面标签，不是技术标注：不承担等宽对齐，中文也不该走等宽字族的兜底链。
 * 直接用汉字无衬线，中文与英文标签都是正文字号。
 */
.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-family: var(--font-han);
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.nav-link__label {
  position: relative;
  padding-block: 0.15rem;
}

/* 当前项：下方一条与字等宽的实线，不用色块。 */
.nav-link__label::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.2rem;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--base) var(--ease-out);
}

.nav-link:hover .nav-link__label::after,
.nav-link:focus-visible .nav-link__label::after,
.nav-link.is-active .nav-link__label::after {
  transform: scaleX(1);
}

/* —— 工具区 —— */
.site-header__tools {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/*
 * 当前区块名。用正文字号而不是 0.6875rem 小字：
 * 页边的小号装饰字一律去掉，保留下来的信息必须是可读的。
 */
.site-header__section {
  margin-right: 0.75rem;
  font-family: var(--font-han);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--tint-65);
}

.header-button--menu {
  display: none;
}

/* —— 汉堡：三横线，展开时中间线退场、上下两条交成叉 —— */
.menu-glyph {
  position: relative;
  width: 0.875rem;
  height: 0.625rem;
  display: block;
}

.menu-glyph span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform var(--base) var(--ease-in-out), opacity var(--fast) var(--ease-out);
}

.menu-glyph span:nth-child(1) {
  top: 0;
}

.menu-glyph span:nth-child(2) {
  top: 50%;
}

.menu-glyph span:nth-child(3) {
  bottom: 0;
}

.menu-glyph.is-open span:nth-child(1) {
  transform: translateY(calc(50% - 1px)) rotate(45deg);
}

.menu-glyph.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-glyph.is-open span:nth-child(3) {
  transform: translateY(calc(-50% + 1px)) rotate(-45deg);
}

/* —— 移动面板 —— */
.mobile-panel {
  position: fixed;
  inset: var(--header-h) 0 0;
  z-index: 55;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--page-x);
  background: var(--ink);
  color: var(--paper);
}

.mobile-panel__nav {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.mobile-panel__link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--tint-80);
  animation: panel-item 460ms var(--ease-out) both;
  animation-delay: calc(var(--i) * 55ms + 90ms);
}

.mobile-panel__index {
  color: var(--tint-50);
  min-width: 1.75rem;
}

.mobile-panel__label {
  /* 狸叶黑体，字号比原先收一档 */
  font-family: var(--font-brush);
  font-weight: 400;
  font-size: clamp(1.75rem, 9vw, 2.75rem);
  line-height: 1.15;
}



@keyframes panel-item {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-enter-active,
.panel-leave-active {
  transition: clip-path var(--base) var(--ease-in-out);
}

.panel-enter-from,
.panel-leave-to {
  clip-path: inset(0 0 100% 0);
}

.panel-enter-to,
.panel-leave-from {
  clip-path: inset(0 0 0 0);
}

@media (max-width: 860px) {
  .site-header__grid {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .site-header__nav,
  .site-header__section {
    display: none;
  }

  .header-button--menu {
    display: grid;
  }

}

@media (prefers-reduced-motion: reduce) {
  .mobile-panel__link {
    animation: none;
  }
}
</style>
