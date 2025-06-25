import type { UserStatusId } from './UserStatusId'

/**
 * Форма создания пользователя
 */
export type UserEditableFields = {
  names: string
  email: string
  statusId: UserStatusId
}
