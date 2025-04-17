import { Router } from 'express'
import {
  getReports,
  createReport,
  getReportById,
  updateReportStatus
} from '../controllers/report.controller'
import { authenticateJWT } from '../middlewares/auth.middleware'

const router = Router()

//  ---------- public ----------
router.post('/', createReport)
router.get('/', getReports)

//  ---------- protected ----------
router.get('/',           authenticateJWT, getReports)
router.get('/:id',        authenticateJWT, getReportById)
router.patch('/:id/status', authenticateJWT, updateReportStatus)

export default router       
