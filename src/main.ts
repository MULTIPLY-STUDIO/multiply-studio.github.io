import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/base.css'
import './styles/app.css'

/**
 * 启动白幕（见 index.html）。
 *
 * 撤除时机很关键：必须等**首次路由解析完成**之后再挂载并移除。
 * 路由组件是异步加载的，若在 `mount()` 后立刻撤掉白幕，
 * 首页区块的 chunk 还没到，画出来的是「只有页头页脚、内容空白」的壳子，
 * 也就是用户看到的那一帧闪烁。
 *
 * `router.isReady()` 会等首屏组件加载完；此时 `mount()` 一次性把
 * 首页与品牌装置画出来，装置已经在同一个任务里切成覆盖整屏的固定层，
 * 白幕 → 幕布是无缝交接。脚本出错时，index.html 里的 3 秒兜底会移除白幕。
 */
const app = createApp(App).use(router)

router.isReady().then(() => {
  app.mount('#app')
  document.getElementById('boot')?.remove()
})
