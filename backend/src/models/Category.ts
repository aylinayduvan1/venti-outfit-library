import mongoose, { Schema } from 'mongoose'

export interface ICategory {
  name: string
  slug: string
  image?: string
  order?: number
  isActive: boolean
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: String,
  order: Number,
  isActive: { type: Boolean, default: true }
})

export const Category = mongoose.model<ICategory>(
  'Category',
  CategorySchema
)
