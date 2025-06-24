import { useUsersListStore } from '../store/useUsersListStore'
import { useRoute, useRouter } from 'vue-router'

/**
 * Управление сохранением и применением `route.query` к фильтру и странице
 * @returns
 */
export const useUsersListRouteQuery = () => {
  const store = useUsersListStore()
  const router = useRouter()
  const route = useRoute()

  /**
   * Применить значения в `route.query`
   */
  const applyRouteQuery = () => {
    if (route.query.search && typeof route.query.search === 'string') {
      store.search = route.query.search
    }
    if (
      route.query.pageIndex &&
      typeof route.query.pageIndex === 'string' &&
      !Number.isNaN(Number(route.query.pageIndex)) &&
      Number(route.query.pageIndex) >= 0
    ) {
      store.pageIndex = Number(route.query.pageIndex)
    }
  }

  /**
   * Сохранить в `route.query` фильтр и страницу
   */
  const saveRouteQuery = () => {
    router.push({
      name: 'Users',
      query: {
        search: store.search,
        pageIndex: store.pageIndex,
      },
    })
  }

  return {
    applyRouteQuery,
    saveRouteQuery,
  }
}
