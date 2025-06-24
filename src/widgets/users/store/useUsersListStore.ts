import type { User } from '@/entities/users'
import { useHttpGet } from '@/shared/api/useHttpGet'
import { calculateTotalPages } from '@/shared/lib/calculateTotalPages'
import { debounce } from '@/shared/lib/debounce'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const USERS_PER_PAGE = 10
type UsersResponse = {
  data: User[]
  items: number
}

export const useUsersListStore = defineStore('users-list', () => {
  const users = ref<User[]>([])
  const search = ref('')
  const pageIndex = ref(0)
  const total = ref(0)

  const { get, loading, onDone } = useHttpGet<UsersResponse>()

  const totalPage = computed(() => {
    return calculateTotalPages(total.value, USERS_PER_PAGE)
  })

  const getUsers = () => {
    get('users', {
      params: {
        _page: pageIndex.value + 1,
        _per_page: USERS_PER_PAGE,
      },
    })
  }

  onDone((result) => {
    if (result.data) {
      users.value = result.data.data
      total.value = Number(result.data.items)
    }
  })

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
