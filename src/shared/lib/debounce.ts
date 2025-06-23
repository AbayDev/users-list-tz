/**
 * Создаёт функцию, вызываемую с задержкой после последнего вызова.
 * Полезно для оптимизации частых событий, таких как ввод текста или resize.
 *
 * @param func - функция, которую нужно дебаунсить
 * @param wait - задержка в миллисекундах
 * @returns новая функция с отложенным вызовом
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
