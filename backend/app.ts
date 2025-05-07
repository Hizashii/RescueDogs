// backend/app.ts
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import dotenv  from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes'
import blogRoutes from './routes/blog.routes';
import dogRoutes    from './routes/dog.routes'
import reportRoutes from './routes/report.routes'
import adminCharityRoutes from './routes/admin/charityItem.routes'
import publicCharityRoutes from './routes/public/charityItem.routes'
import { promises as dns } from 'dns'

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
  app.use('/api/admin/charity-items', adminCharityRoutes)
  app.use('/api/charity-items',        publicCharityRoutes)
  app.use('/api/dogs',    dogRoutes)
  app.use('/api/reports', reportRoutes)
  app.use('/api/blogs', blogRoutes);

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
const _origResolveTxt = dns.resolveTxt.bind(dns)
dns.resolveTxt = async (hostname: string) => {
  try {
    return await _origResolveTxt(hostname)
  } catch (err: any) {
    if (err.code === 'ESERVFAIL') {
      // Return an empty array so the driver continues without TXT records
      return []
    }
    // Other errors bubble up normally
    throw err
  }
}
const app = express()
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
