import { createRouter, createWebHistory } from 'vue-router'

/**
 * Инициализация роутера
 */
export const initRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Список пользователей
      {
        path: '/',
        name: 'Users',
        component: import('@/pages/users/UsersListPage.vue'),
      },
      {
        path: '/new',
        name: 'UserNew',
        component: () => import('@/pages/users/UserNewPage.vue'),
      },
      {
        path: '/:id',
        name: 'UserDetail',
        component: () => import('@/pages/users/UserDetailPage.vue'),
      },
      {
        path: '/:id/edit',
        name: 'UserEdit',
        component: () => import('@/pages/users/UserEditPage.vue'),
      },
    ],
  })

  return router
}
