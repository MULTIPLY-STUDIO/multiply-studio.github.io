<script setup lang="ts">
/**
 * 工作室区块：一段定位陈述 + 能力四栏 + 事实表。
 */
import { useLocale } from '@/composables/useLocale'
import { capabilities } from '@/content/studio'
import SectionHead from '@/components/layout/SectionHead.vue'

const { content, t } = useLocale()
</script>

<template>
  <section id="studio" class="home-studio home-block">
    <SectionHead :label="content.home.studioLabel" :title="content.home.studioTitle" />

    <div class="home-studio__body">
      <ul class="home-studio__caps" data-reveal>
        <li v-for="capability in capabilities" :key="capability.index" class="cap">
          <h3 class="cap__title display-brush">{{ t(capability.title) }}</h3>
          <p class="cap__body prose">{{ t(capability.body) }}</p>
        </li>
      </ul>

      <div class="home-studio__intro">
        <RouterLink to="/studio" class="home-studio__link">
          <span>{{ t(content.navigation[2].label) }}</span>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M3 8h10M8 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-studio {
  padding-block: clamp(3rem, 6vw, 6rem);
}

.home-studio__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 3.5rem);
  margin-top: clamp(2rem, 4vw, 3.5rem);
}

/* 简介句已交给 SectionHead 的 note，这里只剩「工作室 →」入口，靠右。 */
.home-studio__intro {
  display: flex;
  justify-content: flex-end;
}

.home-studio__link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--ink);
  font-family: var(--font-han);
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity var(--fast) var(--ease-out);
}

.home-studio__link:hover,
.home-studio__link:focus-visible {
  opacity: 0.55;
}

.home-studio__caps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  background: var(--tint-20);
}

.cap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(0.75rem, 1.6vw, 1.25rem);
  background: var(--paper);
}

/*
 * 首尾卡片贴齐版面左右轴。
 *
 * 栅格的 1px 间隙负责显示分隔线，卡片左右内边距只是让文字离分隔线远一点；
 * 但首卡的左内边距和末卡的右内边距不挨着任何分隔线，
 * 只会把文字从版面左轴推开几十像素 —— 上方的标签、标题、导语，
 * 都从版面轴起排，唯独这排卡片缩进了。
 */
.cap:first-child {
  padding-left: 0;
}

.cap:last-child {
  padding-right: 0;
}

.cap__title {
  font-size: clamp(1.15rem, 1.7vw, 1.4rem);
  line-height: 1.3;
  /* 标题用自身高度，不预留空行；正文紧接其后，间距处处一致 */
  margin-bottom: 0;
}

.cap__body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--tint-65);
}


@media (max-width: 1000px) {
  .home-studio__caps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* 两列布局里，每一行的左格都要贴版面轴，不只是第一行。 */
  .cap:nth-child(odd) {
    padding-left: 0;
  }

  .cap:nth-child(even) {
    padding-right: 0;
  }

  .cap__title {
    min-height: 0;
  }
}

@media (max-width: 700px) {
  /*
   * 单列情况下不再用「1px 间隙露出底色」来画线。
   *
   * 那套做法是给容器铺灰底、卡片铺白底、间隙透出灰线 —— 四列时看不出问题，
   * 单列时容器本身就是一整块灰底，上下两端的行间隙会把整块卡片包起来，
   * 看上去每张卡都有一圈边框。改成卡片之间一条上边框，容器不带底色，
   * 外框自然消失。
   */
  .home-studio__caps {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    background: none;
  }

  .cap {
    padding-inline: 0;
    padding-block: 1.25rem;
    background: none;
  }

  .cap + .cap {
    border-top: 1px solid var(--tint-20);
  }

  .cap:first-child {
    padding-top: 0;
  }

  .cap:last-child {
    padding-bottom: 0;
  }

  .home-studio__intro {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }
}
</style>
