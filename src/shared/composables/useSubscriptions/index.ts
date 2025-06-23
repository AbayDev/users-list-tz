import type { SubscriptionHandler } from './model'

/**
 * Управление логикой подписок
 * @returns
 */
export function useSubscriptions<T>() {
  const subscribers = new Set<SubscriptionHandler<T>>()

  /**
   * Подписка на событие
   * @param handler - функция, вызываемая при emit
   * @returns функция отписки
   */
  const on = (handler: SubscriptionHandler<T>) => {
    subscribers.add(handler)
    return () => {
      subscribers.delete(handler)
    }
  }

  /**
   * Вызов всех подписчиков
   * @param payload - данные, передаваемые в подписчики
   */
  const emit = (payload: T) => {
    for (const handler of subscribers) {
      handler(payload)
    }
  }

  /**
   * Очистить всех подписчиков
   */
  const clear = () => {
    subscribers.clear()
  }

  return {
    on,
    emit,
    clear,
  }
}
