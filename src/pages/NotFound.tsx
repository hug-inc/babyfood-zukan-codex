import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x py-20 text-center">
      <p className="text-5xl font-bold text-brand-200">404</p>
      <h1 className="mt-3 text-xl font-bold">ページが見つかりませんでした</h1>
      <p className="mt-2 text-sm text-ink-soft">お探しのページは移動または削除された可能性があります。</p>
      <Link to="/" className="btn-primary mt-6">トップへ戻る</Link>
    </div>
  )
}
