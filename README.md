# 離乳食ずかん（デモ）

React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + React Router 6

## コマンド

```bash
pnpm install
pnpm dev        # 開発サーバー
pnpm typecheck  # 型チェック
pnpm test       # 単体テスト（vitest）
pnpm build      # 本番ビルド（tsc -b && vite build）
pnpm build:pages # GitHub Pages用ビルド（/babyfood-zukan-codex/ 配下で配信）
```

## 公開URL

https://hug-inc.github.io/babyfood-zukan-codex/ （Codex版・gh-pagesブランチから配信）

Claude版（`babyfood-zukan`）とは別リポジトリ・別URLで管理します。

## 画面

| パス | 内容 |
| --- | --- |
| `/` | トップページ |
| `/search?age=&type=&ingredient=&maker=&price=&storage=&sort=` | 商品検索一覧 |
| `/products/:id` | 商品詳細 |
| `/compare` | 商品比較（最大3件） |
| `/articles/:id` | お役立ち記事 |
| `/admin` | メーカー管理画面（デモ。任意の値 or「デモアカウントでログイン」） |

## データ方針

- `src/data/products.ts`：てでもぐ以外はすべて架空のサンプル商品（`isSample: true`）
- てでもぐは未提供の情報（価格・原材料・アレルゲン・栄養成分・対象月齢など）を登録せず「公式サイトでご確認ください」と表示
- 実在メーカー名は `src/data/master.ts` の `MAKERS`（「メーカーから探す」一覧）にのみ使用し、商品は登録しない
- 公式ECのURLはデモ用に `example.com` を使用。てでもぐの正式URLは `TEDEMOGU_OFFICIAL_URL` を差し替えてください
- 比較リスト・管理画面の入力内容は localStorage に保存（デモ用）
