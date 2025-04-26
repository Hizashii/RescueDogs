import { Router } from 'express'

import authRoutes   from './auth.routes'
import blogRoutes   from './blog.routes'
import dogRoutes    from './dog.routes'
import reportRoutes from './report.routes'
import settingsRoutes   from './settings.routes'
import statisticsRoutes from './statistics.routes'
import userRoutes       from './user.routes'

const router = Router()

router.use('/auth',       authRoutes)
router.use('/blog',       blogRoutes)
router.use('/dogs',       dogRoutes)
router.use('/reports',    reportRoutes)
router.use('/settings',   settingsRoutes)
router.use('/statistics', statisticsRoutes)
router.use('/users',      userRoutes)

export default router
