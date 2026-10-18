// 検索軸のマスターデータ

import { asset } from '../lib/asset'

export type AgeId = '5-6' | '7-8' | '9-11' | '12-18' | '18plus'
export type TypeId = 'retort' | 'frozen' | 'tezukami' | 'freezedry' | 'snack'
export type IngredientId = 'rice' | 'vegetable' | 'fish' | 'meat' | 'beans' | 'fruit'
export type StorageId = 'room' | 'frozen' | 'chilled'
export type PriceRangeId = 'under300' | '300to600' | 'over600'

export interface Option<T extends string> {
  id: T
  label: string
}

export interface AgeOption extends Option<AgeId> {
  stage: string
  image: string
  alt: string
}

export const AGES: AgeOption[] = [
  { id: '5-6', label: '5〜6か月', stage: 'ゴックン期', image: asset('images/age-5-6.webp'), alt: 'テーブルの前に座ってほほえむ赤ちゃん' },
  { id: '7-8', label: '7〜8か月', stage: 'モグモグ期', image: asset('images/age-7-8.webp'), alt: '手に持った野菜スティックを食べる赤ちゃん' },
  { id: '9-11', label: '9〜11か月', stage: 'カミカミ期', image: asset('images/age-9-11.webp'), alt: 'おやきを両手で持って食べる赤ちゃん' },
  { id: '12-18', label: '12〜18か月', stage: 'パクパク期', image: asset('images/age-12-18.webp'), alt: 'ママと一緒に食卓で笑顔を見せる子ども' },
  { id: '18plus', label: '1歳半〜', stage: '幼児食へ', image: asset('images/age-18plus.webp'), alt: 'ママに抱き上げられて笑う子ども' },
]

export interface TypeOption extends Option<TypeId> {
  description: string
}

export const TYPES: TypeOption[] = [
  { id: 'retort', label: 'レトルト・パウチ', description: '常温で持ち運びやすい' },
  { id: 'frozen', label: '冷凍離乳食', description: 'まとめて買ってストック' },
  { id: 'tezukami', label: '手づかみ食べ', description: '自分で食べる練習に' },
  { id: 'freezedry', label: 'フリーズドライ', description: 'お湯で戻してすぐ使える' },
  { id: 'snack', label: 'おやつ', description: '補食やごほうびに' },
]

export const INGREDIENTS: Option<IngredientId>[] = [
  { id: 'rice', label: '米' },
  { id: 'vegetable', label: '野菜' },
  { id: 'fish', label: '魚' },
  { id: 'meat', label: '肉' },
  { id: 'beans', label: '豆類' },
  { id: 'fruit', label: '果物' },
]

export const STORAGES: Option<StorageId>[] = [
  { id: 'room', label: '常温' },
  { id: 'chilled', label: '冷蔵' },
  { id: 'frozen', label: '冷凍' },
]

export const PRICE_RANGES: (Option<PriceRangeId> & { min: number; max: number })[] = [
  { id: 'under300', label: '300円未満', min: 0, max: 299 },
  { id: '300to600', label: '300〜600円', min: 300, max: 600 },
  { id: 'over600', label: '600円超', min: 601, max: Number.POSITIVE_INFINITY },
]

export interface Maker {
  id: string
  name: string
  /** true: 架空のサンプルメーカー（デモデータ） */
  isSample: boolean
  /** true: 実在メーカー。商品情報は掲載しない */
  isReal: boolean
}

// 実在メーカーは「メーカーから探す」の一覧表示のみに使用し、商品情報は一切登録しない
export const MAKERS: Maker[] = [
  { id: 'kewpie', name: 'キユーピー', isSample: false, isReal: true },
  { id: 'wakodo', name: '和光堂', isSample: false, isReal: true },
  { id: 'pigeon', name: 'ピジョン', isSample: false, isReal: true },
  { id: 'beanstalk', name: '雪印ビーンスターク', isSample: false, isReal: true },
  { id: 'morinaga', name: '森永', isSample: false, isReal: true },
  { id: 'meiji', name: '明治', isSample: false, isReal: true },
  { id: 'glico', name: 'グリコ', isSample: false, isReal: true },
  { id: 'tedemogu', name: 'てでもぐ', isSample: false, isReal: true },
  { id: 'sample-a', name: 'ひだまりキッチン（サンプル）', isSample: true, isReal: false },
  { id: 'sample-b', name: 'こつぶ食堂（サンプル）', isSample: true, isReal: false },
  { id: 'sample-c', name: 'まめまる工房（サンプル）', isSample: true, isReal: false },
  { id: 'sample-d', name: 'そよかぜファーム（サンプル）', isSample: true, isReal: false },
]

/** トップページ「メーカーから探す」に表示するメーカー */
export const FEATURED_MAKER_IDS = ['kewpie', 'wakodo', 'pigeon', 'beanstalk', 'morinaga', 'meiji', 'glico', 'tedemogu']

export const findMaker = (id: string) => MAKERS.find((m) => m.id === id)
export const labelOf = <T extends string>(list: Option<T>[], id: T | null | undefined) =>
  list.find((o) => o.id === id)?.label ?? ''
