import { Request, Response } from 'express'
import { Outfit } from '../models/Outfit'

export const getAllOutfits = async (req: Request, res: Response) => {
  try {
    const outfits = await Outfit.find()
    res.json(outfits)
  } catch (err) {
    res.status(500).json({ error: 'Veriler alınamadı' })
  }
}

export const createOutfit = async (req: Request, res: Response) => {
  try {
    const { title, description, category, categoryId, image, tags } = req.body

    if (!title || !category || !categoryId || !image) {
      return res.status(400).json({ error: 'Eksik alan var' })
    }

    const newOutfit = new Outfit({
      title,
      description,
      category,
      categoryId,
      image,
      tags,
      createdAt: new Date()
    });
    
    const saved = await newOutfit.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: 'Kombin eklenemedi' })
  }
}
