export interface OutfitCreateInput {
  title: string
  description?: string
  categoryId: number
  image: File | null  
  isPublic:boolean
  ownerId:string 
}
