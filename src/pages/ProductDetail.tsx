import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ExternalLink, Info } from 'lucide-react'
import { findProduct, PRODUCTS } from '../data/products'
import { INGREDIENTS, STORAGES, TYPES, findMaker, labelOf } from '../data/master'
import { CHECK_OFFICIAL, formatAges, formatPrice } from '../lib/format'
import { CompareButton, PRBadge, PRNote, ProductCard, ProductImage, SampleBadge } from '../components/ProductParts'
import { recordEcClick } from '../lib/stats'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { id = '' } = useParams()
  const product = findProduct(id)
  if (!product) return <NotFound />
  const maker = findMaker(product.makerId)
  const n = product.nutrition
  const related = PRODUCTS.filter((p) => p.id !== product.id && product.type !== null && p.type === product.type).slice(0, 4)

  const rows: { label: string; value: string }[] = [
    { label: 'メーカー', value: maker?.name ?? '' },
    { label: '価格', value: formatPrice(product.price) },
    { label: '対象月齢', value: formatAges(product.ages) },
    { label: '商品タイプ', value: labelOf(TYPES, product.type) || CHECK_OFFICIAL },
    { label: '主な食材', value: product.ingredients.map((i) => labelOf(INGREDIENTS, i)).join('・') || CHECK_OFFICIAL },
    { label: '保存方法', value: labelOf(STORAGES, product.storage) || CHECK_OFFICIAL },
    { label: '内容量', value: product.contentAmount ?? CHECK_OFFICIAL },
    { label: '原材料', value: product.rawMaterials ?? CHECK_OFFICIAL },
    {
      label: 'アレルゲン',
      value: product.allergens === null ? CHECK_OFFICIAL : product.allergens.length ? product.allergens.join('、') : '特定原材料等の表示なし',
    },
  ]

  return (
    <div className="container-x py-6 md:py-10">
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-ink-mute">
        <Link to="/" className="hover:underline">トップ</Link> ／ <Link to="/search" className="hover:underline">商品検索</Link> ／ {product.name}
      </nav>

      {product.isSample && (
        <p className="mb-4 flex items-start gap-2 rounded-2xl border border-dashed border-ink-mute/40 bg-white px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            この商品は表示確認用の<strong>サンプル（デモデータ）</strong>です。実在する商品ではありません。
          </span>
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-[5/4] overflow-hidden rounded-4xl bg-cream-100 shadow-card">
          <ProductImage product={product} />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.isPR && <PRBadge className="px-3 py-1 text-sm" />}
            {product.isSample && <SampleBadge className="px-3 py-1 text-sm" />}
          </div>
        </div>

        <div>
          <p className="text-sm text-ink-mute">{maker?.name}</p>
          <h1 className="mt-1 text-2xl font-bold leading-snug md:text-3xl">{product.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-brand-700">
            {product.price === null ? <span className="text-base text-ink-soft">価格：{CHECK_OFFICIAL}</span> : formatPrice(product.price)}
          </p>

          <div className="mt-5 grid gap-3">
            <a
              href={product.ecUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary w-full text-base"
              onClick={() => recordEcClick(product.id)}
            >
              公式ECサイトで購入する
              <ExternalLink className="h-5 w-5" aria-hidden />
              <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
            </a>
            <CompareButton product={product} size="lg" />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-mute">
            ※ 購入手続きは各メーカーの公式ECサイトで行います。本サイトでは決済を行いません。
            {product.isSample && 'サンプル商品のリンク先はデモ用のURLです。'}
          </p>
          {product.isPR && <PRNote className="mt-4" />}
        </div>
      </div>

      <section aria-labelledby="spec-title" className="mt-10">
        <h2 id="spec-title" className="text-lg font-bold md:text-xl">商品情報</h2>
        <dl className="card mt-3 divide-y divide-cream-200 overflow-hidden">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-3 text-sm md:grid-cols-[160px_1fr] md:px-6 md:text-base">
              <dt className="font-bold text-ink-soft">{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="nutrition-title" className="mt-8">
        <h2 id="nutrition-title" className="text-lg font-bold md:text-xl">栄養成分{n && <span className="ml-1 text-sm font-normal text-ink-mute">（1食あたり）</span>}</h2>
        {n ? (
          <div className="card relative mt-3 overflow-x-auto">
            <table className="w-full min-w-[320px] text-center text-sm md:text-base">
              <caption className="sr-only">栄養成分表示</caption>
              <thead className="bg-leaf-50 text-xs text-leaf-700 md:text-sm">
                <tr>
                  {['エネルギー', 'たんぱく質', '脂質', '炭水化物', '食塩相当量'].map((h) => (
                    <th key={h} scope="col" className="px-2 py-2 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-3">{n.energyKcal}kcal</td>
                  <td className="px-2 py-3">{n.proteinG}g</td>
                  <td className="px-2 py-3">{n.fatG}g</td>
                  <td className="px-2 py-3">{n.carbG}g</td>
                  <td className="px-2 py-3">{n.saltG}g</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="card mt-3 px-4 py-4 text-sm text-ink-soft">{CHECK_OFFICIAL}</p>
        )}
        <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-ink-mute">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          商品情報は変更される場合があります。ご購入・お召し上がりの前に、必ず商品パッケージや公式サイトの表示をご確認ください。
        </p>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-12">
          <h2 id="related-title" className="text-lg font-bold md:text-xl">同じ種類のベビーフード</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
