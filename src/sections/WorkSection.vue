<script setup lang="ts">
/**
 * 首页项目区块：标题 + 说明 + 整行项目列表 + 全部项目入口。
 *
 * 排布规则：不在标题行右侧塞「全部项目」这类小字导航（那属于装饰性文字），
 * 改为列表结束后一个正常尺寸的链接。说明文字交给 SectionHead 的 note，
 * 与标题同处一行、靠右，视口变窄时也不会滑到标题左下方。
 */
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { projects } from '@/content/projects'
import ProjectRow from '@/components/project/ProjectRow.vue'
import SectionHead from '@/components/layout/SectionHead.vue'

const { content, t } = useLocale()

const selected = computed(() => projects.slice(0, 4))
</script>

<template>
  <section id="work" class="home-work home-block">
    <SectionHead
      :label="content.home.workLabel"
      :title="content.home.workTitle"
      :note="content.home.workNote"
    />

    <div class="home-work__list" data-reveal>
      <ProjectRow
        v-for="project in selected"
        :key="project.slug"
        :project="project"
        layout="complete"
      />
    </div>

    <RouterLink to="/work" class="home-work__all">
      <span>{{ t(content.ui.allProjects) }}</span>
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M3 8h10M8 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.2" />
      </svg>
    </RouterLink>
  </section>
</template>

<style scoped>
.home-work {
  display: flex;
  flex-direction: column;
  padding-block: clamp(3rem, 6vw, 6rem);
}

.home-work__list {
  position: relative;
  margin-top: clamp(2rem, 4vw, 3.5rem);
}

/* 全部项目入口：正文级字号，带下边框，靠右与列表同轴。 */
.home-work__all {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  padding-bottom: 0.4rem;
  font-family: var(--font-han);
  font-size: 1rem;
  font-weight: 600;
  transition: opacity var(--fast) var(--ease-out);
  align-self: flex-end;
}

.home-work__all:hover,
.home-work__all:focus-visible {
  opacity: 0.55;
}
</style>
