import { AGES, type AgeId } from '../data/master'

export const CHECK_OFFICIAL = '公式サイトでご確認ください'

export const formatPrice = (price: number | null) =>
  price === null ? CHECK_OFFICIAL : `${price.toLocaleString('ja-JP')}円（税込）`

export function formatAges(ages: AgeId[]): string {
  if (ages.length === 0) return CHECK_OFFICIAL
  const labels = AGES.filter((a) => ages.includes(a.id)).map((a) => a.label)
  return labels.join('・')
}
