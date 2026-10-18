import { asset } from '../lib/asset'

export interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  image: string
  alt: string
  body: string[]
}

export const ARTICLES: Article[] = [
  {
    id: 'how-to-start',
    category: '離乳食の進め方',
    title: '離乳食はいつから？月齢ごとの進め方とベビーフードの上手な取り入れ方',
    excerpt: 'はじめての離乳食で迷いやすいポイントを、月齢の目安とあわせて整理しました。',
    image: asset('images/article-start.webp'),
    alt: 'トレーに並んだ離乳食の前に座る赤ちゃん',
    body: [
      '離乳食をはじめる時期や進め方は、赤ちゃんの発達や体調によって一人ひとり異なります。月齢はあくまで目安として、お子さまの様子を見ながら進めましょう。',
      'ベビーフードは、忙しい日や外出時、新しい食材を試すときの選択肢として取り入れやすいのが特長です。対象月齢や原材料表示を確認して選びましょう。',
      '食物アレルギーや発育に関して不安がある場合は、かかりつけの医師や自治体の相談窓口にご相談ください。',
    ],
  },
  {
    id: 'tezukami',
    category: '手づかみ食べ',
    title: '手づかみ食べはいつから？はじめどきのサインと食べやすい形のポイント',
    excerpt: '自分で食べたい気持ちを応援する、手づかみ食べの準備と工夫を紹介します。',
    image: asset('images/article-tezukami.webp'),
    alt: '小さな手で手づかみ食べ用のおやきを持つ赤ちゃん',
    body: [
      '手づかみ食べは、食べ物を目で見て、手でつかみ、口に運ぶという一連の動きを練習する大切なステップです。',
      'にぎりやすいスティック状や平たい形、歯ぐきでつぶせるやわらかさを意識すると、赤ちゃんが食べやすくなります。',
      '食事中は必ず大人がそばで見守り、誤嚥や窒息に注意しましょう。',
    ],
  },
  {
    id: 'frozen-guide',
    category: '冷凍離乳食の選び方',
    title: '冷凍離乳食の選び方｜保存・解凍のコツと比較するときのチェックポイント',
    excerpt: 'ストックしやすい冷凍離乳食を選ぶときに見ておきたいポイントをまとめました。',
    image: asset('images/article-frozen.webp'),
    alt: '冷凍庫から小分けの離乳食を取り出すママと赤ちゃん',
    body: [
      '冷凍離乳食は、まとめて購入してストックできる点が魅力です。冷凍庫のスペースや1回あたりの量を確認しておくと安心です。',
      '比較するときは、対象月齢・原材料・アレルゲン表示・解凍方法・賞味期限をチェックしましょう。',
      '解凍後は再冷凍せず、表示された方法と期限を守ってお使いください。',
    ],
  },
]

export const findArticle = (id: string) => ARTICLES.find((a) => a.id === id)
