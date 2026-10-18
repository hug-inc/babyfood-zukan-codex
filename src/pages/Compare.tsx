import { Link } from 'react-router-dom'
import { ExternalLink, Scale, Search, Trash2, X } from 'lucide-react'
import { useCompare } from '../components/CompareContext'
import { findProduct, type Product } from '../data/products'
import { INGREDIENTS, STORAGES, TYPES, findMaker, labelOf } from '../data/master'
import { CHECK_OFFICIAL, formatAges, formatPrice } from '../lib/format'
import { MAX_COMPARE } from '../lib/compare'
import { PRBadge, PRNote, ProductImage, SampleBadge } from '../components/ProductParts'
import { recordEcClick } from '../lib/stats'

const ROWS: { label: string; value: (p: Product) => string }[] = [
  { label: 'メーカー', value: (p) => findMaker(p.makerId)?.name ?? '' },
  { label: '価格', value: (p) => formatPrice(p.price) },
  { label: '対象月齢', value: (p) => formatAges(p.ages) },
  { label: 'タイプ', value: (p) => labelOf(TYPES, p.type) || CHECK_OFFICIAL },
  { label: '食材', value: (p) => p.ingredients.map((i) => labelOf(INGREDIENTS, i)).join('・') || CHECK_OFFICIAL },
  { label: '保存方法', value: (p) => labelOf(STORAGES, p.storage) || CHECK_OFFICIAL },
  { label: '内容量', value: (p) => p.contentAmount ?? CHECK_OFFICIAL },
  { label: 'アレルゲン', value: (p) => (p.allergens === null ? CHECK_OFFICIAL : p.allergens.join('、') || '表示なし') },
  { label: 'エネルギー', value: (p) => (p.nutrition ? `${p.nutrition.energyKcal}kcal` : CHECK_OFFICIAL) },
]

export default function ComparePage() {
  const { ids, remove, clear } = useCompare()
  const products = ids.map(findProduct).filter((p): p is Product => p !== undefined)

  return (
    <div className="container-x py-6 md:py-10">
      <nav aria-label="パンくずリスト" className="mb-3 text-xs text-ink-mute">
        <Link to="/" className="hover:underline">トップ</Link> ／ 比較リスト
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-3xl">
            <Scale className="h-6 w-6 text-brand-500 md:h-8 md:w-8" aria-hidden />
            商品を比較する
          </h1>
          <p className="mt-1 text-sm text-ink-soft">最大{MAX_COMPARE}件まで並べて比較できます（{products.length}/{MAX_COMPARE}件）</p>
        </div>
        {products.length > 0 && (
          <button type="button" onClick={clear} className="btn-ghost min-h-[44px] text-sm">
            <Trash2 className="h-4 w-4" aria-hidden />
            すべて解除
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center px-6 py-12 text-center">
          <p className="font-bold">比較リストに商品がありません</p>
          <p className="mt-2 text-sm text-ink-soft">商品カードや商品詳細の「比較リストに追加」から追加できます。</p>
          <Link to="/search" className="btn-primary mt-5">
            <Search className="h-4 w-4" aria-hidden />
            商品を探す
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-4 text-xs text-ink-mute md:hidden">← 表は横にスクロールできます →</p>
          <div className="card relative mt-2 overflow-x-auto md:mt-6" tabIndex={0} role="region" aria-label="比較表">
            <table className="w-full min-w-[560px] table-fixed border-collapse text-sm md:text-base">
              <caption className="sr-only">比較リストの商品比較表</caption>
              <colgroup>
                <col className="w-24 md:w-40" />
                {products.map((p) => (
                  <col key={p.id} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-white p-3 text-left text-xs text-ink-mute">商品</th>
                  {products.map((p) => (
                    <th key={p.id} scope="col" className="p-3 align-top font-normal">
                      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-cream-100">
                        <ProductImage product={p} />
                        <div className="absolute left-1.5 top-1.5 flex gap-1">
                          {p.isPR && <PRBadge />}
                          {p.isSample && <SampleBadge />}
                        </div>
                      </div>
                      <Link to={`/products/${p.id}`} className="mt-2 block text-left font-bold leading-snug text-ink hover:text-brand-600 hover:underline">
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="mt-2 inline-flex min-h-[40px] items-center gap-1 rounded-full border border-cream-200 px-3 text-xs font-bold text-ink-soft hover:bg-cream-100"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden />
                        解除<span className="sr-only">：{p.name}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-t border-cream-200">
                    <th scope="row" className="sticky left-0 z-10 bg-leaf-50 p-3 text-left text-xs font-bold text-leaf-700 md:text-sm">
                      {r.label}
                    </th>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 align-top">{r.value(p)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-cream-200">
                  <th scope="row" className="sticky left-0 z-10 bg-leaf-50 p-3 text-left text-xs font-bold text-leaf-700 md:text-sm">購入</th>
                  {products.map((p) => (
                    <td key={p.id} className="p-3">
                      <a
                        href={p.ecUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => recordEcClick(p.id)}
                        className="btn-primary min-h-[44px] w-full px-3 text-sm"
                      >
                        公式EC
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        <span className="sr-only">（{p.name}・外部サイトが新しいタブで開きます）</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {products.some((p) => p.isPR) && <PRNote className="mt-4" />}
          {products.length < MAX_COMPARE && (
            <div className="mt-6 text-center">
              <Link to="/search" className="btn-outline">
                <Search className="h-4 w-4" aria-hidden />
                比較する商品を追加する
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
