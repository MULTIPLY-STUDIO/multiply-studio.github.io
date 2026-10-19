<script setup lang="ts">
/**
 * 项目归档：左栏筛选，右栏整行列表。
 * 筛选只改变视图，不改变排序 —— 顺序始终是时间倒序。
 */
import { computed, ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import { projects } from '@/content/projects'
import type { Discipline } from '@/types/content'
import ProjectRow from '@/components/project/ProjectRow.vue'

const { content, t } = useLocale()

type Filter = 'ALL' | Discipline

const FILTERS: { id: Filter; label: typeof content.value.work.filterAll }[] = [
  { id: 'ALL', label: content.value.work.filterAll },
  { id: 'ANDROID', label: { zh: 'Android', en: 'Android', ja: 'Android' } },
  { id: 'DESKTOP', label: { zh: '桌面', en: 'Desktop', ja: 'デスクトップ' } },
  { id: 'WEB', label: { zh: 'Web', en: 'Web', ja: 'Web' } },
  { id: 'TOOL', label: { zh: '工具', en: 'Tooling', ja: 'ツール' } },
]

const active = ref<Filter>('ALL')

const visible = computed(() =>
  active.value === 'ALL'
    ? projects
    : projects.filter((project) => project.disciplines.includes(active.value as Discipline)),
)

const counts = computed(() => {
  const base: Record<string, number> = { ALL: projects.length }
  for (const filter of FILTERS) {
    if (filter.id === 'ALL') continue
    base[filter.id] = projects.filter((project) => project.disciplines.includes(filter.id as Discipline)).length
  }
  return base
})

const page = ref<HTMLElement | null>(null)
useReveal(() => page.value)
</script>

<template>
  <div ref="page" class="work-view page">
    <header class="work-view__hero">
      <h1 class="work-view__title display-brush">{{ t(content.work.title) }}</h1>
      <p class="work-view__note serif serif--display">{{ t(content.work.note) }}</p>
    </header>

    <div class="work-view__body">
      <aside class="work-view__filters" :aria-label="t(content.work.title)">
        <div class="work-view__filter-list" role="group">
          <button
            v-for="filter in FILTERS"
            :key="filter.id"
            type="button"
            class="filter"
            :class="{ 'is-active': active === filter.id }"
            :aria-pressed="active === filter.id"
            @click="active = filter.id"
          >
            <span class="filter__label">{{ t(filter.label) }}</span>
            <span class="filter__count">{{ counts[filter.id] ?? 0 }}</span>
          </button>
        </div>
      </aside>

      <div class="work-view__list">
        <ProjectRow
          v-for="project in visible"
          :key="project.slug"
          :project="project"
          data-reveal
        />

        <p v-if="visible.length === 0" class="work-view__empty prose">{{ t(content.work.empty) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-view__hero {
  padding: clamp(1.75rem, 3.5vw, 3rem) var(--page-x) clamp(1rem, 2vw, 1.5rem);
}

.work-view__title {
  font-size: clamp(3.4rem, 12vw, 11rem);
  line-height: 1;
}

.work-view__note {
  margin-top: clamp(1.25rem, 2.5vw, 2rem);
  max-width: 32ch;
  margin-left: auto;
  color: var(--tint-80);
}

.work-view__body {
  display: grid;
  grid-template-columns: minmax(9rem, 0.2fr) minmax(0, 1fr);
  gap: var(--gutter);
  padding: clamp(2rem, 4vw, 3rem) var(--page-x) clamp(3rem, 6vw, 6rem);
  align-items: start;
}

.work-view__filters {
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.work-view__filters-label {
  color: var(--tint-50);
  padding-bottom: 0.5rem;
}

.work-view__filter-list {
  display: flex;
  flex-direction: column;
}

.filter {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0;
  text-align: left;
  font-family: var(--font-han);
  font-size: 1.0625rem;
  color: var(--tint-65);
  transition: color var(--fast) var(--ease-out), padding-left var(--fast) var(--ease-out);
}

.filter:hover,
.filter:focus-visible {
  color: var(--ink);
  padding-left: 0.35rem;
}

.filter.is-active {
  color: var(--ink);
  font-weight: 600;
}

.filter__count {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--tint-50);
}

.work-view__list {
  position: relative;
}

/* 归档页的列头：与 ProjectRow 的五列完全对齐，否则列名会落在错误的轴上。 */
.work-view__columns {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1.15fr) minmax(0, 1.5fr) 10rem 1.25rem;
  column-gap: var(--gutter);
  padding-bottom: 0.5rem;
  color: var(--tint-50);
  font-size: 0.875rem;
}

/* 显式放置，避免长标签（“年份”）撑开网格后换行。 */
.work-view__columns span:nth-child(1) {
  grid-column: 1;
}

.work-view__columns span:nth-child(2) {
  grid-column: 2;
}

.work-view__columns span:nth-child(3) {
  grid-column: 4;
  white-space: nowrap;
}

.work-view__columns span:nth-child(4) {
  grid-column: 5;
  white-space: nowrap;
}

.work-view__empty {
  padding-block: 3rem;
  color: var(--tint-50);
}

@media (max-width: 1080px) {
  .work-view__body {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  .work-view__filters {
    position: static;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .work-view__filters-label {
    border: 0;
    padding: 0;
  }

  .work-view__filter-list {
    flex-direction: row;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .filter {
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--tint-35);
    font-size: 0.875rem;
  }

  .filter.is-active {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
  }

  .filter:hover,
  .filter:focus-visible {
    padding-left: 0.6rem;
  }

  .work-view__columns {
    display: none;
  }
}
</style>
