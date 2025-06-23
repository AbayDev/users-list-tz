import { UserStatusId } from './UserStatusId'

/**
 * Текстовые переводы статуса пользователя
 */
export const UserStatusText: Record<UserStatusId, string> = {
  [UserStatusId.Active]: 'Активный',
  [UserStatusId.Disabled]: 'Заблокирован',
}

export const UserStatusClass: Record<UserStatusId, string> = {
  [UserStatusId.Active]: 'user-status_active',
  [UserStatusId.Disabled]: 'user-status_blocked',
}
