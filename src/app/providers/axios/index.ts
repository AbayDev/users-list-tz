import { provideHTTPService } from '@/shared/api/httpService'
import axios from 'axios'

/**
 * Инициализация `axios` и http service для дальнейщих работ с сервером
 */
export const initAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  instance.interceptors.request.use(async (config) => {
    // Задержка перед каждым запросом
    await delay(1500)
    return config
  })

  provideHTTPService(instance)
}
