import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { User } from "../models/User";
import { createUser, loginUser } from "../controllers/userController";


const router = Router();

router.post('/register', createUser)
router.post('/login', loginUser)

// /auth/me
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = (req as any).userId; // middleware’de koyduğumuz userId
  try {
    const user = await User.findById(userId).select("-password"); // password göndermiyoruz
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;