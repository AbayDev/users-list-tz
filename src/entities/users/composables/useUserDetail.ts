import { useHttpGet } from '@/shared/api/useHttpGet'
import { ref } from 'vue'
import type { User } from '../model/User'

/**
 * Детали определенного пользователя по `id`
 */
export const useUserDetail = () => {
  const user = ref<User>()

  const { get, loading, onDone, ...otherProps } = useHttpGet<User>()

  const getUserById = (id: number) => {
    get(`/users/${id}`)
  }

  onDone((res) => {
    if (res.data) {
      user.value = res.data
    }
  })

  return {
    user,
    loading,
    onDone,
    getUserById,
    ...otherProps,
  }
}
