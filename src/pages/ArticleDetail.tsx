import { Link, useParams } from 'react-router-dom'
import { ARTICLES, findArticle } from '../data/articles'
import NotFound from './NotFound'

export default function ArticleDetail() {
  const { id = '' } = useParams()
  const article = findArticle(id)
  if (!article) return <NotFound />
  const others = ARTICLES.filter((a) => a.id !== article.id)
  return (
    <article className="container-x max-w-3xl py-6 md:py-10">
      <nav aria-label="パンくずリスト" className="mb-3 text-xs text-ink-mute">
        <Link to="/" className="hover:underline">トップ</Link> ／ <Link to="/#articles" className="hover:underline">お役立ち記事</Link>
      </nav>
      <span className="chip bg-leaf-100 text-leaf-700">{article.category}</span>
      <h1 className="mt-2 text-xl font-bold leading-snug md:text-3xl">{article.title}</h1>
      <img src={article.image} alt={article.alt} className="mt-5 aspect-[16/9] w-full rounded-4xl object-cover shadow-card" />
      <div className="mt-6 space-y-4 text-base leading-loose">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-6 rounded-2xl bg-cream-100 px-4 py-3 text-xs text-ink-soft">※ デモ版のため、記事本文は要約のみ掲載しています。</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/search" className="btn-primary">ベビーフードを探す</Link>
      </div>
      <h2 className="mt-12 text-lg font-bold">ほかの記事</h2>
      <ul className="mt-3 grid gap-3">
        {others.map((a) => (
          <li key={a.id}>
            <Link to={`/articles/${a.id}`} className="card flex min-h-[56px] items-center gap-3 p-3 hover:shadow-soft">
              <img src={a.image} alt={a.alt} className="h-14 w-20 shrink-0 rounded-xl object-cover" loading="lazy" />
              <span className="text-sm font-bold leading-snug">{a.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
