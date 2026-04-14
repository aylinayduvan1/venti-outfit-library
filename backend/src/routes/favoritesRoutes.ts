import express from "express";
import { toggleFavorite, getFavorites } from "../controllers/favoritesController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/:outfitId", authMiddleware, toggleFavorite);
router.get("/", authMiddleware, getFavorites);

export default router;