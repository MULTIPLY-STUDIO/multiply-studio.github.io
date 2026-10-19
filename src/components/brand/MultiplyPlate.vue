<script setup lang="ts">
/**
 * 「正片叠底」图版：用数层半调透明度的几何形以 multiply 混合模式叠印。
 * 交叠处自然加深为中间灰，再叠一层即为纯黑 —— 站点的灰阶全部由此机制生成，
 * 不使用任何独立的装饰性灰色。
 */
import { computed } from 'vue'
import type { PlateVariant } from '@/types/content'

const props = withDefaults(
  defineProps<{
    variant: PlateVariant
    /** 叠印层数，1–4。层数越多，交叠出的灰阶越密。 */
    density?: number
    /** 播放入场绘制动画。 */
    animate?: boolean
  }>(),
  { density: 3, animate: false },
)

/** 每层图形的透明度。乘算后：0.5×0.5=0.25，0.5×0.5×0.5=0.125（更深）。 */
const LAYER_TINT = [0.55, 0.48, 0.42, 0.36]

interface Layer {
  kind: 'rect' | 'circle' | 'path'
  attrs: Record<string, number | string>
}

/** 每个变体给出 4 层几何，density 决定实际使用几层。 */
const VARIANTS: Record<PlateVariant, Layer[]> = {
  // 两个错位方块的相叠 —— 直接沿用标识的阶梯构造。
  intersect: [
    { kind: 'rect', attrs: { x: 6, y: 6, width: 62, height: 62 } },
    { kind: 'circle', attrs: { cx: 62, cy: 62, r: 34 } },
    { kind: 'rect', attrs: { x: 38, y: 38, width: 56, height: 56 } },
    { kind: 'path', attrs: { d: 'M0 100 L0 34 L34 34 L34 0 L100 0' } },
  ],
  // 竖直累积的阶梯，对应归档的层叠顺序。
  stack: [
    { kind: 'rect', attrs: { x: 8, y: 62, width: 84, height: 30 } },
    { kind: 'rect', attrs: { x: 20, y: 36, width: 84, height: 26 } },
    { kind: 'rect', attrs: { x: 32, y: 12, width: 60, height: 24 } },
    { kind: 'circle', attrs: { cx: 50, cy: 50, r: 30 } },
  ],
  // 同心开口，最像镜头与音轨。
  aperture: [
    { kind: 'circle', attrs: { cx: 50, cy: 50, r: 46 } },
    { kind: 'circle', attrs: { cx: 50, cy: 50, r: 32 } },
    { kind: 'circle', attrs: { cx: 50, cy: 50, r: 18 } },
    { kind: 'rect', attrs: { x: 50, y: 0, width: 50, height: 100 } },
  ],
  // 模块化方格：瑞士网格的极端化。
  grid: [
    { kind: 'rect', attrs: { x: 4, y: 4, width: 44, height: 44 } },
    { kind: 'rect', attrs: { x: 52, y: 4, width: 44, height: 44 } },
    { kind: 'rect', attrs: { x: 4, y: 52, width: 44, height: 44 } },
    { kind: 'rect', attrs: { x: 52, y: 52, width: 44, height: 44 } },
  ],
  // 对角错位，最贴近标识的比例关系。
  offset: [
    { kind: 'rect', attrs: { x: 0, y: 0, width: 66, height: 66 } },
    { kind: 'rect', attrs: { x: 34, y: 34, width: 66, height: 66 } },
    { kind: 'rect', attrs: { x: 17, y: 17, width: 66, height: 66 } },
    { kind: 'circle', attrs: { cx: 50, cy: 50, r: 26 } },
  ],
  // 四分之一圆，用于较少的层次。
  arc: [
    { kind: 'path', attrs: { d: 'M0 100 A100 100 0 0 1 100 0 L100 100 Z' } },
    { kind: 'path', attrs: { d: 'M0 44 A56 56 0 0 1 56 100 L0 100 Z' } },
    { kind: 'circle', attrs: { cx: 74, cy: 26, r: 26 } },
    { kind: 'rect', attrs: { x: 0, y: 84, width: 100, height: 16 } },
  ],
}

const layers = computed(() => {
  const count = Math.min(4, Math.max(1, Math.round(props.density)))
  return VARIANTS[props.variant].slice(0, count)
})

const fillFor = (index: number) => `rgba(0, 0, 0, ${LAYER_TINT[index] ?? 0.5})`
</script>

<template>
  <svg
    class="multiply-plate"
    :class="['multiply-plate--' + variant, { 'is-animated': animate }]"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <g class="multiply-plate__stack" style="mix-blend-mode: multiply">
      <component
        :is="layer.kind"
        v-for="(layer, index) in layers"
        :key="index"
        v-bind="layer.attrs"
        :fill="fillFor(index)"
        :style="{ '--layer-order': index }"
        class="multiply-plate__layer"
      />
    </g>
  </svg>
</template>

<style scoped>
.multiply-plate {
  display: block;
  width: 100%;
  height: 100%;
  /* 混合模式必须在一个独立隔离的白色底上运算，否则会穿透到页面其他层。 */
  background: var(--paper);
  isolation: isolate;
  overflow: hidden;
}

.multiply-plate__layer {
  transform-origin: 50% 50%;
}

/* 入场：由大向小收束并淡入，像印版落纸。 */
.is-animated .multiply-plate__layer {
  animation: plate-settle 900ms var(--ease-out) both;
  animation-delay: calc(var(--layer-order) * 90ms);
}

@keyframes plate-settle {
  from {
    opacity: 0;
    transform: scale(1.12);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-animated .multiply-plate__layer {
    animation: none;
  }
}
</style>
