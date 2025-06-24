/**
 * Вычисляет общее количество страниц для пагинации
 *
 * @param total - общее количество элементов
 * @param limit - количество элементов на странице
 * @returns общее число страниц (целое)
 */
export function calculateTotalPages(total: number, limit: number): number {
  if (limit <= 0) return 0
  return Math.ceil(total / limit)
}
