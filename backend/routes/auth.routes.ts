// backend/routes/auth.routes.ts
import { Router } from 'express'
import { login, profile } from '../controllers/auth.controller'
import { authenticateJWT } from '../middlewares/auth.middleware'

const router = Router()
router.post('/login', login)                         // public    :contentReference[oaicite:1]{index=1}
router.get('/profile', authenticateJWT, profile)     // protected :contentReference[oaicite:2]{index=2}
export default router
