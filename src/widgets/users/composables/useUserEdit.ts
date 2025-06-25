import { UserStatusId, useUserDetail, type User, type UserEditableFields } from '@/entities/users'
import { ref, watch } from 'vue'

/**
 * Генерирует форму при запросе пользователя
 */
export const useUserEditForm = () => {
  const form = ref<UserEditableFields>({
    email: '',
    names: '',
    statusId: UserStatusId.Active,
  })

  const { getUserById, user, loading } = useUserDetail()

  const userToForm = (user: User) => {
    form.value.email = user.email
    form.value.names = user.names
    form.value.statusId = user.statusId
  }

  watch(user, () => {
    if (user.value) {
      userToForm(user.value)
    }
  })

  return {
    form,
    loading,
    getUserById,
  }
}
