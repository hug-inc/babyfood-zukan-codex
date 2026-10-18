import type { AgeId, IngredientId, StorageId, TypeId } from './master'
import { asset } from '../lib/asset'

export interface Nutrition {
  energyKcal: number
  proteinG: number
  fatG: number
  carbG: number
  saltG: number
}

export interface Product {
  id: string
  name: string
  makerId: string
  /** 空配列 = 公式サイトで確認（情報未提供） */
  ages: AgeId[]
  type: TypeId | null
  ingredients: IngredientId[]
  /** 税込価格。null = 公式サイトで確認 */
  price: number | null
  storage: StorageId | null
  rawMaterials: string | null
  allergens: string[] | null
  nutrition: Nutrition | null
  contentAmount: string | null
  description: string
  isPR: boolean
  /** 架空のサンプル商品（デモデータ） */
  isSample: boolean
  /** 写真がある場合のパス。なければイラストで表示 */
  photo?: string
  photoAlt?: string
  publishedAt: string
  /** 過去30日間の商品詳細ページ閲覧数（デモ値） */
  views30d: number
  ecUrl: string
}

// てでもぐ公式ECのURL。正式なURLに差し替えてください
export const TEDEMOGU_OFFICIAL_URL = 'https://example.com/tedemogu'

/**
 * 掲載商品データ
 * - てでもぐ以外はすべて架空のサンプル商品（デモデータ）です
 * - てでもぐについては、提供されていない商品情報（価格・原材料・栄養成分等）は登録していません
 */
export const PRODUCTS: Product[] = [
  {
    id: 'tedemogu',
    name: 'てでもぐ（TEDEMOGU）',
    makerId: 'tedemogu',
    ages: [],
    type: null,
    ingredients: [],
    price: null,
    storage: null,
    rawMaterials: null,
    allergens: null,
    nutrition: null,
    contentAmount: null,
    description: '株式会社HUGの自社ブランドです。商品ラインナップ・価格・原材料などの詳細は公式サイトでご確認ください。',
    isPR: true,
    isSample: false,
    photo: asset('images/tedemogu-product.webp'),
    photoAlt: 'てでもぐの商品をお皿に盛り付けた様子',
    publishedAt: '2026-10-01',
    views30d: 0,
    ecUrl: TEDEMOGU_OFFICIAL_URL,
  },
  sample({
    id: 's-001', name: 'やさしい10倍がゆ', makerId: 'sample-a', ages: ['5-6'], type: 'retort', ingredients: ['rice'],
    price: 216, storage: 'room', rawMaterials: '米（国産）', allergens: [],
    nutrition: { energyKcal: 32, proteinG: 0.6, fatG: 0.1, carbG: 7.2, saltG: 0 }, contentAmount: '80g',
    description: 'お米だけで炊き上げた、なめらかな10倍がゆのサンプル商品です。', isPR: true, publishedAt: '2026-08-20', views30d: 4820,
  }),
  sample({
    id: 's-002', name: 'にんじんとかぼちゃのペースト', makerId: 'sample-b', ages: ['5-6', '7-8'], type: 'frozen', ingredients: ['vegetable'],
    price: 540, storage: 'frozen', rawMaterials: 'にんじん（国産）、かぼちゃ（国産）', allergens: [],
    nutrition: { energyKcal: 18, proteinG: 0.4, fatG: 0.1, carbG: 4.1, saltG: 0 }, contentAmount: '15g×8キューブ',
    description: '1回分ずつ使えるキューブ型の冷凍ペーストのサンプル商品です。', isPR: true, publishedAt: '2026-09-02', views30d: 3910,
  }),
  sample({
    id: 's-003', name: 'しらすと野菜のおやき', makerId: 'sample-c', ages: ['9-11', '12-18'], type: 'tezukami', ingredients: ['fish', 'vegetable', 'rice'],
    price: 680, storage: 'frozen', rawMaterials: '米粉、じゃがいも、にんじん、しらす、ほうれん草、食塩', allergens: [],
    nutrition: { energyKcal: 64, proteinG: 2.1, fatG: 0.8, carbG: 12.0, saltG: 0.1 }, contentAmount: '6個入',
    description: '小さな手でもにぎりやすいサイズのおやきのサンプル商品です。', isPR: true, publishedAt: '2026-09-10', views30d: 5230,
  }),
  sample({
    id: 's-004', name: 'とりささみと根菜の煮もの', makerId: 'sample-a', ages: ['9-11'], type: 'retort', ingredients: ['meat', 'vegetable'],
    price: 248, storage: 'room', rawMaterials: 'だいこん、にんじん、鶏ささみ、昆布だし', allergens: ['鶏肉'],
    nutrition: { energyKcal: 38, proteinG: 3.0, fatG: 0.3, carbG: 5.6, saltG: 0.2 }, contentAmount: '100g',
    description: 'やわらかく煮込んだ根菜とささみのサンプル商品です。', isPR: false, publishedAt: '2026-10-12', views30d: 1890,
  }),
  sample({
    id: 's-005', name: 'まぜまぜ白身魚フレーク', makerId: 'sample-d', ages: ['7-8', '9-11'], type: 'freezedry', ingredients: ['fish'],
    price: 380, storage: 'room', rawMaterials: 'たら、昆布だし', allergens: [],
    nutrition: { energyKcal: 14, proteinG: 2.9, fatG: 0.1, carbG: 0.2, saltG: 0.1 }, contentAmount: '2.5g×6袋',
    description: 'お湯で戻すだけの白身魚フレークのサンプル商品です。', isPR: false, publishedAt: '2026-10-10', views30d: 2410,
  }),
  sample({
    id: 's-006', name: 'りんごとさつまいものボーロ', makerId: 'sample-b', ages: ['9-11', '12-18'], type: 'snack', ingredients: ['fruit', 'vegetable'],
    price: 180, storage: 'room', rawMaterials: 'じゃがいもでん粉、さつまいも、りんご果汁', allergens: ['りんご'],
    nutrition: { energyKcal: 58, proteinG: 0.2, fatG: 0.1, carbG: 14.1, saltG: 0 }, contentAmount: '15g',
    description: '口の中でほどける小さなボーロのサンプル商品です。', isPR: false, publishedAt: '2026-10-08', views30d: 6120,
  }),
  sample({
    id: 's-007', name: 'ひよこ豆と野菜のトマト煮', makerId: 'sample-c', ages: ['12-18', '18plus'], type: 'retort', ingredients: ['beans', 'vegetable'],
    price: 298, storage: 'room', rawMaterials: 'トマト、ひよこ豆、たまねぎ、にんじん、食塩', allergens: [],
    nutrition: { energyKcal: 52, proteinG: 2.3, fatG: 0.5, carbG: 9.4, saltG: 0.3 }, contentAmount: '100g',
    description: '豆と野菜をトマトで煮込んだサンプル商品です。', isPR: false, publishedAt: '2026-10-05', views30d: 3020,
  }),
  sample({
    id: 's-008', name: 'ミニ牛そぼろごはん', makerId: 'sample-d', ages: ['12-18', '18plus'], type: 'frozen', ingredients: ['meat', 'rice', 'vegetable'],
    price: 720, storage: 'frozen', rawMaterials: '米、牛肉、にんじん、たまねぎ、しょうゆ（大豆・小麦を含む）', allergens: ['牛肉', '大豆', '小麦'],
    nutrition: { energyKcal: 145, proteinG: 5.2, fatG: 3.1, carbG: 23.8, saltG: 0.4 }, contentAmount: '120g',
    description: 'レンジで温めるだけのそぼろごはんのサンプル商品です。', isPR: false, publishedAt: '2026-10-14', views30d: 2780,
  }),
  sample({
    id: 's-009', name: 'バナナとりんごのとろとろピューレ', makerId: 'sample-a', ages: ['5-6', '7-8'], type: 'retort', ingredients: ['fruit'],
    price: 162, storage: 'room', rawMaterials: 'バナナ、りんご', allergens: ['バナナ', 'りんご'],
    nutrition: { energyKcal: 42, proteinG: 0.4, fatG: 0.1, carbG: 10.3, saltG: 0 }, contentAmount: '70g',
    description: 'くだもの2種のなめらかピューレのサンプル商品です。', isPR: false, publishedAt: '2026-09-28', views30d: 4410,
  }),
  sample({
    id: 's-010', name: 'きなこと米粉のスティック', makerId: 'sample-c', ages: ['9-11', '12-18'], type: 'tezukami', ingredients: ['rice', 'beans'],
    price: 450, storage: 'frozen', rawMaterials: '米粉、きなこ（大豆を含む）、てんさい糖', allergens: ['大豆'],
    nutrition: { energyKcal: 72, proteinG: 1.8, fatG: 1.0, carbG: 13.9, saltG: 0 }, contentAmount: '8本入',
    description: '持ちやすいスティック型のサンプル商品です。', isPR: false, publishedAt: '2026-10-16', views30d: 1530,
  }),
  sample({
    id: 's-011', name: 'ほうれん草のフリーズドライキューブ', makerId: 'sample-d', ages: ['7-8', '9-11'], type: 'freezedry', ingredients: ['vegetable'],
    price: 330, storage: 'room', rawMaterials: 'ほうれん草（国産）', allergens: [],
    nutrition: { energyKcal: 6, proteinG: 0.6, fatG: 0.1, carbG: 0.9, saltG: 0 }, contentAmount: '1.5g×10個',
    description: 'お湯で溶かして使える野菜キューブのサンプル商品です。', isPR: false, publishedAt: '2026-09-15', views30d: 2150,
  }),
  sample({
    id: 's-012', name: 'さけと野菜の和風リゾット', makerId: 'sample-b', ages: ['9-11', '12-18'], type: 'retort', ingredients: ['fish', 'rice', 'vegetable'],
    price: 410, storage: 'chilled', rawMaterials: '米、さけ、にんじん、だいこん、昆布だし', allergens: ['さけ'],
    nutrition: { energyKcal: 88, proteinG: 3.6, fatG: 1.2, carbG: 15.6, saltG: 0.3 }, contentAmount: '110g',
    description: '冷蔵で届く和風リゾットのサンプル商品です。', isPR: false, publishedAt: '2026-10-15', views30d: 980,
  }),
  sample({
    id: 's-013', name: 'いちごヨーグルト風ドロップ', makerId: 'sample-a', ages: ['12-18', '18plus'], type: 'snack', ingredients: ['fruit'],
    price: 260, storage: 'room', rawMaterials: 'いちご、乳製品、でん粉', allergens: ['乳'],
    nutrition: { energyKcal: 54, proteinG: 0.9, fatG: 0.6, carbG: 11.2, saltG: 0 }, contentAmount: '18g',
    description: '口どけのよいドロップ型おやつのサンプル商品です。', isPR: false, publishedAt: '2026-09-05', views30d: 3560,
  }),
  sample({
    id: 's-014', name: 'とうふハンバーグ（幼児向け）', makerId: 'sample-c', ages: ['18plus'], type: 'frozen', ingredients: ['beans', 'meat', 'vegetable'],
    price: 860, storage: 'frozen', rawMaterials: '豆腐（大豆を含む）、鶏ひき肉、たまねぎ、パン粉（小麦を含む）', allergens: ['大豆', '鶏肉', '小麦'],
    nutrition: { energyKcal: 96, proteinG: 6.4, fatG: 4.2, carbG: 7.9, saltG: 0.4 }, contentAmount: '4個入',
    description: 'ふんわり食感の豆腐ハンバーグのサンプル商品です。', isPR: false, publishedAt: '2026-08-30', views30d: 2670,
  }),
]

type SampleInput = Omit<Product, 'isSample' | 'ecUrl'>

/** サンプル商品の共通項目を補完する */
function sample(p: SampleInput): Product {
  return {
    ...p,
    isSample: true,
    ecUrl: `https://example.com/demo-ec/${p.id}`,
  }
}

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id)
