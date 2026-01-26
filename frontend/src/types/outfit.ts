export type OutfitCategory = 'office' | 'school' | 'daily'| 'sport' | 'night';

export interface Outfit {
     id: number;
  title: string;
  description?: string;   // ✅ opsiyonel
  category: OutfitCategory;
  categoryId: number;
  image: string;
  tags?: string[];
  createdAt?: string;
}