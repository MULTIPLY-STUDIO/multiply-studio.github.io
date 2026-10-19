/**
 * 极简行内标记：把正文里的反引号片段（如 `YosMediaService`）拆成
 * 「普通文本 / 代码片段」两种 token，交给模板用 <code> 渲染。
 *
 * 只支持反引号一种标记是刻意的：项目正文需要的是「技术名与普通叙述
 * 区分开」，不是完整的 Markdown。引入完整解析器会带来安全与体积成本，
 * 而这里所有输入都来自仓库内的静态内容文件。
 */
export interface InlineToken {
  kind: 'text' | 'code'
  value: string
}

const CODE_PATTERN = /`([^`]+)`/g

export const parseInline = (value: string): InlineToken[] => {
  const tokens: InlineToken[] = []
  let cursor = 0

  for (const match of value.matchAll(CODE_PATTERN)) {
    const start = match.index ?? 0
    if (start > cursor) {
      tokens.push({ kind: 'text', value: value.slice(cursor, start) })
    }
    tokens.push({ kind: 'code', value: match[1] })
    cursor = start + match[0].length
  }

  if (cursor < value.length) {
    tokens.push({ kind: 'text', value: value.slice(cursor) })
  }

  return tokens.length > 0 ? tokens : [{ kind: 'text', value }]
}
