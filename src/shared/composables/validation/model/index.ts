/**
 * Правило валидации для обязательности
 */
export type RequiredRule = {
  type: 'required'
}

export type EmailRule = {
  type: 'email'
}

/**
 * Правило валидации
 */
export type ValidationRule = RequiredRule | EmailRule

/**
 * Хранилищее ошибок валидации
 */
export type ValidationErrors<key extends string | number | symbol = string> = Partial<
  Record<key, string>
>
