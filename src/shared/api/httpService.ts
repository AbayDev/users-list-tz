import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * Тип для конфигурации HTTP-запросов
 */
type HttpConfig = {
  /**
   * Инстанс Axios, используемый для выполнения HTTP-запросов
   */
  httpService: AxiosInstance
}

/**
 * Глобальная конфигурация HTTP-запросов.
 * По умолчанию используется новый экземпляр Axios.
 * Может быть переопределён через `provideHTTPService`
 */
export const HTTP_CONFIG: HttpConfig = {
  httpService: axios.create(),
}

/**
 * Устанавливает пользовательский инстанс Axios в глобальную конфигурацию HTTP-запросов.
 *
 * Используется для внедрения (DI) настроенного Axios, например, с авторизацией,
 * интерцепторами, базовым URL и т.д.
 *
 * @param httpService - настроенный экземпляр AxiosInstance
 */
export const provideHTTPService = (httpService: AxiosInstance) => {
  HTTP_CONFIG.httpService = httpService
}
