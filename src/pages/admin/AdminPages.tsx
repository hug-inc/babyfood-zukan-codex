import { useState, type FormEvent } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, ImagePlus, LogIn, LogOut, MousePointerClick, Package, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { AGES, INGREDIENTS, STORAGES, TYPES, labelOf } from '../../data/master'
import { ProductIllust } from '../../components/Illustrations'
import { Logo } from '../../components/Layout'
import { DEMO_MAKER, STATUS_LABEL, emptyProduct, useAdmin, type AdminProduct, type PublishStatus } from './AdminContext'

export function AdminLayout() {
  const { loggedIn, logout } = useAdmin()
  const location = useLocation()
  const flash = (location.state as { flash?: string } | null)?.flash
  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-cream-200 bg-white">
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Logo />
            <span className="chip hidden bg-leaf-100 text-leaf-700 sm:inline-flex">メーカー管理（デモ）</span>
          </div>
          {loggedIn ? (
            <button type="button" onClick={logout} className="btn-ghost min-h-[44px] px-4 text-sm">
              <LogOut className="h-4 w-4" aria-hidden />
              ログアウト
            </button>
          ) : (
            <Link to="/" className="text-sm font-bold text-brand-600 hover:underline">サイトへ戻る</Link>
          )}
        </div>
      </header>
      <p className="bg-leaf-700 px-4 py-1.5 text-center text-xs text-white">デモ画面です。入力内容はこのブラウザ内にのみ保存され、サイトには反映されません。</p>
      <main id="main" className="container-x py-6 md:py-10">
        {flash && (
          <p role="status" className="mb-4 rounded-2xl bg-leaf-100 px-4 py-3 text-sm font-bold text-leaf-700">{flash}</p>
        )}
        <Outlet />
      </main>
    </div>
  )
}

function RequireLogin({ children }: { children: JSX.Element }) {
  const { loggedIn } = useAdmin()
  return loggedIn ? children : <Navigate to="/admin/login" replace />
}

export function AdminLogin() {
  const { loggedIn, login } = useAdmin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (loggedIn) return <Navigate to="/admin" replace />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。')
      return
    }
    login()
    navigate('/admin', { state: { flash: 'ログインしました（デモ）' } })
  }
  const demoLogin = () => {
    login()
    navigate('/admin', { state: { flash: 'デモアカウントでログインしました' } })
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center text-xl font-bold md:text-2xl">メーカー管理画面ログイン</h1>
      <p className="mt-2 text-center text-sm text-ink-soft">デモのため、任意の値を入力するとログインできます。</p>
      <form onSubmit={onSubmit} className="card mt-6 grid gap-4 p-5 md:p-6" noValidate>
        <div>
          <label htmlFor="l-email" className="label">メールアドレス</label>
          <input id="l-email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="maker@example.com" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="l-pass" className="label">パスワード</label>
          <input id="l-pass" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </div>
        {error && <p role="alert" className="text-sm font-bold text-[#C0392B]">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          <LogIn className="h-5 w-5" aria-hidden />
          ログイン
        </button>
        <div className="relative text-center text-xs text-ink-mute before:absolute before:inset-x-0 before:top-1/2 before:border-t before:border-cream-200">
          <span className="relative bg-white px-2">または</span>
        </div>
        <button type="button" onClick={demoLogin} className="btn-outline w-full">デモアカウントでログイン</button>
      </form>
    </div>
  )
}

function Thumb({ p, className = '' }: { p: AdminProduct; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-cream-100 ${className}`}>
      {p.photo ? (
        <img src={p.photo} alt={`${p.name}の商品写真`} className="h-full w-full object-cover" />
      ) : (
        <div role="img" aria-label={`${p.name}のイメージイラスト（写真未登録）`} className="h-full w-full">
          <ProductIllust type={p.type || null} className="h-full w-full" />
        </div>
      )}
    </div>
  )
}

export function AdminDashboard() {
  const { products, clicksOf, reset } = useAdmin()
  const published = products.filter((p) => p.status === 'published')
  const totalViews = products.reduce((s, p) => s + p.views30d, 0)
  const totalClicks = products.reduce((s, p) => s + clicksOf(p), 0)
  const stats = [
    { label: '公開中の商品', value: `${published.length}/${products.length}件`, icon: Package },
    { label: '閲覧数（30日）', value: totalViews.toLocaleString('ja-JP'), icon: Eye },
    { label: '公式ECクリック', value: totalClicks.toLocaleString('ja-JP'), icon: MousePointerClick },
  ]

  return (
    <RequireLogin>
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-ink-soft">{DEMO_MAKER.name} 様</p>
            <h1 className="text-xl font-bold md:text-2xl">掲載商品の管理</h1>
          </div>
          <Link to="/admin/products/new" className="btn-primary">
            <Plus className="h-5 w-5" aria-hidden />
            商品を登録する
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-3 gap-2 md:gap-4">
          {stats.map((s) => (
            <li key={s.label} className="card p-3 md:p-5">
              <s.icon className="h-5 w-5 text-brand-500" aria-hidden />
              <p className="mt-1 text-[11px] text-ink-soft md:text-sm">{s.label}</p>
              <p className="text-base font-bold md:text-2xl">{s.value}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-mute">※ 数値はデモ用のサンプル値です。公式ECクリックには、このブラウザで実際にクリックした回数が加算されます。</p>

        <h2 className="mt-8 font-bold">商品一覧</h2>
        {/* スマホ：カード / PC：表 */}
        <ul className="mt-3 grid gap-3 md:hidden">
          {products.map((p) => (
            <li key={p.id} className="card flex min-w-0 gap-3 p-3">
              <Thumb p={p} className="h-20 w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className={`chip ${STATUS_LABEL[p.status].className}`}>{STATUS_LABEL[p.status].label}</span>
                <p className="mt-1 truncate text-sm font-bold">{p.name}</p>
                <p className="text-xs text-ink-soft">
                  閲覧 {p.views30d.toLocaleString('ja-JP')} ／ ECクリック {clicksOf(p).toLocaleString('ja-JP')}
                </p>
              </div>
              <Link to={`/admin/products/${p.id}/edit`} className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full bg-cream-100 hover:bg-brand-50" aria-label={`${p.name}を編集`}>
                <Pencil className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <div className="card mt-3 hidden overflow-hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-leaf-50 text-xs text-leaf-700">
              <tr>
                <th scope="col" className="p-3">商品</th>
                <th scope="col" className="p-3">タイプ</th>
                <th scope="col" className="p-3">公開状態</th>
                <th scope="col" className="p-3 text-right">閲覧数（30日）</th>
                <th scope="col" className="p-3 text-right">公式ECクリック</th>
                <th scope="col" className="p-3 text-right">CTR</th>
                <th scope="col" className="p-3"><span className="sr-only">操作</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {products.map((p) => {
                const clicks = clicksOf(p)
                return (
                  <tr key={p.id}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Thumb p={p} className="h-12 w-12 shrink-0" />
                        <div>
                          <p className="font-bold">{p.name}</p>
                          <p className="text-xs text-ink-mute">更新日 {p.updatedAt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{labelOf(TYPES, p.type || null) || '—'}</td>
                    <td className="p-3"><span className={`chip ${STATUS_LABEL[p.status].className}`}>{STATUS_LABEL[p.status].label}</span></td>
                    <td className="p-3 text-right tabular-nums">{p.views30d.toLocaleString('ja-JP')}</td>
                    <td className="p-3 text-right tabular-nums">{clicks.toLocaleString('ja-JP')}</td>
                    <td className="p-3 text-right tabular-nums">{p.views30d ? `${((clicks / p.views30d) * 100).toFixed(1)}%` : '—'}</td>
                    <td className="p-3 text-right">
                      <Link to={`/admin/products/${p.id}/edit`} className="btn-ghost min-h-[40px] px-4 text-sm">
                        <Pencil className="h-4 w-4" aria-hidden />
                        編集
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={reset} className="mt-6 inline-flex min-h-[44px] items-center gap-1 text-sm text-ink-mute hover:underline">
          <RotateCcw className="h-4 w-4" aria-hidden />
          デモデータを初期状態に戻す
        </button>
      </div>
    </RequireLogin>
  )
}

/** 画像を縮小して data URL に変換（ブラウザ保存容量を抑えるため） */
function resizeImage(file: File, max = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('画像を読み込めませんでした'))
    }
    img.src = url
  })
}

function toggleIn<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

export function AdminProductForm() {
  const { id } = useParams()
  const { products, save } = useAdmin()
  const navigate = useNavigate()
  const existing = id ? products.find((p) => p.id === id) : undefined
  const [form, setForm] = useState<AdminProduct>(() => existing ?? emptyProduct())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [photoError, setPhotoError] = useState('')

  if (id && !existing) return <Navigate to="/admin" replace />

  const set = <K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) => setForm((f) => ({ ...f, [key]: value }))

  const onPhoto = async (file: File | undefined) => {
    setPhotoError('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('画像ファイルを選択してください。')
      return
    }
    try {
      set('photo', await resizeImage(file))
    } catch (e) {
      setPhotoError((e as Error).message)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = '商品名を入力してください。'
    if (!form.type) errs.type = '商品タイプを選択してください。'
    if (form.ages.length === 0) errs.ages = '対象月齢を1つ以上選択してください。'
    if (form.price && !/^\d+$/.test(form.price)) errs.price = '価格は半角数字で入力してください。'
    if (form.ecUrl && !/^https?:\/\//.test(form.ecUrl)) errs.ecUrl = 'URLは http:// または https:// から入力してください。'
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`p-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    // 新規登録で「公開」を選んだ場合は審査中として扱う
    const status: PublishStatus = !existing && form.status === 'published' ? 'review' : form.status
    const saved = save({ ...form, status })
    navigate('/admin', { state: { flash: `「${saved.name}」を${existing ? '更新' : '登録'}しました（デモ）` } })
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`p-${k}-err`} className="mt-1 text-sm font-bold text-[#C0392B]">{errors[k]}</p>
    ) : null

  return (
    <RequireLogin>
      <div className="mx-auto max-w-3xl">
        <Link to="/admin" className="inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          商品一覧へ戻る
        </Link>
        <h1 className="mt-2 text-xl font-bold md:text-2xl">{existing ? '商品を編集' : '商品を登録'}</h1>
        {existing && (
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
            現在の公開状態：<span className={`chip ${STATUS_LABEL[existing.status].className}`}>{STATUS_LABEL[existing.status].label}</span>
            <span>閲覧数（30日）{existing.views30d.toLocaleString('ja-JP')}</span>
          </p>
        )}

        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-6">
          <fieldset className="card grid gap-4 p-5">
            <legend className="sr-only">商品写真</legend>
            <p className="label">商品写真</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Thumb p={form} className="aspect-[5/4] w-full shrink-0 sm:w-48" />
              <div className="grid gap-2">
                <label className="btn-outline cursor-pointer text-sm focus-within:outline focus-within:outline-[3px] focus-within:outline-brand-500">
                  <ImagePlus className="h-5 w-5" aria-hidden />
                  写真を選択
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
                </label>
                {form.photo && (
                  <button type="button" onClick={() => set('photo', null)} className="btn-ghost min-h-[44px] text-sm">
                    <Trash2 className="h-4 w-4" aria-hidden />
                    写真を削除
                  </button>
                )}
                <p className="text-xs text-ink-mute">JPG・PNGなど。自動で縮小して保存します。</p>
                {photoError && <p role="alert" className="text-sm font-bold text-[#C0392B]">{photoError}</p>}
              </div>
            </div>
          </fieldset>

          <div className="card grid gap-4 p-5">
            <div>
              <label htmlFor="p-name" className="label">商品名 <span className="text-brand-600">必須</span></label>
              <input id="p-name" className="field" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'p-name-err' : undefined} />
              {err('name')}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="p-type" className="label">商品タイプ <span className="text-brand-600">必須</span></label>
                <select id="p-type" className="field" value={form.type} onChange={(e) => set('type', e.target.value as AdminProduct['type'])} aria-invalid={!!errors.type} aria-describedby={errors.type ? 'p-type-err' : undefined}>
                  <option value="">選択してください</option>
                  {TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                {err('type')}
              </div>
              <div>
                <label htmlFor="p-storage" className="label">保存方法</label>
                <select id="p-storage" className="field" value={form.storage} onChange={(e) => set('storage', e.target.value as AdminProduct['storage'])}>
                  <option value="">選択してください</option>
                  {STORAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset aria-describedby={errors.ages ? 'p-ages-err' : undefined}>
              <legend className="label">対象月齢 <span className="text-brand-600">必須</span></legend>
              <div className="flex flex-wrap gap-2">
                {AGES.map((a, i) => (
                  <label key={a.id} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-cream-200 bg-cream-50 px-4 text-sm has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand-500">
                    <input id={i === 0 ? 'p-ages' : undefined} type="checkbox" className="h-4 w-4 accent-brand-500" checked={form.ages.includes(a.id)} onChange={() => set('ages', toggleIn(form.ages, a.id))} />
                    {a.label}
                  </label>
                ))}
              </div>
              {err('ages')}
            </fieldset>
            <fieldset>
              <legend className="label">主な食材</legend>
              <div className="flex flex-wrap gap-2">
                {INGREDIENTS.map((ing) => (
                  <label key={ing.id} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-cream-200 bg-cream-50 px-4 text-sm has-[:checked]:border-leaf-500 has-[:checked]:bg-leaf-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-brand-500">
                    <input type="checkbox" className="h-4 w-4 accent-leaf-500" checked={form.ingredients.includes(ing.id)} onChange={() => set('ingredients', toggleIn(form.ingredients, ing.id))} />
                    {ing.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="p-price" className="label">価格（税込・円）</label>
                <input id="p-price" inputMode="numeric" className="field" value={form.price} onChange={(e) => set('price', e.target.value.trim())} aria-invalid={!!errors.price} aria-describedby={errors.price ? 'p-price-err' : undefined} />
                {err('price')}
              </div>
              <div>
                <label htmlFor="p-amount" className="label">内容量</label>
                <input id="p-amount" className="field" value={form.contentAmount} onChange={(e) => set('contentAmount', e.target.value)} placeholder="例：80g" />
              </div>
            </div>
            <div>
              <label htmlFor="p-raw" className="label">原材料</label>
              <textarea id="p-raw" className="field min-h-[88px] py-3" value={form.rawMaterials} onChange={(e) => set('rawMaterials', e.target.value)} />
            </div>
            <div>
              <label htmlFor="p-allergens" className="label">アレルゲン（読点区切り）</label>
              <input id="p-allergens" className="field" value={form.allergens} onChange={(e) => set('allergens', e.target.value)} placeholder="例：小麦、大豆" />
            </div>
            <div>
              <label htmlFor="p-desc" className="label">商品説明</label>
              <textarea id="p-desc" className="field min-h-[100px] py-3" value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div>
              <label htmlFor="p-ecUrl" className="label">公式EC商品ページURL</label>
              <input id="p-ecUrl" type="url" className="field" value={form.ecUrl} onChange={(e) => set('ecUrl', e.target.value.trim())} placeholder="https://" aria-invalid={!!errors.ecUrl} aria-describedby={errors.ecUrl ? 'p-ecUrl-err' : undefined} />
              {err('ecUrl')}
            </div>
          </div>

          <fieldset className="card p-5">
            <legend className="sr-only">公開設定</legend>
            <p className="label">公開設定</p>
            <div className="flex flex-wrap gap-2">
              {(['published', 'draft'] as const).map((s) => (
                <label key={s} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-cream-200 bg-cream-50 px-4 text-sm has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
                  <input type="radio" name="status" className="h-4 w-4 accent-brand-500" checked={form.status === s || (s === 'published' && form.status === 'review')} onChange={() => set('status', s)} />
                  {s === 'published' ? '公開する' : '非公開（下書き）'}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-mute">新規登録した商品は、運営の確認後に公開されます（デモでは「審査中」と表示されます）。</p>
          </fieldset>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link to="/admin" className="btn-ghost">キャンセル</Link>
            <button type="submit" className="btn-primary">{existing ? '変更を保存する' : '登録する'}</button>
          </div>
        </form>
      </div>
    </RequireLogin>
  )
}
