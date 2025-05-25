import { Router } from 'express'
import { login, logout, getProfile } from '../controllers/auth.controller'
import { authenticateJWT } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authenticateJWT, getProfile)

export default router
