import mongoose from 'mongoose'

export type OutfitCategory = 'office' | 'school' | 'daily' | 'sport' | 'night'

export interface IOutfit extends mongoose.Document {
  title: string
  description?: string
  category: OutfitCategory
  categoryId: number
  image: string
  tags?: string[]
  createdAt?: Date
}

const OutfitSchema = new mongoose.Schema<IOutfit>({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  categoryId: { type: Number, required: true },
  image: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
})

export const Outfit = mongoose.model<IOutfit>('Outfit', OutfitSchema)
