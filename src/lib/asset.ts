/** public/ 配下のファイルURL。GitHub Pages などサブパス配信でも正しく解決する */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
