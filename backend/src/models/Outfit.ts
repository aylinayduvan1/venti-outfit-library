import mongoose, { Schema, Types } from 'mongoose'

export interface IOutfit {
  title: string
  description?: string
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
  image: string
  tags: Types.ObjectId[]
  owner: Types.ObjectId
,  isPublic: boolean
}

const OutfitSchema = new Schema<IOutfit>(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    image: { type: String, required: true },
    tags: [{type: Schema.Types.ObjectId, ref:'Tag'}],
    owner: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
    isPublic: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Outfit = mongoose.model<IOutfit>('Outfit', OutfitSchema)