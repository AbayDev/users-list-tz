import { ref, type Ref } from 'vue'
import type { ValidationErrors, ValidationRule } from '../model'
import { validateByRule } from '../lib/validateByRule'

/**
 * Аргументы `useValidation`
 */
type Props<Form extends Record<string, unknown>> = {
  /**
   * Форма с значениями
   */
  form: Ref<Form>
  /**
   * Правила валидации
   */
  rules: Partial<Record<keyof Form, ValidationRule[]>>
}

/**
 * Управление валидацией полей
 */
export const useValidation = <Form extends Record<string, unknown>>({
  form,
  rules,
}: Props<Form>) => {
  /**
   * Ошибки валидацции валидации полей
   */
  const errors = ref<ValidationErrors<keyof typeof rules>>({})
  /**
   * Указания на грязные поля
   */
  const dirtyFields = ref<Partial<Record<keyof typeof rules, boolean>>>({})

  /**
   * Если валидация запущена, то при изменении одного свойства формы,
   * будет запускаться повторная валидация, для измененной поле
   */
  let isValidateStarted = false

  /**
   * Валидация всей формы или поле `field`
   *
   * @description
   * Если `field` переден, то валидирует только переданное поле,
   * если не передан, то всю форму
   *
   * @param fieldName - наименование свойства для валидации
   * @returns
   * Если валидация успешно пройдена возвратит `true`,
   * если нет, то `false`
   */
  const validate = (fieldName?: keyof Form): boolean => {
    if (!fieldName) {
      clearErrors()
    }
    let isValid = true
    isValidateStarted = true

    // указываем что валидировать на основе `field`
    const validationFields = fieldName ? { [fieldName]: form.value[fieldName] } : rules

    for (const key in validationFields) {
      console.log('key', key)
      const value = form.value[key]
      const fieldRules = rules[key]
      if (fieldRules) {
        const errorMessage = validateByRule(value, fieldRules)
        errors.value[key] = errorMessage
        if (errorMessage) {
          isValid = false
        }
      }
    }

    return isValid
  }

  /**
   * Отчистить все ошибки
   */
  const clearErrors = (): void => {
    errors.value = {}
    dirtyFields.value = {}
  }

  /**
   * Обработка изменения значения, при изменении значения
   * если валидация уже было запущено, надо валидировать значение изменной поле
   * @param fieldName - название измененной поле
   */
  const onChange = (fieldName: keyof Form): void => {
    if (isValidateStarted) {
      validate(fieldName)
    }
  }

  return {
    validate,
    clearErrors,
    onChange,
    errors,
  }
}
