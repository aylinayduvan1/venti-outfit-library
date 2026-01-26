import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Outfit Library API is running 🚀')
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is alive 🚀' })
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
