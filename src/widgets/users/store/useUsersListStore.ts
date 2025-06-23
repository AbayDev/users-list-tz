import type { User } from '@/entities/users'
import { useHttpGet } from '@/shared/api/useHttpGet'
import { debounce } from '@/shared/lib/debounce'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUsersListStore = defineStore('users-list', () => {
  const users = ref<User[]>([])
  const search = ref('')
  const pageIndex = ref(0)

  const { get, loading, onDone } = useHttpGet<User[]>()

  const getUsers = () => {
    get('users', {
      params: {
        search: search.value,
        page: pageIndex.value + 1,
        limit: 10,
      },
    })
  }

  onDone((result) => {
    if (result) {
      users.value = result
    }
  })

  watch(
    search,
    debounce(() => {
      getUsers()
    }, 500),
  )

  return {
    users,
    getUsers,
    loading,
  }
})
