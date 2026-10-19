import type { SectionDefinition } from '@/types/site'

/**
 * 首页的场景顺序。编号同时是页头导航与页内标记的来源，
 * 任何顺序调整只需要改这个数组。
 */
export const sections: SectionDefinition[] = [
  {
    id: 'cover',
    index: '01',
    anchor: 'cover',
    title: { zh: '首页', en: 'Home', ja: 'ホーム' },
  },
  {
    id: 'work',
    index: '02',
    anchor: 'work',
    title: { zh: '项目', en: 'Work', ja: 'プロジェクト' },
  },
  {
    id: 'studio',
    index: '03',
    anchor: 'studio',
    title: { zh: '工作室', en: 'Studio', ja: 'スタジオ' },
  },
  {
    id: 'contact',
    index: '04',
    anchor: 'contact',
    title: { zh: '联系', en: 'Contact', ja: 'コンタクト' },
  },
]

/** 首页总共 4 个场景，页头读数与滚动进度都以此为准。 */
export const sectionCount = sections.length
