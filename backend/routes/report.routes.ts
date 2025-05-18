import { Router } from 'express'
import {
  getReports,
  createReport,
  getReportById,
  updateReportStatus,
  deleteReport
} from '../controllers/report.controller'

const router = Router()

//  ---------- public ----------
router.post('/', createReport)
router.get('/', getReports)

//  ---------- protected ----------
router.get('/:id', getReportById)
router.patch('/:id/status', updateReportStatus)
router.delete('/:id', deleteReport)

export default router
