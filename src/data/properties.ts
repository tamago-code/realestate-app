export type Property = {
  id: number
  name: string
  // 月額家賃(円)
  rent: number
  area: string
}

// 表示確認用のダミーデータ
export const properties: Property[] = [
  { id: 1, name: 'サンライズ渋谷', rent: 128000, area: '東京都渋谷区' },
  { id: 2, name: 'グリーンハイツ中野', rent: 89000, area: '東京都中野区' },
  { id: 3, name: 'メゾン吉祥寺', rent: 102000, area: '東京都武蔵野市' },
  { id: 4, name: 'パークサイド横浜', rent: 95000, area: '神奈川県横浜市' },
  { id: 5, name: 'リバーテラス大宮', rent: 76000, area: '埼玉県さいたま市' },
  { id: 6, name: 'ベイビュー幕張', rent: 83000, area: '千葉県千葉市' },
]
