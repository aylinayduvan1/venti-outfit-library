import type { Category } from "./categories"
import type { Tag } from "./tag"
import type {Owner} from './owner'

export interface Outfit {
  _id: string
  title: string
  description?: string
  image: string
  tags?: Tag[]
  isPublic: boolean
  owner: Owner
  category: Category
}
