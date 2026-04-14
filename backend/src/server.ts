import  dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import outfitRoutes from "./routes/outfits.routes";
import path from "path";
import categoryRoutes from "./routes/categoryRoutes";
import getTags from './routes/tag.routes'
import authRoutes from './routes/auth.routes'
import favoritesRoutes from "./routes/favoritesRoutes";


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/outfitDB";
app.use(cors());
app.use(express.json());
// Uploads klasörünü static servis et
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/outfits", outfitRoutes);
app.use('/categories', categoryRoutes)
app.use('/tags', getTags )
app.use('/auth', authRoutes)
app.use("/favorites", favoritesRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
