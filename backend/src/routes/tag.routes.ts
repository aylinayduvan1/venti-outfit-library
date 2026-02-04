import { Router } from 'express';
import { createTags, getTags } from '../controllers/tag.controller';

const router = Router();

router.get('/', getTags);
router.post('/', createTags)

export default router;
