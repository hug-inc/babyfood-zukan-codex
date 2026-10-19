import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, LayoutDashboard, Megaphone, Store } from 'lucide-react'

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-x max-w-3xl py-6 md:py-10">
      <nav aria-label="パンくずリスト" className="mb-3 text-xs text-ink-mute">
        <Link to="/" className="hover:underline">トップ</Link> ／ {title}
      </nav>
      <h1 className="text-xl font-bold md:text-3xl">{title}</h1>
      <div className="mt-6 space-y-4 leading-loose">{children}</div>
    </div>
  )
}

export function CompanyPage() {
  return (
    <Page title="運営会社">
      <dl className="card divide-y divide-cream-200">
        {[
          ['会社名', '株式会社HUG'],
          ['サービス名', '離乳食ずかん'],
          ['事業内容', 'ベビーフード検索・比較メディアの運営、ベビーフードブランド「てでもぐ（TEDEMOGU）」の企画・販売'],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[96px_1fr] gap-3 px-4 py-3 md:grid-cols-[140px_1fr]">
            <dt className="font-bold text-ink-soft">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-ink-soft">
        当サイトでは自社ブランド「てでもぐ」もPR枠で掲載しています。PR枠の商品には必ず「PR」と表示しています。
      </p>
    </Page>
  )
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <Page title="お問い合わせ">
      {sent ? (
        <p role="status" className="card flex items-center gap-2 p-5 font-bold text-leaf-700">
          <CheckCircle2 className="h-5 w-5" aria-hidden />
          デモ版のため送信はされません。入力内容の確認のみ行いました。
        </p>
      ) : (
        <form onSubmit={onSubmit} className="card grid gap-4 p-5">
          <div>
            <label htmlFor="c-name" className="label">お名前</label>
            <input id="c-name" className="field" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="c-email" className="label">メールアドレス</label>
            <input id="c-email" type="email" className="field" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="c-body" className="label">お問い合わせ内容</label>
            <textarea id="c-body" className="field min-h-[140px] py-3" required />
          </div>
          <button className="btn-primary">確認する（デモ）</button>
        </form>
      )}
    </Page>
  )
}

export function TermsPage() {
  return (
    <Page title="利用規約">
      <p>本規約は、株式会社HUG（以下「当社」）が運営する「離乳食ずかん」（以下「本サービス」）の利用条件を定めるものです。</p>
      <p>本サービスに掲載する商品情報は、各メーカーから提供された情報等をもとにしていますが、その正確性・最新性を保証するものではありません。ご購入・ご利用の際は、各商品の表示や公式サイトをご確認ください。</p>
      <p>本サービスは商品の販売・決済を行いません。商品の購入は各メーカーの公式ECサイトにて、当該サイトの規約に従って行われます。</p>
      <p className="text-sm text-ink-mute">※ デモ版のため、規約はサンプル文面です。</p>
    </Page>
  )
}

export function PrivacyPage() {
  return (
    <Page title="プライバシーポリシー">
      <p>当社は、本サービスの提供にあたり取得する個人情報を、適切に管理し、利用目的の範囲内で取り扱います。</p>
      <p>本サービスでは、サービス改善および掲載メーカーへの統計レポート作成のため、閲覧数や外部サイトへのクリック数などの統計情報を取得する場合があります。これらは個人を特定しない形で利用します。</p>
      <p className="text-sm text-ink-mute">※ デモ版のため、ポリシーはサンプル文面です。</p>
    </Page>
  )
}

export function ForMakersPage() {
  return (
    <Page title="メーカーの方へ">
      <p>「離乳食ずかん」は、月齢や食材からベビーフードを探すご家庭と、メーカーの皆さまをつなぐ検索・比較メディアです。</p>
      <section id="free" className="card scroll-mt-24 p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Store className="h-5 w-5 text-brand-500" aria-hidden />
          商品掲載は無料です
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>商品情報・写真の登録、公開状態の管理はメーカー管理画面から行えます。</li>
          <li>商品詳細ページから貴社の公式ECサイトへ送客します（サイト内での決済はありません）。</li>
          <li>販売成果に応じた手数料をいただく成果報酬型です。</li>
        </ul>
        <Link to="/admin" className="btn-primary mt-4 w-full md:w-auto">
          <LayoutDashboard className="h-5 w-5" aria-hidden />
          メーカー管理画面（デモ）へ
        </Link>
      </section>
      <section id="ads" className="card scroll-mt-24 p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Megaphone className="h-5 w-5 text-brand-500" aria-hidden />
          広告掲載について
        </h2>
        <p className="mt-3 text-sm">
          トップページ「注目のベビーフードブランド」などのPR枠に商品を掲載できます。PR枠の商品には必ず「PR」と表示し、広告であることを明示します。
        </p>
        <Link to="/contact" className="btn-outline mt-4 w-full md:w-auto">広告掲載のお問い合わせ</Link>
      </section>
    </Page>
  )
}
