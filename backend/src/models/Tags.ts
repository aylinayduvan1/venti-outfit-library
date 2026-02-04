import { Schema, model, Document } from 'mongoose';

export interface Tag extends Document {
  name: string;
  slug: string;
  isActive: boolean;
}

const TagSchema = new Schema<Tag>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
});

export const Tags= model<Tag>('Tag', TagSchema);
