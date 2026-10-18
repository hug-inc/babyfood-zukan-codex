import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { MAX_COMPARE, toggleCompare } from '../lib/compare'
import { loadJSON, saveJSON } from '../lib/storage'
import { findProduct } from '../data/products'

interface CompareState {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  notice: string | null
  dismissNotice: () => void
}

const Ctx = createContext<CompareState | null>(null)
const KEY = 'bfz-compare'

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => loadJSON<string[]>(KEY, []).filter((id) => findProduct(id)).slice(0, MAX_COMPARE))
  const [notice, setNotice] = useState<string | null>(null)
  const timer = useRef<number>()

  useEffect(() => saveJSON(KEY, ids), [ids])

  const notify = useCallback((msg: string) => {
    setNotice(msg)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNotice(null), 3500)
  }, [])

  // 連続クリックでも最新の状態を参照できるよう ref にも保持する
  const idsRef = useRef(ids)
  const commit = useCallback((next: string[]) => {
    idsRef.current = next
    setIds(next)
  }, [])

  const toggle = useCallback(
    (id: string) => {
      const next = toggleCompare(idsRef.current, id)
      const name = findProduct(id)?.name ?? '商品'
      if (next.result === 'full') notify(`比較できるのは最大${MAX_COMPARE}件までです。ほかの商品を解除してから追加してください。`)
      else notify(next.result === 'added' ? `「${name}」を比較リストに追加しました` : `「${name}」を比較リストから解除しました`)
      commit(next.ids)
    },
    [commit, notify],
  )

  const value = useMemo<CompareState>(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle,
      remove: (id) => commit(idsRef.current.filter((x) => x !== id)),
      clear: () => commit([]),
      notice,
      dismissNotice: () => setNotice(null),
    }),
    [ids, toggle, commit, notice],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCompare() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useCompare must be used within CompareProvider')
  return v
}
