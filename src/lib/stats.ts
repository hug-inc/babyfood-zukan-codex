import { loadJSON, saveJSON } from './storage'

const KEY = 'bfz-ec-clicks'

/** 公式ECボタンのクリックをブラウザ内に記録する（デモ用。管理画面の集計に加算） */
export function recordEcClick(productId: string) {
  const counts = loadJSON<Record<string, number>>(KEY, {})
  counts[productId] = (counts[productId] ?? 0) + 1
  saveJSON(KEY, counts)
}

export function localEcClicks(productId: string): number {
  return loadJSON<Record<string, number>>(KEY, {})[productId] ?? 0
}
