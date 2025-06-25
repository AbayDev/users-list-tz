import type { User } from '@/entities/users'
import { useHttpGet } from '@/shared/api/useHttpGet'
import { calculateTotalPages } from '@/shared/lib/calculateTotalPages'
import { debounce } from '@/shared/lib/debounce'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const USERS_LIMIT = 20

export const useUsersListStore = defineStore('users-list', () => {
  const users = ref<User[]>([])
  const search = ref('')
  const pageIndex = ref(0)
  const total = ref(0)

  const { get, loading, onDone } = useHttpGet<User[]>()

  const totalPage = computed(() => {
    return calculateTotalPages(total.value, USERS_LIMIT)
  })

  const getUsers = () => {
    const params: Record<string, unknown> = {
      _page: pageIndex.value + 1,
      _limit: USERS_LIMIT,
    }

    if (search.value) {
      // поиск по всем текстовым значениям
      params.q = search.value
    }

    get('users', {
      params,
    })
  }

  onDone((result) => {
    if (result.data) {
      users.value = result.data
      total.value = Number(result.headers?.['x-total-count'])
    }
  })

  // при измении поиска, нужно поставить первую страницу
  watch(search, () => {
    pageIndex.value = 0
  })

  // при изменении поиска или страницы отправляем запрос
  // оптимизация с помощью debounce
  watch(
    [search, pageIndex],
    debounce(() => {
      getUsers()
    }, 500),
  )

  return {
    users,
    getUsers,
    loading,
    totalPage,
    pageIndex,
    search,
    total,
  }
})
