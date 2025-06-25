import type { ValidationRule } from '../model'

type RuleValidatorFunction = (value: unknown) => string | undefined

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Валидатор для каждого правила валидации
 */
const RULE_VALIDATOR: Record<ValidationRule['type'], RuleValidatorFunction> = {
  required(value) {
    return value ? undefined : 'Обязательное поле'
  },
  email(value) {
    if (typeof value === 'string') {
      const isValid = EMAIL_REGEX.test(value)
      return isValid ? undefined : 'Введи корректную почту'
    }

    return 'Введи корректную почту'
  },
}

/**
 * Валидация значения на основе правила валидации
 * @param value - валидируемое значение
 * @param rule - правило валидации
 * @returns
 * В случае ошибки возвращает текст ошибки,
 * В случае успеха `undefined`
 */
export const validateByRule = (
  value: unknown,
  rules: ValidationRule[],
): ReturnType<RuleValidatorFunction> => {
  for (const rule of rules) {
    const message = RULE_VALIDATOR[rule.type](value)
    if (message) {
      return message
    }
  }
}
