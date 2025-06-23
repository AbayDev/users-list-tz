import { ref } from 'vue'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useSubscriptions } from '../composables/useSubscriptions'
import { HTTP_CONFIG } from './httpService'

/**
 * Хук для выполнения POST-запросов к серверу с обработкой состояния загрузки и ошибок.
 * Использует axios и систему подписок на успешный и неуспешный результат.
 *
 * @template Res Тип ожидаемых данных из ответа
 * @template Req Тип отправляемого тела запроса
 * @returns объект с методами и реактивными состояниями
 */
export function useHttpPost<Res = unknown, Req = unknown>() {
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const data = ref<Res | null>(null)

  const done = useSubscriptions<Res>()
  const errorSub = useSubscriptions<unknown>()

  const http: AxiosInstance = HTTP_CONFIG.httpService

  /**
   * Выполняет POST-запрос по указанному URL
   *
   * @param url - адрес запроса
   * @param body - тело запроса (payload)
   * @param config - дополнительная конфигурация (заголовки, timeout и т.п.)
   */
  const post = async (url: string, body: Req, config?: AxiosRequestConfig) => {
    loading.value = true
    error.value = null

    try {
      const response = await http.post<Res>(url, body, config)
      data.value = response.data
      done.emit(response.data)
    } catch (err) {
      error.value = err
      errorSub.emit(err)
    } finally {
      loading.value = false
    }
  }

  return {
    post,
    loading,
    error,
    data,
    onDone: done.on,
    onError: errorSub.on,
  }
}
