import type { Category } from "./categories"
import type { Tag } from "./tag"

export interface Outfit {
  _id: string
  title: string
  description?: string
  image: string
  tags?: Tag[]
  isPublic: boolean
  ownerId: string
  category: Category
}
