import { UserStatusId } from './UserStatusId'

/**
 * Пользователь
 */
export type User = {
  id: number
  /**
   * Фамилия имя отчество
   */
  names: string
  /**
   * Электронная почта
   */
  email: string
  /**
   * Дата регистрации в формате unixtime
   */
  registrationDate?: number
  /**
   * Статус пользователя
   */
  statusId: UserStatusId
}
