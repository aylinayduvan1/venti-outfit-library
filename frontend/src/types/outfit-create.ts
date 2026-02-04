export interface OutfitCreateInput {
  title: string
  description?: string
  categoryId: string
  tags: string[]
  image: File | null  
  isPublic:boolean
  ownerId:string 
}
