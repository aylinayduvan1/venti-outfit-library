import { Request, Response } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const outfitId = req.params.outfitId as string;
    
    if (!mongoose.Types.ObjectId.isValid(outfitId)) {
      return res.status(400).json({ message: "Invalid outfit id" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorites.some(
      (id) => id.toString() === outfitId
    );

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== outfitId
      );
    } else {
      user.favorites.push(outfitId as any);
    }

    await user.save();

    return res.json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
  const userId = (req as any).userId;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};