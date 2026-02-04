import mongoose, { Schema } from 'mongoose'

export type OutfitCategory =
  | 'office'
  | 'school'
  | 'daily'
  | 'sport'
  | 'night'

export interface IOutfit {
  title: string
  description?: string
  category: OutfitCategory
  categoryId: number
  image: string
  tags?: string[]
  ownerId: string
  isPublic: boolean
}

const OutfitSchema = new Schema<IOutfit>(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ['office', 'school', 'daily', 'sport', 'night'],
      required: true
    },
    categoryId: { type: Number, required: true },
    image: { type: String, required: true },
    tags: [String],
    ownerId: { type: String, required: true },
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Outfit = mongoose.model<IOutfit>('Outfit', OutfitSchema)