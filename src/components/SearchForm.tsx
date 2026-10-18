import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { AGES, INGREDIENTS, TYPES } from '../data/master'

export default function SearchForm() {
  const navigate = useNavigate()
  const [age, setAge] = useState('')
  const [type, setType] = useState('')
  const [ingredient, setIngredient] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (age) params.set('age', age)
    if (type) params.set('type', type)
    if (ingredient) params.set('ingredient', ingredient)
    const qs = params.toString()
    navigate(qs ? `/search?${qs}` : '/search')
  }

  return (
    <form onSubmit={onSubmit} className="card p-4 md:p-6" aria-label="ベビーフードを条件で探す">
      <p className="mb-3 flex items-center gap-2 font-bold">
        <Search className="h-5 w-5 text-brand-500" aria-hidden />
        条件からさがす
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label htmlFor="hero-age" className="label">月齢</label>
          <select id="hero-age" className="field" value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">指定なし</option>
            {AGES.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-type" className="label">商品タイプ</label>
          <select id="hero-type" className="field" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">指定なし</option>
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="hero-ingredient" className="label">食材</label>
          <select id="hero-ingredient" className="field" value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
            <option value="">指定なし</option>
            {INGREDIENTS.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary mt-4 w-full text-base">
        <Search className="h-5 w-5" aria-hidden />
        この条件で探す
      </button>
    </form>
  )
}
