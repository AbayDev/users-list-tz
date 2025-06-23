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
    ],
  })

  return router
}
