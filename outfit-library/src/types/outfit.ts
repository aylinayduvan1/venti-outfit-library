export type OutfitCategory = 'office' | 'school' | 'daily'| 'sport';

export interface Outfit {
    id: number;
    title: string;
    category: OutfitCategory;
    categoryId:number;
    image : string;
}