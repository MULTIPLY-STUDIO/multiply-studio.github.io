<script setup lang="ts">
/**
 * 封面：站点身份的第一屏。
 *
 * 品牌装置**属于封面**，不是全站固定层：
 * 入场动画播完后它作为封面底图，随封面一起向上滚走。
 * 标题压在装置上用 multiply 叠印，两者共用同一块版面。
 */
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { isCjkLocale } from '@/app/locales'
import BrandField from '@/components/brand/BrandField.vue'

const { content, t, locale } = useLocale()

/** 标题文字来自内容层，组件只决定排版方式。 */
const titleLines = computed(() => content.value.home.titleLines[locale.value])

/** 汉字文化圈语言走汉字的字距与行高，拉丁语言走拉丁参数。 */
const isCjk = computed(() => isCjkLocale(locale.value))
</script>

<template>
  <section id="cover" class="cover scene">
    <!-- 装置：入场动画 + 封面底图，随封面滚动 -->
    <BrandField mode="intro" />

    <div class="cover__frame">
      <div class="cover__stage">
        <div class="cover__identity">
          <h1 class="cover__title" :class="isCjk ? 'display-brush' : 'display display--tight'">
            <span v-for="line in titleLines" :key="line" class="cover__title-line">{{ line }}</span>
          </h1>
          <p class="cover__slogan serif">{{ t(content.home.slogan) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cover {
  position: relative;
  display: flex;
  min-height: calc(100svh - var(--header-h));
  padding: clamp(1rem, 2.2vw, 1.75rem) var(--page-x) clamp(1rem, 2vw, 1.5rem);
  overflow: hidden;
}

.cover__frame {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  min-height: 0;
  /* 入场揭幕的初始态与过渡统一写在 src/styles/app.css，与页头共用一套。 */
}

/*
 * 首屏重心放在左下角：名称与口号贴着「软件、界面与交互」的上沿排，
 * 上方留白交给装置。居中的话文字浮在半空，与底部那行说明各说各话。
 */
.cover__stage {
  display: grid;
  align-items: end;
  min-height: 0;
}

/* 名称与口号作为一个整体靠左，口号紧贴名称下方。 */
.cover__identity {
  display: grid;
  justify-items: start;
  gap: clamp(0.75rem, 1.6vw, 1.25rem);
}

/* 标题压在标识之上：用 multiply 让文字与底下的方块互相叠印。 */
.cover__title {
  display: flex;
  flex-direction: column;
  margin: 0;
  color: var(--ink);
  mix-blend-mode: multiply;
}

.cover__title-line {
  display: block;
  font-size: clamp(3.4rem, 12.5vw, 12rem);
}

/*
 * 汉字展示：汉字没有升降部，需要正字距与更松的行高。
 * 两行都从同一条左轴开始，不做阶梯缩进。
 */
.cover__title.display-brush .cover__title-line {
  letter-spacing: 0.05em;
  line-height: 1.04;
}

/*
 * 拉丁展示（.display .display--tight）：全部左对齐。
 * 不再套用汉字的正字距，也不给第二行缩进 ——
 * 拉丁展示字本身已有负字距与紧行高，再加缩进会破坏左轴。
 */
.cover__title.display .cover__title-line {
  letter-spacing: inherit;
  line-height: inherit;
  margin-left: 0;
}

/*
 * 口号：衬线体，字号落在衬线下限之上。
 * 底色铺白，压在装置上时仍能读清；宽度不设上限，短句直接占满自己的行。
 */
.cover__slogan {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 1.9vw, 1.5rem);
  line-height: 1.5;
  color: var(--ink);
  background: var(--paper);
  padding-inline: 0.35rem;
  mix-blend-mode: multiply;
}



@media (max-width: 600px) {
  .cover__title-line {
    font-size: clamp(3.2rem, 19vw, 6.5rem);
  }

}
</style>
