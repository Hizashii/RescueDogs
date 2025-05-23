import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import mongoose from 'mongoose'
import { promises as dns } from 'dns'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import sharp from 'sharp';
import fs from 'fs/promises';

import authRoutes    from './routes/auth.routes'
import blogRoutes    from './routes/blog.routes'
import dogRoutes     from './routes/dog.routes'
import reportRoutes  from './routes/report.routes'
import filterRoutes  from './routes/filterRoutes'
import charityRoutes from './routes/charityItem.routes'
import paymentsRoutes from './routes/payments.routes';
import { authenticateJWT } from './middlewares/auth.middleware'

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
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000', 
      'http://localhost:3001',
      'https://rescuedogs.onrender.com'
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Serve static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// one is for the backend, one is for the frontend
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ──────────────────────────────────────────────────────────────
// 5️⃣ Set up Multer for handling multipart/form-data (images)
// Configure Multer to store files in memory so sharp can access the buffer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed') as any, false);
    }
  }
});

// Single-file upload endpoint
app.post(
  '/api/upload',
  upload.single('image'),
  async (req, res) => { // Make the route handler async
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' })
    }

    const uploadDir = path.join(__dirname, 'uploads');
    const filename = `${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join(uploadDir, filename);

    try {
      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Process and resize the image using sharp
      await sharp(req.file.buffer)
        .resize(100, 100, { // Resize to 100x100 pixels
          fit: sharp.fit.cover, // Use 'cover' to maintain aspect ratio and cover the area
          withoutEnlargement: true // Do not enlarge images smaller than 100x100
        })
        .toFormat('jpeg', { quality: 80 }) // Convert to jpeg with 80% quality
        .toFile(outputPath); // Save the processed image to the uploads directory

      // Return the public URL for the uploaded image
      res.json({ path: `/uploads/${filename}` });
    } catch (error) {
      console.error('Error processing or saving image:', error);
      res.status(500).json({ message: 'Failed to process and save image.' });
    }
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
app.use('/api/payments',       paymentsRoutes);

// Protected routes
app.use('/api/auth/profile', authenticateJWT, authRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ──────────────────────────────────────────────────────────────
// 7️⃣ Start the server on the correct port
const portNum = parseInt(PORT, 10)
app.listen(portNum, () => {
  console.log(`🚀  Backend listening on http://localhost:${portNum}`)
})
