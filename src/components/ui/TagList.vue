<script setup lang="ts">
/**
 * 技术标签：方角细框。不用圆角、不用填色块。
 *
 * 字面用思源黑体（MULTIPLY Han）而不是等宽字体：标签里既有英文技术名
 * 也有中文说明，等宽字体的字距与中文字面宽不匹配；字距回到默认值，
 * 之前额外加的 0.04em 会让长标签显得松。
 */
defineProps<{ items: string[] }>()
</script>

<template>
  <ul class="tag-list">
    <li v-for="item in items" :key="item" class="tag">{{ item }}</li>
  </ul>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--tint-35);
  font-family: var(--font-han);
  font-size: 0.875rem;
  letter-spacing: normal;
  text-transform: uppercase;
  color: var(--tint-65);
  white-space: nowrap;
}
</style>
