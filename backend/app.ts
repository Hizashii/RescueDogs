// app.ts
import 'dotenv/config'              // ← load .env first
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import mongoose from 'mongoose'
import { promises as dns } from 'dns'

import authRoutes           from './routes/auth.routes'
import blogRoutes           from './routes/blog.routes'
import dogRoutes            from './routes/dog.routes'
import reportRoutes         from './routes/report.routes'
import adminCharityRoutes   from './routes/admin/charityItem.routes'
import publicCharityRoutes  from './routes/public/charityItem.routes'

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ──────────────────────────────────────────────────────────────
// 5️⃣ Mount your routes
app.use('/api/auth',              authRoutes)
app.use('/api/admin/charity-items', adminCharityRoutes)
app.use('/api/charity-items',       publicCharityRoutes)
app.use('/api/dogs',               dogRoutes)
app.use('/api/reports',            reportRoutes)
app.use('/api/blogs',              blogRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ──────────────────────────────────────────────────────────────
// 6️⃣ Start the server on the correct port
const portNum = parseInt(PORT, 10)
app.listen(portNum, () => {
  console.log(`🚀  Backend listening on http://localhost:${portNum}`)
})
