import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/base.css'
import './styles/app.css'

/**
 * 启动白幕（见 index.html 的 `#boot`）。
 *
 * 白幕从 HTML 解析起就盖住视口，因为路由组件是异步加载的：页头页脚先渲染、
 * 首页区块后到，中间会有一帧「只有页头页脚、内容空白」的壳子被画出来，
 * 入场动画也要等组件挂载后才盖得住视口。
 *
 * 撤除时机很关键：必须等**首次路由解析完成**之后再挂载并移除。
 * `router.isReady()` 会等首屏组件加载完；此时 `mount()` 一次性把
 * 首页与品牌装置画出来，装置已经在同一个任务里切成覆盖整屏的固定层，
 * 白幕 → 幕布是无缝交接，用户看不到任何中间态。
 *
 * 两处兜底写在 index.html 里：`<noscript>` 直接隐藏白幕，
 * 内联脚本 3 秒后强制移除（主脚本加载失败时不会一直白屏）。
 *
 * 注意：index.html 里不写注释，那份文件会原样进入产物，
 * 任何人用查看源代码都能读到。
 */
const app = createApp(App).use(router)

router.isReady().then(() => {
  app.mount('#app')
  document.getElementById('boot')?.remove()
})
