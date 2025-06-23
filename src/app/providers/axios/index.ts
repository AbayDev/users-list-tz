import { provideHTTPService } from '@/shared/api/httpService'
import axios from 'axios'

/**
 * Инициализация `axios` и http service для дальнейщих работ с сервером
 */
export const initAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // ставим исскуственную задержку, имитация работы с сервером
    timeout: 1000,
  })

  provideHTTPService(instance)
}
