import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '../data/products'
import { MAKERS } from '../data/master'
import { filterProducts, filtersFromParams, sortProducts } from './search'
import { toggleCompare } from './compare'

describe('filterProducts', () => {
  it('月齢で絞り込める', () => {
    const r = filterProducts(PRODUCTS, { age: '5-6' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((p) => p.ages.includes('5-6'))).toBe(true)
  })
  it('複数条件を組み合わせられる', () => {
    const r = filterProducts(PRODUCTS, filtersFromParams(new URLSearchParams('type=frozen&storage=frozen&price=over600')))
    expect(r.every((p) => p.type === 'frozen' && p.price! > 600)).toBe(true)
  })
  it('該当なしは空配列', () => {
    expect(filterProducts(PRODUCTS, { maker: 'kewpie' })).toEqual([])
  })
})

describe('sortProducts', () => {
  it('価格未登録は価格順で末尾', () => {
    const asc = sortProducts(PRODUCTS, 'priceAsc')
    const desc = sortProducts(PRODUCTS, 'priceDesc')
    expect(asc.at(-1)!.price).toBeNull()
    expect(desc.at(-1)!.price).toBeNull()
    expect(asc[0].price! <= asc[1].price!).toBe(true)
  })
})

describe('toggleCompare', () => {
  it('最大3件まで', () => {
    let ids: string[] = []
    for (const id of ['a', 'b', 'c']) ids = toggleCompare(ids, id).ids
    const r = toggleCompare(ids, 'd')
    expect(r.result).toBe('full')
    expect(r.ids).toEqual(['a', 'b', 'c'])
    expect(toggleCompare(ids, 'b').ids).toEqual(['a', 'c'])
  })
})

describe('データ方針', () => {
  it('実在メーカーの商品はてでもぐ以外登録しない', () => {
    const real = MAKERS.filter((m) => m.isReal && m.id !== 'tedemogu').map((m) => m.id)
    expect(PRODUCTS.some((p) => real.includes(p.makerId))).toBe(false)
  })
  it('てでもぐ以外はすべてサンプル', () => {
    expect(PRODUCTS.filter((p) => p.id !== 'tedemogu').every((p) => p.isSample)).toBe(true)
  })
  it('てでもぐは未提供情報を持たない', () => {
    const t = PRODUCTS.find((p) => p.id === 'tedemogu')!
    expect([t.price, t.rawMaterials, t.allergens, t.nutrition]).toEqual([null, null, null, null])
  })
})
