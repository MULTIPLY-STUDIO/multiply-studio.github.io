<script setup lang="ts">
/**
 * 工作室页：陈述 → 能力 → 流程。
 *
 * 排布规则（docs/spec/ui-layout.md）：
 * 页边不放装饰性小字，编号（P1–P4、C1–C4、01–05）也已删除；
 * 条目之间不加分隔线，靠留白分开。
 */
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useReveal } from '@/composables/useReveal'
import { capabilities, designNotes } from '@/content/studio'
import TagList from '@/components/ui/TagList.vue'

const { content, t } = useLocale()

const page = ref<HTMLElement | null>(null)
useReveal(() => page.value)
</script>

<template>
  <div ref="page" class="studio-view page">
    <header class="studio-view__hero">
      <h1 class="studio-view__title display-brush">{{ t(content.studio.title) }}</h1>
      <p class="studio-view__lead serif serif--display">{{ t(content.studio.lead) }}</p>
    </header>


    <!-- 能力 -->
    <section class="studio-view__section studio-view__section--capability">
      <div class="block">
        <h2 class="block__label">{{ t(content.studio.capabilityLabel) }}</h2>
        <ul class="capability-list">
          <li
            v-for="capability in capabilities"
            :key="capability.index"
            class="capability-item"
            data-reveal
          >
            <h3 class="capability-item__title display-brush">{{ t(capability.title) }}</h3>
            <p class="capability-item__body prose">{{ t(capability.body) }}</p>
            <TagList :items="capability.items" />
          </li>
        </ul>
      </div>
    </section>

    <!-- 设计 -->
    <section class="studio-view__section studio-view__section--process">
      <div class="block">
        <h2 class="block__label">{{ t(content.studio.designLabel) }}</h2>
        <ol class="process-list">
          <li v-for="note in designNotes" :key="note.index" class="process-step" data-reveal>
            <h3 class="process-step__title display-brush">{{ t(note.title) }}</h3>
            <p class="process-step__body prose">{{ t(note.body) }}</p>
          </li>
        </ol>
      </div>
    </section>

  </div>
</template>

<style scoped>
.studio-view__hero {
  padding: clamp(1.75rem, 3.5vw, 3rem) var(--page-x) clamp(1rem, 2vw, 1.5rem);
}

.studio-view__title {
  font-size: clamp(3.4rem, 12vw, 11rem);
  line-height: 1;
}

.studio-view__lead {
  margin-top: clamp(1.25rem, 2.5vw, 2rem);
  max-width: 34ch;
  margin-left: auto;
  color: var(--tint-80);
}

.studio-view__section {
  padding: clamp(2.25rem, 4.5vw, 3.5rem) var(--page-x);
}

.studio-view__section--last {
  border-bottom: 0;
  padding-bottom: clamp(3rem, 6vw, 6rem);
}

/* 每个板块：左标签 + 右内容，标签是正文级标题而不是页边小字。 */
/* 左标签列必须足够宽：标签下方有一条延伸到列宽的下划线，
   列太窄会把它压成一个短横。 */
.block {
  display: grid;
  grid-template-columns: minmax(11rem, 0.26fr) minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

.block__label {
  font-family: var(--font-han);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  position: sticky;
  top: calc(var(--header-h) + 2rem);
  /*
   * 标签下移量与右栏首行文字的位置对齐。
   *
   * 右栏第一个元素自带内边距（卡片内边距、指标行内边距各不相同），
   * 而左栏标签贴着栏顶，于是每个区块的标签都会比右栏首行高出十几像素，
   * 且各区块差得还不一样。这里按各自的内边距补上，并留出首个行盒的
   * 上下留白差，让标签文字的顶端与右栏首行文字落在同一条线上。
   */
  padding-top: var(--label-offset, 0);
}

/* 能力：卡片内边距 clamp(1.1rem, 2vw, 1.6rem)，标题 1.6rem 行盒更高一些 */
.studio-view__section--capability .block__label {
  --label-offset: calc(clamp(1.1rem, 2vw, 1.6rem) + 0.15rem);
}

/* 流程：卡片内边距 clamp(1rem, 1.8vw, 1.4rem)，标题字号更小，行盒位置更靠下 */
.studio-view__section--process .block__label {
  --label-offset: calc(clamp(1rem, 1.8vw, 1.4rem) + 0.5rem);
}


/* —— 原则 —— */




/* —— 能力 —— */
.capability-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.capability-item {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  /*
   * 只留上下内边距。
   *
   * 卡片底色是 --paper，和页面同色，左右内边距不产生任何视觉分界，
   * 却让卡片内文字比栏的起始轴右移了几十像素，
   * 三段的左轴对不上。这里去掉左右内边距，文字直接贴栏的左边缘。
   */
  padding-block: clamp(1.1rem, 2vw, 1.6rem);
  background: var(--paper);
}

.capability-item__title {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  line-height: 1.25;
  /* 标题按自身高度排，不预留空行 */
}

.capability-item__body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--tint-65);
  /*
   * 不要 flex: 1。
   *
   * 卡片在栅格里会被拉成等高，正文一旦可伸展，多出来的高度就全灌进
   * 正文框内部，把标签推到卡片底部 —— 于是说明短的那张卡
   * 文字与标签之间空出一大块，长的则紧挨着。正文按自身高度排，
   * 标签始终紧跟其后，多余空间留在卡片下方。
   */
}

/* —— 流程 —— */
.process-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.process-step {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  /* 同上：只保留上下内边距，左轴与其它区块一致 */
  padding-block: clamp(1rem, 1.8vw, 1.4rem);
  background: var(--paper);
}

.process-step__title {
  font-size: 1.25rem;
  line-height: 1.25;
}

.process-step__body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--tint-65);
}

/* —— 主创 —— */

/* BrandField 是绝对定位的，容器必须自己建立定位上下文，
   否则它会以页面为参照铺满整屏。 */





@media (max-width: 1000px) {
  .block {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  .block__label {
    position: static;
    /*
     * 单列堆叠时标签在内容上方，不再与右栏首行并排，
     * 之前为对齐补的偏移要撤掉，否则标签上方多出一段空白。
     */
    padding-top: 0;
  }

  .capability-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
