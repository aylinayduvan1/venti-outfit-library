import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import outfitRoutes from './routes/outfits.routes'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

const MONGO_URI = 'mongodb://127.0.0.1:27017/outfitDB'

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/outfits', outfitRoutes)

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend çalışıyor 🚀' })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
