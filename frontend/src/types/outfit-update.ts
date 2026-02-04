export interface OutfitUpdateInput {
  id: string
  title: string
  description?: string
  categoryId: number
  image?: File | null
  isPublic:boolean
}