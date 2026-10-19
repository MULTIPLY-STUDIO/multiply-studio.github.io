import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 编辑器的原子写入会在 src 下留下临时目录；监听它们会让 watcher 崩掉。
    watch: {
      ignored: ['**/*.tmpdir/**', '**/.*.tmpdir/**', '**/*.tmp'],
    },
  },
})
