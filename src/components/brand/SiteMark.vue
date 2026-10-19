<script setup lang="ts">
/**
 * 品牌标识。
 *
 * 直接引用 assets/ 里的原始 SVG，不在这里复刻路径 —— 标识是外部给的资源，
 * 抄一遍意味着改一次 logo 要同步改组件，抄漏一条边就成了另一张图。
 *
 * 用 <img> 而不是内联 SVG 的代价是无法继承 currentColor，所以这里不提供
 * 换色能力：标识只出现在白底的页头与页脚，本来就是黑图。
 */
import logoUrl from '../../../assets/multiply_logo.svg?url'
import markUrl from '../../../assets/multiply_logo_square.svg?url'

const props = withDefaults(
  defineProps<{
    /** `mark` 为方形图形，`wordmark` 为完整标识（图形 + MULTIPLY + 正片叠底）。 */
    variant?: 'mark' | 'wordmark'
  }>(),
  { variant: 'mark' },
)

const src = () => (props.variant === 'wordmark' ? logoUrl : markUrl)
</script>

<template>
  <img
    class="site-mark"
    :class="'site-mark--' + variant"
    :src="src()"
    :alt="variant === 'wordmark' ? 'MULTIPLY 正片叠底' : ''"
    :aria-hidden="variant === 'mark' ? 'true' : undefined"
    decoding="async"
  />
</template>

<style scoped>
.site-mark {
  display: block;
}

/* 方形图形：宽高都填满容器。 */
.site-mark--mark {
  width: 100%;
  height: 100%;
}

/*
 * 完整字标按原始比例 331:126 缩放，宽度由高度推出来。
 * 尺寸由使用处覆盖（页头 / 页脚各有自己的高度），这里只给兜底值，
 * 避免两处都写 clamp 时互相覆盖。
 *
 * 高度不能太小：原始文件里「正片叠底」只占字标高度的 38%，
 * 字标高 24px 时中文实际只有 9px，糊成一团。
 */
.site-mark--wordmark {
  height: 2rem;
  width: auto;
}
</style>
