import { Request, Response } from 'express'
import { Outfit } from '../models/Outfit'

export const getOutfits = async (req: Request, res: Response) => {
  try {
    const outfits = await Outfit.find()
    res.json(outfits)
  } catch (err) {
    res.status(500).json({ error: 'Veriler alınamadı' })
  }
}

export const createOutfit = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, tags } = req.body;
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });

    // categoryId'ye göre category stringini belirle
    const categoriesMap: { [key: number]: string } = {
      1: 'school',
      2: 'office',
      3: 'daily',
      4: 'sport',
      5: 'night'
    };

    const category = categoriesMap[Number(categoryId)];
    if (!category) return res.status(400).json({ message: "Geçersiz categoryId" });

    const newOutfit = new Outfit({
      title,
      description,
      category,
      categoryId: Number(categoryId),
      tags: tags ? JSON.parse(tags) : [],
      image: `/uploads/${req.file.filename}`,
    });

    const saved = await newOutfit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err });
  }
};


