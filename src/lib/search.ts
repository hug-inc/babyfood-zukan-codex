import { PRICE_RANGES, type AgeId, type IngredientId, type PriceRangeId, type StorageId, type TypeId } from '../data/master'
import type { Product } from '../data/products'

export type SortId = 'recommended' | 'new' | 'popular' | 'priceAsc' | 'priceDesc'

export const SORTS: { id: SortId; label: string }[] = [
  { id: 'recommended', label: 'おすすめ順' },
  { id: 'new', label: '新着順' },
  { id: 'popular', label: '人気順' },
  { id: 'priceAsc', label: '価格が安い順' },
  { id: 'priceDesc', label: '価格が高い順' },
]

export interface SearchFilters {
  age?: AgeId
  type?: TypeId
  ingredient?: IngredientId
  maker?: string
  price?: PriceRangeId
  storage?: StorageId
}

export const FILTER_KEYS = ['age', 'type', 'ingredient', 'maker', 'price', 'storage'] as const

export function filtersFromParams(params: URLSearchParams): SearchFilters {
  const f: Record<string, string> = {}
  for (const key of FILTER_KEYS) {
    const v = params.get(key)
    if (v) f[key] = v
  }
  return f as SearchFilters
}

export function filterProducts(products: Product[], f: SearchFilters): Product[] {
  return products.filter((p) => {
    if (f.age && !p.ages.includes(f.age)) return false
    if (f.type && p.type !== f.type) return false
    if (f.ingredient && !p.ingredients.includes(f.ingredient)) return false
    if (f.maker && p.makerId !== f.maker) return false
    if (f.storage && p.storage !== f.storage) return false
    if (f.price) {
      const range = PRICE_RANGES.find((r) => r.id === f.price)
      if (!range || p.price === null || p.price < range.min || p.price > range.max) return false
    }
    return true
  })
}

/** 価格未登録の商品は価格順で常に末尾に置く */
export function sortProducts(products: Product[], sort: SortId): Product[] {
  const list = [...products]
  const priceKey = (p: Product, dir: 1 | -1) => (p.price === null ? Number.POSITIVE_INFINITY : p.price * dir)
  switch (sort) {
    case 'new':
      return list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    case 'popular':
      return list.sort((a, b) => b.views30d - a.views30d)
    case 'priceAsc':
      return list.sort((a, b) => priceKey(a, 1) - priceKey(b, 1))
    case 'priceDesc':
      return list.sort((a, b) => priceKey(a, -1) - priceKey(b, -1))
    default:
      // おすすめ順: PR商品を先頭に、その後は人気順
      return list.sort((a, b) => Number(b.isPR) - Number(a.isPR) || b.views30d - a.views30d)
  }
}
