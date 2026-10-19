import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Cookie, Droplet, Hand, Info, Megaphone, Package, Snowflake, Store, type LucideIcon } from 'lucide-react'
import SearchForm from '../components/SearchForm'
import Section from '../components/Section'
import { IngredientIllust } from '../components/Illustrations'
import { PRNote, ProductCard } from '../components/ProductParts'
import { AGES, INGREDIENTS, TYPES, type TypeId } from '../data/master'
import { PRODUCTS } from '../data/products'
import { ARTICLES } from '../data/articles'
import { sortProducts } from '../lib/search'
import { asset } from '../lib/asset'

const TYPE_ICON: Record<TypeId, LucideIcon> = {
  retort: Package,
  frozen: Snowflake,
  tezukami: Hand,
  freezedry: Droplet,
  snack: Cookie,
}

const INGREDIENT_BG = ['bg-cream-100', 'bg-leaf-50', 'bg-[#EAF4FB]', 'bg-brand-50', 'bg-[#FFF8E1]', 'bg-[#FDEEF0]']

// PR枠：1件目はてでもぐ、残りはサンプル商品
const prProducts = [PRODUCTS.find((p) => p.id === 'tedemogu')!, ...PRODUCTS.filter((p) => p.isPR && p.id !== 'tedemogu')].slice(0, 4)
const newProducts = sortProducts(PRODUCTS.filter((p) => !p.isPR), 'new').slice(0, 4)
const popularProducts = sortProducts(PRODUCTS, 'popular').slice(0, 4)

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="container-x grid items-center gap-0 pb-8 md:gap-10 md:py-12 lg:grid-cols-[1.2fr_1fr] lg:py-16">
        {/* 写真：スマホでは上部、PCでは右側 */}
        <div className="relative -mx-4 md:mx-0 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10] md:rounded-4xl lg:aspect-[4/5]">
            <img
              src={asset('images/hero-baby.webp')}
              alt="ハイチェアに座り、笑顔で野菜を食べる赤ちゃん"
              className="h-full w-full object-cover object-[50%_42%]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream-100/90 to-transparent md:hidden" aria-hidden />
          </div>
          <span className="absolute -bottom-3 right-6 hidden rotate-6 rounded-full bg-leaf-100 px-4 py-2 text-sm font-bold text-leaf-700 shadow-card lg:block" aria-hidden>
            かんたん比較！
          </span>
        </div>
        <div className="relative z-10 -mt-10 md:mt-0 lg:order-1">
          <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-leaf-700 shadow-card">
            ベビーフードの検索・比較メディア
          </p>
          <h1 id="hero-title" className="text-[26px] font-bold leading-snug tracking-wide md:text-4xl lg:text-[40px] lg:leading-tight">
            <span className="inline-block">
              うちの子に<span className="text-brand-500">ぴったり</span>の
            </span>
            <br />
            <span className="inline-block">ベビーフードが見つかる。</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
            全国のベビーフードを、月齢や食材から
            <br className="md:hidden" />
            かんたんに検索・比較できます。
          </p>
          <div className="mt-5">
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="age" en="BY AGE" title="月齢から探す" lead="お子さまの月齢に合わせた商品をチェック">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
          {AGES.map((a, i) => (
            <li key={a.id} className={i === AGES.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
              <Link to={`/search?age=${a.id}`} className="card group block h-full overflow-hidden hover:shadow-soft">
                <div className={`overflow-hidden ${i === AGES.length - 1 ? 'aspect-[2/1] md:aspect-square' : 'aspect-square'}`}>
                  <img src={a.image} alt={a.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-1 px-3 py-2.5">
                  <div>
                    <p className="text-[11px] font-bold text-leaf-700">{a.stage}</p>
                    <p className="font-bold leading-tight">{a.label}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-brand-400" aria-hidden />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" en="BY TYPE" title="種類から探す" className="bg-white">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
          {TYPES.map((t, i) => {
            const Icon = TYPE_ICON[t.id]
            return (
              <li key={t.id} className={i === TYPES.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
                <Link
                  to={`/search?type=${t.id}`}
                  className="flex h-full min-h-[72px] items-center gap-3 rounded-3xl border-2 border-cream-200 bg-cream-50 p-3 hover:border-brand-200 hover:bg-brand-50 md:flex-col md:p-5 md:text-center"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 md:h-14 md:w-14">
                    <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-snug md:text-base">{t.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-ink-mute md:text-xs">{t.description}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section id="ingredient" en="BY INGREDIENT" title="食材から探す">
        <ul className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-5">
          {INGREDIENTS.map((ing, i) => (
            <li key={ing.id}>
              <Link
                to={`/search?ingredient=${ing.id}`}
                className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-3xl ${INGREDIENT_BG[i]} shadow-card transition-transform hover:-translate-y-0.5`}
              >
                <IngredientIllust id={ing.id} className="h-12 w-12 md:h-16 md:w-16" />
                <span className="text-sm font-bold md:text-base">{ing.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="featured" en="PICK UP" title="注目のベビーフードブランド" className="bg-gradient-to-b from-brand-50/70 to-cream-50">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {prProducts.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <PRNote className="mt-4" />
      </Section>

      <Section id="new" en="NEW ARRIVALS" title="新着のベビーフードブランド" more={{ to: '/search?sort=new', label: 'もっと見る' }}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {newProducts.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="ranking" en="RANKING" title="人気のベビーフードブランド" more={{ to: '/search?sort=popular', label: 'もっと見る' }} className="bg-white">
        <p className="-mt-2 mb-4 flex items-start gap-1.5 text-xs text-ink-soft md:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-leaf-700" aria-hidden />
          過去30日間の商品詳細ページ閲覧数をもとに集計（毎日更新）
        </p>
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {popularProducts.map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} rank={i + 1} />
            </li>
          ))}
        </ol>
        {popularProducts.some((p) => p.isPR) && <PRNote className="mt-4" />}
      </Section>

      <Section id="articles" en="COLUMN" title="お役立ち記事" className="bg-white">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {ARTICLES.map((a) => (
            <li key={a.id}>
              <Link to={`/articles/${a.id}`} className="card group flex h-full overflow-hidden hover:shadow-soft md:flex-col">
                <div className="w-32 shrink-0 overflow-hidden md:aspect-[16/10] md:w-full">
                  <img src={a.image} alt={a.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-3 md:p-5">
                  <span className="chip w-fit bg-leaf-100 text-leaf-700">{a.category}</span>
                  <h3 className="mt-1.5 line-clamp-3 text-sm font-bold leading-snug group-hover:text-brand-600 md:text-base">{a.title}</h3>
                  <span className="mt-auto flex items-center gap-1 pt-2 text-xs font-bold text-brand-600 md:text-sm">
                    記事を読む
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="for-makers-title" className="py-10 md:py-16">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-4xl bg-leaf-100 px-5 py-8 md:flex md:items-center md:justify-between md:gap-10 md:px-12 md:py-12">
            <img src={asset('images/veggies-row.png')} alt="" aria-hidden className="pointer-events-none absolute -bottom-2 right-2 w-32 opacity-80 md:w-44" />
            <div className="relative">
              <p className="text-xs font-bold tracking-[0.2em] text-leaf-700">FOR MAKERS</p>
              <h2 id="for-makers-title" className="mt-1 text-xl font-bold md:text-2xl">
                ベビーフードメーカーの方へ
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft md:text-base">
                商品掲載は無料です。月齢や食材で探しているご家庭に、
                <br className="hidden md:inline" />
                貴社の商品を届けませんか。
              </p>
            </div>
            <div className="relative mt-5 grid gap-3 md:mt-0 md:w-72 md:shrink-0">
              <Link to="/for-makers#free" className="btn-primary w-full">
                <Store className="h-5 w-5" aria-hidden />
                商品を無料掲載する
              </Link>
              <Link to="/for-makers#ads" className="btn-outline w-full">
                <Megaphone className="h-5 w-5" aria-hidden />
                広告掲載について
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
