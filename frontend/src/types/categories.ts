import type { OutfitCategory } from './outfit'

export interface Category {
  id: number
  key?: OutfitCategory
  label: string
  image: string
}

export interface AllCategory {
  id: 999
  label: 'Hepsi'
  image: string
}
