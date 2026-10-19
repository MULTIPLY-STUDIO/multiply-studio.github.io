<script setup lang="ts">
/**
 * 区块标题：标签行 + 大标题 + 可选注释。
 *
 * 排布规则（见 docs/spec/ui-layout.md）：
 * 编号（01、02）属于装饰性文字，已删除。标签用正文字号而不是 0.6875rem 小字。
 *
 * 注释与大标题同处一行，靠右放进第二列：
 * 它的左边缘因此永远落在大标题结束之后，视口变窄时也不会滑到标题下面、
 * 与标题左对齐 —— 那样读起来会像标题的一部分。
 */
import { computed } from 'vue'
import type { LocalizedText } from '@/types/content'
import { useLocale } from '@/composables/useLocale'
import { isCjkLocale } from '@/app/locales'

const props = withDefaults(
  defineProps<{
    label: LocalizedText
    title?: LocalizedText
    /** 大标题右侧的注释，比标题低一层级。 */
    note?: LocalizedText
    /** 标题字号档位。 */
    rank?: 'display' | 'section' | 'minor'
    /** 标题使用狸叶黑体（展示字）。中文标题默认走这个字族。 */
    brush?: boolean
  }>(),
  { rank: 'section', brush: true },
)

const { t, locale } = useLocale()

/** 汉字文化圈语言（中文、日文）共用汉字的行高与字距；拉丁语言不用。 */
const isHan = computed(() => isCjkLocale(locale.value))

/**
 * 中文标题用狸叶黑体或汉字无衬线；英文标题用拉丁展示字。
 * 两者行高与字距不同，不能共用 `.display` 的参数。
 */
const titleClass = computed(() => {
  if (props.rank === 'display') return isHan.value ? 'display-brush cover-rank' : 'display display--tight'
  return isHan.value ? 'display-brush' : 'display'
})
</script>

<template>
  <header class="section-head" :class="'section-head--' + rank">
    <p class="section-head__label">{{ t(label) }}</p>
    <h2 v-if="title" class="section-head__title" :class="titleClass">{{ t(title) }}</h2>
    <p v-if="note" class="section-head__note prose">{{ t(note) }}</p>
  </header>
</template>

<style scoped>
.section-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  column-gap: var(--gutter);
  row-gap: clamp(0.85rem, 2vw, 1.5rem);
}

/* 标签独占一行。 */
.section-head__label {
  grid-column: 1 / -1;
  font-family: var(--font-han);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--tint-65);
}

.section-head__title {
  grid-column: 1;
  min-width: 0;
  font-size: clamp(2.6rem, 6.5vw, 7rem);
  max-width: 22ch;
}

.section-head--display .section-head__title {
  font-size: clamp(3.6rem, 11.5vw, 13rem);
  max-width: 14ch;
}

.section-head--minor .section-head__title {
  font-size: clamp(1.9rem, 3.6vw, 3.2rem);
  max-width: 24ch;
}

/* 注释：与标题同处一行，靠右下角。 */
.section-head__note {
  grid-column: 2;
  justify-self: end;
  max-width: min(38rem, 100%);
  color: var(--tint-65);
  text-align: right;
}

/*
 * 窄视口里标题可能占满整行，注释换到下一行。
 * 换行后仍靠右，左边缘依旧在标题结束之后。
 */
@media (max-width: 640px) {
  .section-head__title {
    font-size: clamp(2.1rem, 9.5vw, 3.4rem);
  }

  .section-head {
    grid-template-columns: minmax(0, 1fr);
  }

  .section-head__note {
    grid-column: 1;
  }
}
</style>
