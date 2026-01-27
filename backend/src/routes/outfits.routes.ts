import { Router } from 'express'
import { getAllOutfits, createOutfit } from '../controllers/outfitControllers'

const router = Router()

router.get('/', getAllOutfits)
router.post('/', createOutfit)

export default router
