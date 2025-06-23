import { ref } from 'vue'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useSubscriptions } from '../composables/useSubscriptions'
import { HTTP_CONFIG } from './httpService'

/**
 * Хук для выполнения GET-запросов к серверу с обработкой состояния загрузки и ошибок.
 * Использует axios и систему подписок на успешный и неуспешный результат.
 *
 * @template T Тип ожидаемых данных из ответа
 * @returns объект с методами и реактивными состояниями
 */
export function useHttpGet<T = unknown>() {
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const data = ref<T | null>(null)
  const doneEvent = useSubscriptions<T>()
  const errorEvent = useSubscriptions<unknown>()

  // Используемый экземпляр Axios
  const http: AxiosInstance = HTTP_CONFIG.httpService

  /**
   * Выполняет GET-запрос по заданному URL
   * @param url - адрес запроса
   * @param config - дополнительная конфигурация (query params, headers и т.д.)
   */
  const get = async (url: string, config?: AxiosRequestConfig) => {
    loading.value = true
    error.value = null

    try {
      const response = await http.get<T>(url, config)

      // Успешный ответ
      data.value = response.data
      doneEvent.emit(response.data)
    } catch (err) {
      // Обработка ошибки
      error.value = err
      errorEvent.emit(err)
    } finally {
      loading.value = false
    }
  }

  return {
    get,
    loading,
    error,
    data,
    onDone: doneEvent.on,
    onError: errorEvent.on,
  }
}
