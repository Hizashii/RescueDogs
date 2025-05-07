import { Router } from 'express'

import authRoutes   from './auth.routes'
import blogRoutes   from './blog.routes'
import dogRoutes    from './dog.routes'
import reportRoutes from './report.routes'

const router = Router()

router.use('/auth',       authRoutes)
router.use('/blog',       blogRoutes)
router.use('/dogs',       dogRoutes)
router.use('/reports',    reportRoutes)

export default router
