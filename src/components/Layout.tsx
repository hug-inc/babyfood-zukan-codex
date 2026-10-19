import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Menu, Scale, Search, X } from 'lucide-react'
import { useCompare } from './CompareContext'
import { findProduct } from '../data/products'
import { ProductImage } from './ProductParts'
import { MAX_COMPARE } from '../lib/compare'

const NAV = [
  { to: '/search', label: '商品をさがす' },
  { to: '/#age', label: '月齢から探す' },
  { to: '/#type', label: '種類から探す' },
  { to: '/#ingredient', label: '食材から探す' },
  { to: '/#articles', label: 'お役立ち記事' },
  { to: '/compare', label: '比較リスト' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 rounded-xl ${className}`} aria-label="離乳食ずかん トップへ">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-500 shadow-card md:h-10 md:w-10" aria-hidden>
        <svg viewBox="0 0 32 32" className="h-6 w-6">
          <path d="M6 15h20a10 9 0 0 1-20 0z" fill="#fff" />
          <path d="M20 4c3 0 4 3 3 6l-2 5h-3l1-5c0-3-1-6 1-6z" fill="#C6E3B9" />
          <circle cx="12.5" cy="19" r="1.2" fill="#F27B1F" />
          <circle cx="19.5" cy="19" r="1.2" fill="#F27B1F" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[10px] font-bold tracking-widest text-leaf-700">RINYUSHOKU ZUKAN</span>
        <span className="block text-lg font-bold text-ink md:text-xl">離乳食<span className="text-brand-500">ずかん</span></span>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-white">
      <div className="container-x flex h-16 items-center justify-between gap-3 md:h-20">
        <Logo />
        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-bold">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="rounded-full px-3 py-2 hover:bg-cream-100 hover:text-brand-600">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/search" className="flex h-12 w-12 flex-col items-center justify-center rounded-full text-ink hover:bg-cream-100 lg:w-auto lg:flex-row lg:gap-1 lg:bg-brand-500 lg:px-5 lg:text-white lg:hover:bg-brand-600">
            <Search className="h-5 w-5" aria-hidden />
            <span className="text-[10px] font-bold leading-none lg:text-sm">検索</span>
          </Link>
          <button
            ref={btnRef}
            type="button"
            className="flex h-12 w-12 flex-col items-center justify-center rounded-full hover:bg-cream-100 lg:hidden"
            aria-expanded={open}
            aria-controls="global-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            <span className="text-[10px] font-bold leading-none">{open ? '閉じる' : 'メニュー'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/30" aria-label="メニューを閉じる" onClick={() => setOpen(false)} tabIndex={-1} />
          <div id="global-menu" ref={panelRef} className="absolute inset-x-0 top-0 max-h-full overflow-y-auto rounded-b-4xl bg-white px-4 pb-8 pt-2 shadow-soft">
            <nav aria-label="メニュー">
              <ul className="divide-y divide-cream-200">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="flex min-h-[56px] items-center justify-between px-2 font-bold">
                      {n.label}
                      <ChevronRight className="h-5 w-5 text-brand-400" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 grid gap-3">
              <Link to="/for-makers" className="btn-outline w-full">メーカーの方へ</Link>
              <Link to="/admin" className="btn-ghost w-full text-sm">メーカー管理画面（デモ）</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const links = [
    { to: '/company', label: '運営会社' },
    { to: '/contact', label: 'お問い合わせ' },
    { to: '/terms', label: '利用規約' },
    { to: '/privacy', label: 'プライバシーポリシー' },
    { to: '/for-makers', label: 'メーカーの方へ' },
  ]
  return (
    <footer className="mt-16 bg-cream-100 pb-28 pt-10 md:pb-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-ink-soft">うちの子にぴったりのベビーフードが見つかる。</p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:flex md:gap-6">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-[44px] items-center hover:text-brand-600 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-6 rounded-2xl bg-white px-4 py-3 text-xs leading-relaxed text-ink-soft">
          本サイトに掲載している商品情報は、てでもぐを除きすべて架空のサンプル（デモデータ）です。実在するメーカー名は検索条件のメーカー一覧にのみ使用しており、各社の商品情報は掲載していません。
        </p>
        <p className="mt-6 text-center text-xs text-ink-mute">
          運営：株式会社HUG
          <br />© 2026 HUG Inc.
        </p>
      </div>
    </footer>
  )
}

function CompareBar() {
  const { ids, remove } = useCompare()
  const navigate = useNavigate()
  const location = useLocation()
  if (ids.length === 0 || location.pathname === '/compare') return null
  const items = ids.map((id) => findProduct(id)).filter((p) => p !== undefined)
  return (
    <aside aria-label="比較リスト" className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-100 bg-white/95 shadow-[0_-6px_24px_-8px_rgba(140,90,40,0.25)] backdrop-blur">
      <div className="container-x flex items-center gap-3 py-2.5">
        <div className="flex shrink-0 flex-col items-center text-brand-600">
          <Scale className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-bold leading-tight">
            比較 {ids.length}/{MAX_COMPARE}
          </span>
        </div>
        <ul className="flex min-w-0 flex-1 gap-2">
          {items.map((p) => (
            <li key={p.id} className="relative h-12 w-12 shrink-0 md:h-14 md:w-auto md:flex-1 md:max-w-[220px]">
              <div className="flex h-full items-center gap-2 overflow-hidden rounded-xl border border-cream-200 bg-cream-50 md:pr-8">
                <div className="h-full w-12 shrink-0 md:w-14">
                  <ProductImage product={p} />
                </div>
                <span className="hidden truncate text-xs font-bold md:block">{p.name}</span>
              </div>
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white md:right-1 md:top-1/2 md:-translate-y-1/2"
                aria-label={`${p.name}を比較リストから解除`}
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </li>
          ))}
          {Array.from({ length: MAX_COMPARE - items.length }).map((_, i) => (
            <li key={`empty-${i}`} aria-hidden className="hidden h-14 flex-1 max-w-[220px] items-center justify-center rounded-xl border-2 border-dashed border-cream-200 text-xs text-ink-mute md:flex">
              商品を追加
            </li>
          ))}
        </ul>
        <button type="button" className="btn-primary min-h-[48px] shrink-0 px-4 text-sm md:px-6" onClick={() => navigate('/compare')}>
          比較する
        </button>
      </div>
    </aside>
  )
}

function Toast() {
  const { notice, dismissNotice } = useCompare()
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
      {notice && (
        <div className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-soft">
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={dismissNotice} className="-m-1 rounded p-1" aria-label="通知を閉じる">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  )
}

export function ScrollManager() {
  // 検索条件（クエリ）の変更ではスクロール位置を維持する
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-soft">
        本文へスキップ
      </a>
      <Header />
      <main id="main" className="overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
      <Toast />
    </>
  )
}
