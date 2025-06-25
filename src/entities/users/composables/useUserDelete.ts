import { useHttpDelete } from '@/shared/api/useHttpDelete'

/**
 * Удалить пользователя по `id`
 */
export const useUserDelete = () => {
  const { remove, ...otherProps } = useHttpDelete()

  const deleteUserById = (id: number) => {
    remove(`users/${id}`)
  }

  return {
    deleteUserById,
    ...otherProps,
  }
}
