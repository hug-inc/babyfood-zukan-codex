import { useId, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, RotateCcw, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { AGES, INGREDIENTS, MAKERS, PRICE_RANGES, STORAGES, TYPES, findMaker } from '../data/master'
import { PRODUCTS } from '../data/products'
import { FILTER_KEYS, SORTS, filterProducts, filtersFromParams, sortProducts, type SortId } from '../lib/search'
import { PRNote, ProductCard } from '../components/ProductParts'

type FilterKey = (typeof FILTER_KEYS)[number]

const FILTER_DEFS: { key: FilterKey; label: string; all: string; options: { id: string; label: string }[] }[] = [
  { key: 'age', label: '月齢', all: 'すべての月齢', options: AGES },
  { key: 'type', label: '種類', all: 'すべての種類', options: TYPES },
  { key: 'ingredient', label: '食材', all: 'すべての食材', options: INGREDIENTS },
  { key: 'maker', label: 'メーカー', all: 'すべてのメーカー', options: MAKERS.map((m) => ({ id: m.id, label: m.name })) },
  { key: 'price', label: '価格（1商品あたり）', all: 'すべての価格', options: PRICE_RANGES },
  { key: 'storage', label: '保存方法', all: 'すべての保存方法', options: STORAGES },
]

const optionLabel = (key: FilterKey, id: string) => FILTER_DEFS.find((d) => d.key === key)?.options.find((o) => o.id === id)?.label ?? id

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const filters = filtersFromParams(params)
  const sort = (SORTS.find((s) => s.id === params.get('sort'))?.id ?? 'recommended') as SortId

  const results = sortProducts(filterProducts(PRODUCTS, filters), sort)
  const activeKeys = FILTER_KEYS.filter((k) => params.get(k))
  const maker = filters.maker ? findMaker(filters.maker) : undefined

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }
  const clearAll = () => {
    const next = new URLSearchParams()
    if (params.get('sort')) next.set('sort', params.get('sort')!)
    setParams(next, { replace: true })
  }

  const filterPanel = (
    <div className="grid gap-4">
      {FILTER_DEFS.map((d) => (
        <div key={d.key}>
          <label htmlFor={`f-${d.key}`} className="label">{d.label}</label>
          <select id={`f-${d.key}`} className="field" value={params.get(d.key) ?? ''} onChange={(e) => update(d.key, e.target.value)}>
            <option value="">{d.all}</option>
            {d.options.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={clearAll} className="btn-ghost w-full text-sm" disabled={activeKeys.length === 0}>
        <RotateCcw className="h-4 w-4" aria-hidden />
        条件をクリア
      </button>
    </div>
  )

  return (
    <div className="container-x py-6 md:py-10">
      <nav aria-label="パンくずリスト" className="mb-3 text-xs text-ink-mute">
        <Link to="/" className="hover:underline">トップ</Link> ／ 商品検索
      </nav>
      <h1 className="text-xl font-bold md:text-3xl">ベビーフードを探す</h1>

      <div className="mt-5 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* スマホ：開閉式 / PC：常時表示 */}
        <aside aria-label="検索条件" className="mb-5 lg:mb-0">
          <div className="card lg:sticky lg:top-28">
            <button
              type="button"
              className="flex min-h-[56px] w-full items-center justify-between gap-2 px-4 font-bold lg:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-brand-500" aria-hidden />
                絞り込み条件
                {activeKeys.length > 0 && <span className="chip bg-brand-500 text-white">{activeKeys.length}</span>}
              </span>
              <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            <p className="hidden px-5 pt-5 font-bold lg:flex lg:items-center lg:gap-2">
              <SlidersHorizontal className="h-5 w-5 text-brand-500" aria-hidden />
              絞り込み条件
            </p>
            <div id={panelId} className={`${open ? 'block' : 'hidden'} border-t border-cream-200 p-4 lg:block lg:border-0 lg:p-5`}>
              {filterPanel}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="font-bold">
              <span className="text-2xl text-brand-600">{results.length}</span>
              <span className="ml-1 text-sm">件の商品が見つかりました</span>
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-ink-soft">並び順</label>
              <select id="sort" className="field w-auto min-w-[150px] py-0" value={sort} onChange={(e) => update('sort', e.target.value === 'recommended' ? '' : e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {activeKeys.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="選択中の条件">
              {activeKeys.map((k) => (
                <li key={k}>
                  <button
                    type="button"
                    onClick={() => update(k, '')}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-full bg-leaf-100 px-3 text-sm font-bold text-leaf-700 hover:bg-leaf-200"
                    aria-label={`条件「${optionLabel(k, params.get(k)!)}」を解除`}
                  >
                    {optionLabel(k, params.get(k)!)}
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 ? (
            <>
              <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {results.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} showPrice />
                  </li>
                ))}
              </ul>
              {results.some((p) => p.isPR) && <PRNote className="mt-5" />}
            </>
          ) : (
            <div className="card mt-5 flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 text-brand-400">
                <SearchX className="h-8 w-8" aria-hidden />
              </span>
              <p className="mt-4 font-bold">条件に合う商品が見つかりませんでした</p>
              <p className="mt-2 text-sm text-ink-soft">
                {maker?.isReal
                  ? `「${maker.name}」の商品情報は現在掲載準備中です。`
                  : '条件を減らすか、別の条件で探してみてください。'}
              </p>
              <button type="button" onClick={clearAll} className="btn-primary mt-5">
                <RotateCcw className="h-4 w-4" aria-hidden />
                条件をクリアする
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
