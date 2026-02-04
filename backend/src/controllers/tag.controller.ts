import { Request, Response } from 'express';
import { Tags } from '../models/Tags';

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tags.find({ isActive: true }).sort({ name: 1 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Tagler alınamadı', error: err });
  }
};

export const createTags = async (req: Request, res:Response) => {
  const tags = await Tags.create(req.body)
  res.status(201).json(tags)
}
