import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AgeId, IngredientId, StorageId, TypeId } from '../../data/master'
import { PRODUCTS } from '../../data/products'
import { loadJSON, saveJSON } from '../../lib/storage'
import { localEcClicks } from '../../lib/stats'

export type PublishStatus = 'published' | 'review' | 'draft'

export const STATUS_LABEL: Record<PublishStatus, { label: string; className: string }> = {
  published: { label: '公開中', className: 'bg-leaf-100 text-leaf-700' },
  review: { label: '審査中', className: 'bg-[#FFF3C4] text-[#8A6400]' },
  draft: { label: '非公開', className: 'bg-cream-200 text-ink-soft' },
}

export interface AdminProduct {
  id: string
  name: string
  type: TypeId | ''
  ages: AgeId[]
  ingredients: IngredientId[]
  price: string
  storage: StorageId | ''
  contentAmount: string
  rawMaterials: string
  allergens: string
  description: string
  ecUrl: string
  status: PublishStatus
  photo: string | null
  views30d: number
  ecClicks: number
  updatedAt: string
}

/** デモ用ログイン中メーカー（架空） */
export const DEMO_MAKER = { id: 'sample-a', name: 'ひだまりキッチン（サンプル）' }

const today = () => new Date().toISOString().slice(0, 10)

function seed(): AdminProduct[] {
  const fromCatalog = PRODUCTS.filter((p) => p.makerId === DEMO_MAKER.id).map<AdminProduct>((p, i) => ({
    id: p.id,
    name: p.name,
    type: p.type ?? '',
    ages: p.ages,
    ingredients: p.ingredients,
    price: p.price?.toString() ?? '',
    storage: p.storage ?? '',
    contentAmount: p.contentAmount ?? '',
    rawMaterials: p.rawMaterials ?? '',
    allergens: p.allergens?.join('、') ?? '',
    description: p.description,
    ecUrl: p.ecUrl,
    status: 'published',
    photo: null,
    views30d: p.views30d,
    ecClicks: Math.round(p.views30d * (0.06 + i * 0.01)),
    updatedAt: p.publishedAt,
  }))
  return [
    ...fromCatalog,
    {
      id: 'draft-001', name: 'かぼちゃとお豆のポタージュ', type: 'retort', ages: ['7-8', '9-11'], ingredients: ['vegetable', 'beans'],
      price: '238', storage: 'room', contentAmount: '80g', rawMaterials: 'かぼちゃ、白いんげん豆、たまねぎ', allergens: '',
      description: 'なめらかなポタージュのサンプル商品です。', ecUrl: 'https://example.com/demo-ec/draft-001',
      status: 'review', photo: null, views30d: 0, ecClicks: 0, updatedAt: '2026-10-16',
    },
  ]
}

export const emptyProduct = (): AdminProduct => ({
  id: '', name: '', type: '', ages: [], ingredients: [], price: '', storage: '', contentAmount: '', rawMaterials: '',
  allergens: '', description: '', ecUrl: '', status: 'draft', photo: null, views30d: 0, ecClicks: 0, updatedAt: today(),
})

interface AdminState {
  loggedIn: boolean
  login: () => void
  logout: () => void
  products: AdminProduct[]
  save: (p: AdminProduct) => AdminProduct
  /** ブラウザ内で記録した公式ECクリックを加算した値 */
  clicksOf: (p: AdminProduct) => number
  reset: () => void
}

const Ctx = createContext<AdminState | null>(null)
const KEY = 'bfz-admin'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(() => loadJSON(`${KEY}-login`, false))
  const [products, setProducts] = useState<AdminProduct[]>(() => loadJSON(`${KEY}-products`, seed()))

  useEffect(() => saveJSON(`${KEY}-login`, loggedIn), [loggedIn])
  useEffect(() => saveJSON(`${KEY}-products`, products), [products])

  const value = useMemo<AdminState>(
    () => ({
      loggedIn,
      login: () => setLoggedIn(true),
      logout: () => setLoggedIn(false),
      products,
      save: (p) => {
        const saved = { ...p, id: p.id || `new-${Date.now()}`, updatedAt: today() }
        setProducts((cur) => (cur.some((x) => x.id === saved.id) ? cur.map((x) => (x.id === saved.id ? saved : x)) : [saved, ...cur]))
        return saved
      },
      clicksOf: (p) => p.ecClicks + localEcClicks(p.id),
      reset: () => setProducts(seed()),
    }),
    [loggedIn, products],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAdmin() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAdmin must be used within AdminProvider')
  return v
}
