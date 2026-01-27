export type OutfitCategory = 'office' | 'school' | 'daily'| 'sport' | 'night';

export interface Outfit {
  _id: string;
  title: string;
  description?: string;   // ✅ opsiyonel
  category: OutfitCategory;
  categoryId: number;
  image: string;
  tags?: string[];
  createdAt?: string;
}