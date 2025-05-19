import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import mongoose from 'mongoose'
import { promises as dns } from 'dns'
import multer from 'multer'

import authRoutes    from './routes/auth.routes'
import blogRoutes    from './routes/blog.routes'
import dogRoutes     from './routes/dog.routes'
import reportRoutes  from './routes/report.routes'
import filterRoutes  from './routes/filterRoutes'
import charityRoutes from './routes/charityItem.routes'

// ──────────────────────────────────────────────────────────────
// 1️⃣ Monkey-patch the DNS TXT lookup to suppress ESERVFAIL
const _origResolveTxt = dns.resolveTxt.bind(dns)
dns.resolveTxt = async (hostname: string) => {
  try {
    return await _origResolveTxt(hostname)
  } catch (err: any) {
    if (err.code === 'ESERVFAIL') return []
    throw err
  }
}

// ──────────────────────────────────────────────────────────────
// 2️⃣ Read & validate env vars
const { MONGODB_URI, PORT = '5000' } = process.env
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env')
  process.exit(1)
}

// ──────────────────────────────────────────────────────────────
// 3️⃣ Connect to MongoDB
mongoose.connect(MONGODB_URI, { autoIndex: true })
  .then(() => console.log('✅  MongoDB connected'))
  .catch(err => {
    console.error('🔥  MongoDB connection error:', err)
    process.exit(1)
  })

// ──────────────────────────────────────────────────────────────
// 4️⃣ Create & configure Express
const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// one is for the backend, one is for the frontend
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ──────────────────────────────────────────────────────────────
// 5️⃣ Set up Multer for handling multipart/form-data (images)
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, path.join(__dirname, 'uploads'))
    },
    filename: (_, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`
      cb(null, uniqueName)
    }
  })
})

// Single-file upload endpoint
app.post(
  '/api/upload',
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' })
    }
    // Return the public URL for the uploaded image
    res.json({ path: `/uploads/${req.file.filename}` })
  }
)

// ──────────────────────────────────────────────────────────────
// 6️⃣ Mount your routes
app.use('/api/auth',           authRoutes)
app.use('/api/dogs',           dogRoutes)
app.use('/api/reports',        reportRoutes)
app.use('/api/blogs',          blogRoutes)
app.use('/api',                filterRoutes)
app.use('/api/CharityItems',   charityRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ──────────────────────────────────────────────────────────────
// 7️⃣ Start the server on the correct port
const portNum = parseInt(PORT, 10)
app.listen(portNum, () => {
  console.log(`🚀  Backend listening on http://localhost:${portNum}`)
})
