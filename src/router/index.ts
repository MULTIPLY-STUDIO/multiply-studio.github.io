import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * Hash 路由：构建产物是纯静态目录，直接放到任意静态托管
 * （含 GitHub Pages 子路径）都能刷新任意深链。
 */
export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 0 }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { titleKey: 'home' },
    },
    {
      path: '/work',
      name: 'work',
      component: () => import('@/views/WorkView.vue'),
      meta: { titleKey: 'work' },
    },
    {
      path: '/work/:slug',
      name: 'project',
      component: () => import('@/views/ProjectView.vue'),
      props: true,
      meta: { titleKey: 'project' },
    },
    {
      path: '/studio',
      name: 'studio',
      component: () => import('@/views/StudioView.vue'),
      meta: { titleKey: 'studio' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { titleKey: 'contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { titleKey: 'not-found' },
    },
  ],
})
