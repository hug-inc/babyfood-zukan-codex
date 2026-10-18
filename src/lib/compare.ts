export const MAX_COMPARE = 3

export type CompareResult = 'added' | 'removed' | 'full'

/** 比較リストのトグル。上限に達している場合は追加せず 'full' を返す */
export function toggleCompare(ids: string[], id: string): { ids: string[]; result: CompareResult } {
  if (ids.includes(id)) return { ids: ids.filter((x) => x !== id), result: 'removed' }
  if (ids.length >= MAX_COMPARE) return { ids, result: 'full' }
  return { ids: [...ids, id], result: 'added' }
}
