import { Request, Response } from 'express'
import { Category } from '../models/Category'


export const createCategory = async (req: Request, res:Response) => {
  const category = await Category.create(req.body)
  res.status(201).json(category)
}

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })

    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Kategoriler alınamadı' })
  }
}