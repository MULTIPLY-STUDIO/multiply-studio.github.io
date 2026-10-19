import { onBeforeUnmount, ref } from 'vue'

/**
 * 复制到剪贴板。带一个短暂的「已复制」状态供按钮反馈。
 * 失败时静默保留原标签 —— 绝不假装复制成功。
 */
export const useClipboard = (resetAfter = 1800) => {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const copy = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // 非安全上下文（http / 旧浏览器）退回临时 textarea + execCommand。
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(area)
        if (!ok) return false
      }
      copied.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        copied.value = false
      }, resetAfter)
      return true
    } catch {
      return false
    }
  }

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
  })

  return { copied, copy }
}
