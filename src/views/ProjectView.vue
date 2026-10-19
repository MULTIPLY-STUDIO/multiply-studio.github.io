<script setup lang="ts">
/**
 * 项目详情：图版头图 + 左元信息 / 右正文的双轴版面。
 * 正文块由内容层的 `blocks` 数组决定渲染顺序，组件不重排。
 */
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import { getProject, projects } from '@/content/projects'
import MultiplyPlate from '@/components/brand/MultiplyPlate.vue'
import TagList from '@/components/ui/TagList.vue'
import MetricRow from '@/components/ui/MetricRow.vue'
import InlineText from '@/components/ui/InlineText.vue'

const route = useRoute()
const { content, t } = useLocale()

const slug = computed(() => String(route.params.slug ?? ''))
const project = computed(() => getProject(slug.value))

const index = computed(() => projects.findIndex((item) => item.slug === slug.value))
const next = computed(() => (index.value < 0 ? undefined : projects[(index.value + 1) % projects.length]))

const page = ref<HTMLElement | null>(null)
useReveal(() => page.value)
</script>

<template>
  <div v-if="project" ref="page" class="project-view page">
    <header class="project-view__hero">
      <div class="project-view__crumbs">
        <RouterLink to="/work" class="project-view__back">
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
            <path d="M13 7H2M7 2L2 7l5 5" fill="none" stroke="currentColor" stroke-width="1.1" />
          </svg>
          <span>{{ t(content.project.back) }}</span>
        </RouterLink>
      </div>

      <div class="project-view__title-grid">
        <div class="project-view__title-block">
          <h1 class="project-view__title display">{{ project.title }}</h1>
          <p v-if="project.titleCn" class="project-view__title-cn">{{ project.titleCn }}</p>
          <p class="project-view__tagline prose">{{ t(project.tagline) }}</p>
        </div>

        <div class="project-view__plate">
          <MultiplyPlate :variant="project.plate" :density="project.density" animate />
        </div>
      </div>

      <dl class="project-view__facts">
        <div class="fact">
          <dt>{{ t(content.project.year) }}</dt>
          <dd>{{ project.span }}</dd>
        </div>
        <div class="fact">
          <dt>{{ t(content.project.role) }}</dt>
          <dd>{{ t(project.role) }}</dd>
        </div>
        <div class="fact">
          <dt>{{ t(content.project.platform) }}</dt>
          <dd>{{ t(project.platform) }}</dd>
        </div>
        <div class="fact">
          <dt>{{ t(content.project.status) }}</dt>
          <dd>{{ t(project.status) }}</dd>
        </div>
      </dl>
    </header>

    <div class="project-view__body">
      <aside class="project-view__aside">
        <span class="project-view__aside-label">{{ t(content.project.stack) }}</span>
        <TagList :items="project.stack" />

        <span class="project-view__aside-label project-view__aside-label--gap">{{ t(content.work.columns.discipline) }}</span>
        <ul class="project-view__disciplines">
          <li v-for="discipline in project.disciplines" :key="discipline">{{ discipline }}</li>
        </ul>

        <template v-if="project.links?.length">
          <span class="project-view__aside-label project-view__aside-label--gap">{{ t(content.project.links) }}</span>
          <MetricRow
            v-for="link in project.links"
            :key="link.href"
            :label="link.label"
            :value="link.external ? '↗' : '→'"
            :href="link.external ? link.href : undefined"
              />
        </template>
      </aside>

      <article class="project-view__content">
        <template v-for="(block, blockIndex) in project.blocks" :key="blockIndex">
          <p v-if="block.kind === 'lead'" class="project-view__lead prose prose--lead" data-reveal>
            <InlineText :value="t(block.body)" />
          </p>

          <h2 v-else-if="block.kind === 'heading'" class="project-view__heading" data-reveal>
            <span class="project-view__heading-text"><InlineText :value="t(block.body)" /></span>
          </h2>

          <div v-else-if="block.kind === 'text'" class="project-view__text prose" data-reveal>
            <InlineText :value="t(block.body)" />
          </div>

          <ul v-else-if="block.kind === 'list'" class="project-view__list" data-reveal>
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex" class="project-view__list-item">
              <span class="project-view__list-mark" aria-hidden="true">—</span>
              <span class="prose"><InlineText :value="t(item)" /></span>
            </li>
          </ul>

          <dl v-else-if="block.kind === 'spec'" class="project-view__spec" data-reveal>
            <div v-for="(item, itemIndex) in block.items" :key="itemIndex" class="spec-item">
              <dt>{{ t(item.label) }}</dt>
              <dd><InlineText :value="t(item.value)" /></dd>
            </div>
          </dl>

          <figure v-else-if="block.kind === 'quote'" class="project-view__quote" data-reveal>
            <blockquote class="prose"><InlineText :value="t(block.body)" /></blockquote>
            <figcaption v-if="block.cite">{{ t(block.cite) }}</figcaption>
          </figure>
        </template>
      </article>
    </div>

    <nav v-if="next" class="project-view__next" :aria-label="t(content.project.next)">
      <RouterLink :to="`/work/${next.slug}`" class="next-link">
        <span class="project-view__next-label">{{ t(content.project.next) }}</span>
        <span class="next-link__title display">{{ next.title }}</span>
        <span class="next-link__plate" aria-hidden="true">
          <MultiplyPlate :variant="next.plate" :density="next.density" />
        </span>
      </RouterLink>
    </nav>
  </div>

  <div v-else class="project-missing page">
    <p class="display">404</p>
    <RouterLink to="/work" class="project-view__back">{{ t(content.project.back) }}</RouterLink>
  </div>
</template>

<style scoped>
/* —— 头部 —— */
.project-view__hero {
  padding: clamp(1.25rem, 2.5vw, 2rem) var(--page-x) 0;
}

.project-view__crumbs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
  color: var(--tint-65);
}

.project-view__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-han);
  font-size: 1rem;
  transition: opacity var(--fast) var(--ease-out);
}

.project-view__back:hover,
.project-view__back:focus-visible {
  opacity: 0.55;
}

.project-view__title-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: var(--gutter);
  align-items: end;
  padding-block: clamp(1.5rem, 3.5vw, 3rem);
}

.project-view__title-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-view__title {
  font-size: clamp(3rem, 9.5vw, 9.5rem);
  letter-spacing: -0.05em;
  line-height: 0.8;
  overflow-wrap: anywhere;
  text-transform: none;
}

.project-view__title-cn {
  font-family: var(--font-han);
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  color: var(--tint-50);
  letter-spacing: 0.04em;
}

.project-view__tagline {
  max-width: 28ch;
  color: var(--tint-65);
}

.project-view__plate {
  aspect-ratio: 1;
  overflow: hidden;
}

/* —— 事实条 —— */
.project-view__facts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--gutter);
  padding-block: 1rem;
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.fact dt {
  font-family: var(--font-han);
  font-size: 0.875rem;
  color: var(--tint-65);
}

.fact dd {
  font-family: var(--font-han);
  font-size: 1.0625rem;
  line-height: 1.4;
}

/* —— 主体：左栏粘性元信息 + 右栏正文 —— */
.project-view__body {
  display: grid;
  grid-template-columns: minmax(10rem, 0.28fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(2.5rem, 5vw, 5rem) var(--page-x);
  align-items: start;
}

.project-view__aside {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-view__aside-label {
  font-family: var(--font-han);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding-bottom: 0.5rem;
}

.project-view__aside-label--gap {
  margin-top: 1.25rem;
}

.project-view__disciplines {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--tint-65);
  letter-spacing: 0.04em;
}

.project-view__content {
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.4vw, 2rem);
  max-width: 46rem;
  min-width: 0;
}

.project-view__lead {
  font-size: clamp(1.15rem, 1.1rem + 0.7vw, 1.625rem);
  line-height: 1.5;
}

.project-view__heading {
  margin-top: clamp(1.25rem, 2.4vw, 2rem);
}

.project-view__heading-text {
  font-family: var(--font-brush);
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.project-view__text {
  color: var(--tint-80);
}

.project-view__list {
  display: flex;
  flex-direction: column;
}

.project-view__list-item {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 0.5rem;
  padding-block: 0.65rem;
}

.project-view__list-mark {
  color: var(--tint-35);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.project-view__list-item .prose {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--tint-80);
}

/* 规格表：两列等宽，用极细线分隔。 */
.project-view__spec {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
}

.spec-item {
  padding: 0.7rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-item:nth-child(odd) {
  padding-right: var(--gutter);
}

.spec-item:nth-child(even) {
  padding-left: var(--gutter);
}

.spec-item dt {
  font-family: var(--font-han);
  font-size: 0.875rem;
  color: var(--tint-65);
}

.spec-item dd {
  font-family: var(--font-han);
  font-size: 1.0625rem;
  line-height: 1.45;
}

.project-view__quote {
  margin-block: 0.5rem;
  padding-left: clamp(1rem, 2vw, 1.5rem);
  border-left: 2px solid var(--ink);
}

.project-view__quote blockquote {
  font-size: clamp(1.15rem, 1.6vw, 1.4rem);
  line-height: 1.55;
}

.project-view__quote figcaption {
  margin-top: 0.65rem;
  font-family: var(--font-han);
  font-size: 0.9375rem;
  color: var(--tint-65);
}

/* —— 下一个项目 —— */
.project-view__next {
  padding-inline: var(--page-x);
}

.next-link {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 8rem;
  align-items: center;
  gap: var(--gutter);
  padding-block: clamp(1.5rem, 3vw, 2.5rem);
  overflow: hidden;
}

.project-view__next-label {
  grid-column: 1;
  font-family: var(--font-han);
  font-size: 1rem;
  color: var(--tint-65);
}

.next-link__title {
  grid-column: 1;
  font-size: clamp(2.25rem, 7vw, 6.5rem);
  letter-spacing: -0.045em;
  line-height: 0.85;
  text-transform: none;
  transition: transform var(--base) var(--ease-out);
}

.next-link:hover .next-link__title,
.next-link:focus-visible .next-link__title {
  transform: translateX(0.5rem);
}

.next-link__plate {
  grid-column: 2;
  grid-row: 1 / 3;
  width: 8rem;
  aspect-ratio: 1;
  overflow: hidden;
  opacity: 0.65;
  transition: opacity var(--base) var(--ease-out);
}

.next-link:hover .next-link__plate,
.next-link:focus-visible .next-link__plate {
  opacity: 1;
}

/* —— 缺失 —— */
.project-missing {
  min-height: 60svh;
  display: grid;
  place-content: center;
  gap: 1.5rem;
  justify-items: center;
  padding-top: var(--header-h);
}

.project-missing .display {
  font-size: clamp(5rem, 20vw, 16rem);
}

@media (max-width: 1000px) {
  .project-view__title-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  .project-view__plate {
    max-width: 16rem;
  }

  .project-view__facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1rem;
  }

  .project-view__body {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .project-view__aside {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem var(--gutter);
    align-items: start;
    padding-bottom: 1.5rem;
  }

  .project-view__aside-label--gap {
    margin-top: 0;
  }
}

@media (max-width: 640px) {
  .project-view__spec {
    grid-template-columns: minmax(0, 1fr);
  }

  .spec-item:nth-child(even) {
    padding-left: 0;
    border-left: 0;
  }

  .next-link {
    grid-template-columns: minmax(0, 1fr);
  }

  .next-link__plate {
    display: none;
  }
}
</style>
