import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import path    from 'path'
import mongoose from 'mongoose'
import { promises as dns } from 'dns'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary';

import authRoutes    from './routes/auth.routes'
import blogRoutes    from './routes/blog.routes'
import dogRoutes     from './routes/dog.routes'
import reportRoutes  from './routes/report.routes'
import filterRoutes  from './routes/filterRoutes'
import charityRoutes from './routes/charityItem.routes'
import paymentsRoutes from './routes/payments.routes';
import { authenticateJWT } from './middlewares/auth.middleware'

// ──────────────────────────────────────────────────────────────
// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true // Use secure URLs (https)
});

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
      'https://rescuedogs.onrender.com',
      'https://admin-panel-xvoi.onrender.com',
      'https://mancsmentoallatvedok.onrender.com'
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

// Serve static uploads folder - No longer needed with Cloudinary for user uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ──────────────────────────────────────────────────────────────
// 5️⃣ Set up Multer for handling multipart/form-data (images)
// Configure Multer to store files in memory so cloudinary can access the buffer
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

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        { 
          folder: 'rescuedogs', // Optional: specify a folder in Cloudinary
          transformation: [ // Optional: apply transformations on upload
            { width: 400, height: 400, crop: 'fill' }, // Set exact dimensions
            { quality: 'auto:good' }, // Ensure good quality
            { fetch_format: 'auto' } // Auto format for best compression
          ]
        }
      );

      // Return the secure Cloudinary URL
      res.json({ path: result.secure_url });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ message: 'Failed to upload image to Cloudinary.' });
    }
  }
)

// ──────────────────────────────────────────────────────────────
// 6️⃣ Mount your routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/dogs', dogRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/filters', filterRoutes)
app.use('/api/charityitems', charityRoutes)
app.use('/api/payments', paymentsRoutes)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ──────────────────────────────────────────────────────────────
// 7️⃣ Start the server on the correct port
const portNum = parseInt(PORT, 10)
app.listen(portNum, '0.0.0.0', () => {
  console.log(`🚀  Backend listening on http://0.0.0.0:${portNum}`)
})
