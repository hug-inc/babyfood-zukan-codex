import { Link } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import type { Product } from '../data/products'
import { findMaker } from '../data/master'
import { formatAges } from '../lib/format'
import { ProductIllust } from './Illustrations'
import { useCompare } from './CompareContext'

export function PRBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`chip bg-brand-500 text-white ring-2 ring-white ${className}`} aria-label="広告（PR）">
      PR
    </span>
  )
}

export function SampleBadge({ className = '' }: { className?: string }) {
  return <span className={`chip border border-ink-mute/40 bg-white/90 text-ink-soft ${className}`}>サンプル</span>
}

export function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  if (product.photo) {
    return <img src={product.photo} alt={product.photoAlt ?? product.name} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  }
  return (
    <div role="img" aria-label={`${product.name}のイメージイラスト（サンプル商品のため実際の商品写真ではありません）`} className={`h-full w-full ${className}`}>
      <ProductIllust type={product.type} className="h-full w-full" />
    </div>
  )
}

export function CompareButton({ product, size = 'sm' }: { product: Product; size?: 'sm' | 'lg' }) {
  const { has, toggle } = useCompare()
  const active = has(product.id)
  const base =
    size === 'lg'
      ? 'btn w-full border-2'
      : 'inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border-2 px-3 text-sm font-bold transition-colors'
  return (
    <button
      type="button"
      onClick={() => toggle(product.id)}
      aria-pressed={active}
      className={`${base} ${active ? 'border-leaf-500 bg-leaf-50 text-leaf-700 hover:bg-leaf-100' : 'border-brand-200 bg-white text-brand-600 hover:bg-brand-50'}`}
    >
      {active ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
      {size === 'lg' ? (active ? '比較リストから解除' : '比較リストに追加') : active ? '比較中' : '比較に追加'}
      <span className="sr-only">
        ：{product.name}
        {size === 'sm' && active && '（押すと比較リストから解除）'}
      </span>
    </button>
  )
}

interface CardProps {
  product: Product
  rank?: number
  showPrice?: boolean
}

export function ProductCard({ product, rank, showPrice = false }: CardProps) {
  const maker = findMaker(product.makerId)
  return (
    <article
      className={`card flex h-full flex-col overflow-hidden ${product.isPR ? 'ring-2 ring-brand-200' : ''}`}
      aria-label={product.isPR ? `PR商品：${product.name}` : product.name}
    >
      <Link to={`/products/${product.id}`} className="group flex flex-1 flex-col rounded-3xl focus-visible:outline-offset-[-3px]">
        <div className="relative aspect-[5/4] overflow-hidden bg-cream-100">
          <ProductImage product={product} className="transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute left-2 top-2 flex gap-1">
            {product.isPR && <PRBadge />}
            {product.isSample && <SampleBadge />}
          </div>
          {rank !== undefined && (
            <span
              className={`absolute -left-0 bottom-2 flex h-9 w-9 items-center justify-center rounded-r-full text-base font-bold text-white ${
                rank === 1 ? 'bg-[#E8A317]' : rank === 2 ? 'bg-[#9AA4AE]' : rank === 3 ? 'bg-[#C98A55]' : 'bg-ink-soft'
              }`}
            >
              {rank}
              <span className="sr-only">位</span>
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 md:p-4">
          <p className="text-xs text-ink-mute">{maker?.name}</p>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-brand-600 md:text-base">{product.name}</h3>
          <p className="mt-auto pt-1 text-xs text-ink-soft">
            <span className="mr-1 inline-block rounded bg-leaf-50 px-1.5 text-leaf-700">対象月齢</span>
            {formatAges(product.ages)}
          </p>
          {showPrice && product.price !== null && <p className="text-sm font-bold text-brand-700">{product.price.toLocaleString('ja-JP')}円<span className="text-xs font-normal">（税込）</span></p>}
        </div>
      </Link>
      <div className="px-3 pb-3 md:px-4 md:pb-4">
        <CompareButton product={product} />
      </div>
    </article>
  )
}

export function PRNote({ className = '' }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-xs leading-relaxed text-ink-soft md:text-sm ${className}`}>
      <PRBadge className="mt-0.5 shrink-0" />
      <span>「PR」表示のある商品は、メーカーから広告掲載料をいただいて掲載しています。</span>
    </p>
  )
}
