import { Request, Response } from 'express'
import { Outfit } from '../models/Outfit'
import { Category } from '../models/Category'
import { Tags } from '../models/Tags'

export const getOutfits = async (req: Request, res: Response) => {
  try {
    const filter: any = {}

    if (req.query.category) {
      filter.category = req.query.category
    }

    if (req.query.public) {
      filter.isPublic = true
    }

    const outfits = await Outfit.find(filter)
      .populate('category')
      .populate('tags')
      .sort({ createdAt: -1 })

    res.json(outfits)
  } catch (err) {
    res.status(500).json({ error: 'Veriler alınamadı' })
  }
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-'); 
}

export const createOutfit = async (req: Request, res: Response) => {
  try {
    const { title, description, category, tags, isPublic, ownerId } = req.body;
    if (!req.file) return res.status(400).json({ message: "Görsel gerekli" });

    const categoryExists = await Category.findById(category)
      if (!categoryExists) {
        return res.status(400).json({ message: 'Geçersiz kategori' })
    }

    const parsedTags: { id: string; name: string }[] = tags ? JSON.parse(tags) : [];

    const tagIds: string[] = [];

    for (const tag of parsedTags) {
    const isValidId = /^[0-9a-fA-F]{24}$/.test(tag.id);
    if (isValidId) {
      tagIds.push(tag.id);
      } else {
        const newTag = await Tags.create({
          name: tag.name,
          slug: generateSlug(tag.name),
        });
        tagIds.push(newTag._id.toString());
      }
    }

    const newOutfit = new Outfit({
      title,
      description,
      category,
      tags: tagIds,
      image: `/uploads/${req.file.filename}`,
      isPublic: isPublic === 'true',
      ownerId: 'aylin123' //  geçici
    });

    const saved = await newOutfit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err });
  }
};

export const deleteOutfit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedOutfit = await Outfit.findByIdAndDelete(id)
    if (!deletedOutfit) {
      return res.status(404).json({
        message: 'Outfit bulunamadı',
      })
    }
    res.json({
      success: true,
      deletedId: id,
    })
  } catch (error) {
    console.error('Delete outfit error:', error)
    res.status(500).json({
      message: 'Outfit silinirken hata oluştu',
    })
  }
}

export const updateOutfit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, category, tags, isPublic } = req.body

    const parsedTags = tags ? JSON.parse(tags) : []

    const tagIds: string[] = []

    for (const tag of parsedTags) {
      const isValidId = /^[0-9a-fA-F]{24}$/.test(tag.id)

      if (isValidId) {
        tagIds.push(tag.id)
      } else {
        const newTag = await Tags.create({
          name: tag.name,
          slug: tag.name.toLowerCase().replace(/\s+/g, '-')
        })
        tagIds.push(newTag._id.toString())
      }
    }

    const updateData: any = {
      title,
      description,
      tags: tagIds, // 🔥 artık ObjectId array
      isPublic: isPublic === 'true',
    }

    if (category) {
      const categoryExists = await Category.findById(category)
      if (!categoryExists) {
        return res.status(400).json({ message: 'Geçersiz kategori' })
      }
      updateData.category = category
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    const updatedOutfit = await Outfit.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate('category')
      .populate('tags')

    if (!updatedOutfit) {
      return res.status(404).json({ message: 'Outfit bulunamadı' })
    }

    res.json(updatedOutfit)

  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err })
  }
}


export const getMyOutfits = async (req: Request, res:Response) => {
    try {
      // ŞİMDİLİK FAKE USER
      const ownerId = 'aylin123'

      const outfits = await Outfit.find({ ownerId })
      .populate('category')
      .populate('tags')
      .sort({ createdAt: -1 })

      res.json(outfits)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch my outfits' })
    }
}

