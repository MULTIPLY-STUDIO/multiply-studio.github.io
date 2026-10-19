<script setup lang="ts">
/**
 * 项目行：归档页与首页共用的整行条目。
 * 悬停时右侧图版以反白方式出现 —— 与「正片叠底」的机理一致：
 * 内容是叠在图层上的，不是弹出来的卡片。
 */
import { computed } from 'vue'
import type { Project } from '@/types/content'
import { useLocale } from '@/composables/useLocale'
import MultiplyPlate from '@/components/brand/MultiplyPlate.vue'

const props = withDefaults(
  defineProps<{
    project: Project
    /** 首页用 complete 显示摘要，归档用 compact 只显示一行。 */
    layout?: 'compact' | 'complete'
  }>(),
  { layout: 'compact' },
)

const { t } = useLocale()

const disciplines = computed(() => props.project.disciplines.join(' / '))
</script>

<template>
  <RouterLink
    :to="`/work/${project.slug}`"
    class="project-row"
    :class="'project-row--' + layout"
  >
    <span class="project-row__index mono">{{ project.index }}</span>

    <span class="project-row__main">
      <span class="project-row__title display">{{ project.title }}</span>
      <span v-if="project.titleCn" class="project-row__cn">{{ project.titleCn }}</span>
    </span>

    <span class="project-row__summary prose">{{ t(project.summary) }}</span>

    <span class="project-row__meta">
      <span class="mono">{{ project.span }}</span>
      <span class="mono project-row__discipline">{{ disciplines }}</span>
    </span>

    <span class="project-row__plate" aria-hidden="true">
      <MultiplyPlate :variant="project.plate" :density="project.density" />
    </span>

    <span class="project-row__arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path d="M3 13L13 3M13 3H5M13 3v8" fill="none" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </span>
  </RouterLink>
</template>

<style scoped>
.project-row {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1.35fr) minmax(0, 1.4fr) 10rem 7rem 1.25rem;
  align-items: center;
  column-gap: var(--gutter);
  padding: clamp(1.1rem, 2vw, 1.6rem) 0;
  overflow: hidden;
}

/* 悬停底纹：从左侧切入的一条浅灰，作为「层」的提示。 */
.project-row::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: var(--tint-05);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--base) var(--ease-out);
}

.project-row:hover::before,
.project-row:focus-visible::before {
  transform: scaleX(1);
}

.project-row > * {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.project-row__index {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--tint-50);
  align-self: start;
  padding-top: 0.3rem;
}

.project-row__main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.project-row__title {
  font-size: clamp(1.75rem, 3.4vw, 3rem);
  letter-spacing: -0.03em;
  line-height: 0.95;
  text-transform: none;
  /*
   * 长项目名（BiliVideoDown 这类）在中等宽度下装不进标题列时，
   * 必须换行而不是溢出：溢出的字会压进列间距，看上去像标题和摘要贴在一起。
   */
  overflow-wrap: anywhere;
  min-width: 0;
}

.project-row__cn {
  font-family: var(--font-han);
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: var(--tint-65);
}

.project-row__summary {
  font-family: var(--font-han);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--tint-65);
  max-width: 34rem;
}

.project-row__meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  color: var(--tint-50);
  align-self: start;
  padding-top: 0.3rem;
}

.project-row__discipline {
  font-size: 0.875rem;
  letter-spacing: 0.03em;
}

.project-row__arrow {
  justify-self: end;
  align-self: start;
  padding-top: 0.3rem;
  color: var(--tint-35);
  transition: color var(--fast) var(--ease-out), transform var(--base) var(--ease-out);
}

.project-row:hover .project-row__arrow,
.project-row:focus-visible .project-row__arrow {
  color: var(--ink);
  transform: translate(2px, -2px);
}

/* 右侧图版：悬停时从右侧切入。 */
/*
 * 项目图像：在网格里单独占一列，悬停时从右侧切入。
 *
 * 之前是绝对定位贴在行尾（right: 0; width: 8rem），悬停展开后会压在
 * 年份、领域标签和箭头上面把它们盖住；窄一点的视口走平板布局，
 * 图像本来就占一列，所以那边看不到这个问题。
 *
 * 现在所有视口都占列，只是宽屏才做悬停切入，任何时候都不压文字。
 */
.project-row__plate {
  position: relative;
  grid-column: 5;
  justify-self: end;
  align-self: center;
  width: clamp(4.5rem, 5.5vw, 7rem);
  aspect-ratio: 1;
  pointer-events: none;
  opacity: 0;
  clip-path: inset(0 0 0 100%);
  transition: clip-path var(--base) var(--ease-out), opacity var(--fast) var(--ease-out);
}

.project-row__plate :deep(.multiply-plate) {
  height: 100%;
}

.project-row:hover .project-row__plate,
.project-row:focus-visible .project-row__plate {
  opacity: 1;
  clip-path: inset(0 0 0 0);
}

/* complete 布局给摘要更多空间，并把图版作为右侧常驻图示。 */
.project-row--complete {
  grid-template-columns: 3rem minmax(0, 1.3fr) minmax(0, 1.5fr) 9rem 7rem 1.25rem;
  padding: clamp(1.5rem, 3vw, 2.4rem) 0;
}

.project-row--complete .project-row__summary {
  font-size: 0.9375rem;
  color: var(--tint-80);
}

@media (max-width: 1080px) {
  /*
   * 平板布局：图版从「绝对定位贴右边缘」改为**真正的网格列**。
   * 原来图版浮在内容之上，会压住第 3 列的年份与领域文字；
   * 让它占一列之后，各列不会再互相侵占。
   */
  .project-row,
  .project-row--complete {
    grid-template-columns: 2.25rem minmax(0, 1fr) auto 5.5rem 1.25rem;
    column-gap: clamp(0.75rem, 2vw, 1.25rem);
    row-gap: 0.6rem;
  }

  .project-row__summary {
    grid-column: 2 / 5;
    grid-row: 2;
  }

  .project-row__meta {
    grid-column: 3;
    grid-row: 1;
    align-self: center;
    padding-top: 0;
    text-align: right;
    align-items: flex-end;
    white-space: nowrap;
  }

  .project-row__arrow {
    grid-column: 5;
    grid-row: 1;
    align-self: center;
    padding-top: 0;
  }

  .project-row__index {
    align-self: center;
    padding-top: 0;
  }

  /* 图版进入常规网格流：居右、正方形、略作裁切以免抢占视觉权重。 */
  .project-row__plate {
    position: relative;
    grid-column: 4;
    grid-row: 1;
    width: 5.5rem;
    height: 5.5rem;
    aspect-ratio: 1;
    justify-self: auto;
    align-self: center;
    opacity: 1;
    clip-path: none;
    pointer-events: none;
  }

  .project-row__plate :deep(.multiply-plate) {
    height: 100%;
  }

  /* 平板上不需要悬停才出现，图版常驻但压低对比。 */
  .project-row__plate :deep(.multiply-plate) {
    opacity: 0.75;
  }
}

@media (max-width: 640px) {
  .project-row,
  .project-row--complete {
    grid-template-columns: 1.75rem minmax(0, 1fr) 1.25rem;
    row-gap: 0.55rem;
  }

  .project-row__summary {
    grid-column: 2 / 4;
    grid-row: 2;
    font-size: 0.875rem;
  }

  .project-row__meta {
    grid-column: 2 / 4;
    grid-row: 3;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: baseline;
    text-align: left;
  }

  .project-row__plate {
    display: none;
  }

  .project-row__arrow {
    grid-row: 1;
    grid-column: 3;
  }
}
</style>
