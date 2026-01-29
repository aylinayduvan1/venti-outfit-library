import { Router } from "express";
import { getOutfits, createOutfit, deleteOutfit, updateOutfit } from "../controllers/outfitControllers";
import multer from "multer";

const router = Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});
const upload = multer({ storage });

router.get("/", getOutfits);
router.post("/", upload.single("image"), createOutfit);
router.delete('/:id', deleteOutfit)
router.put('/:id',upload.single('image'), updateOutfit);


export default router;
