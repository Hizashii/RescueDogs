// backend/app.ts
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import dotenv  from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes'

import dogRoutes    from './routes/dog.routes'
import reportRoutes from './routes/report.routes'

dotenv.config()

async function bootstrap() {
  // 1️⃣ Make sure you actually use the same env var name:
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌  MONGODB_URI is not set in .env')
    process.exit(1)
  }

  // 2️⃣ Connect to MongoDB
  await mongoose.connect(uri, { autoIndex: true })
  console.log('✅  MongoDB connected')

  // 3️⃣ Start Express
  const app = express()
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use('/api/auth', authRoutes)

  app.use('/api/dogs',    dogRoutes)
  app.use('/api/reports', reportRoutes)

  app.get('/health', (_req, res) => res.json({ status: 'ok' }))

  const port = Number(process.env.PORT) || 5000
  app.listen(port, () => {
    console.log(`🚀  Server running on http://localhost:${port}`)
  })
}

bootstrap().catch(err => {
  console.error('🔥  Startup error:', err)
  process.exit(1)
})
