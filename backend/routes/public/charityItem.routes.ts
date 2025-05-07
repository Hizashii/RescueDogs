import { Router } from 'express'
import CharityItem from '../../models/CharityItem'

const router = Router()

// GET /api/charity-items
router.get('/', async (_req, res) => {
  const items = await CharityItem.find({ isActive: true }).sort({ createdAt: -1 })
  res.json(items)
})

// GET /api/charity-items/:id
router.get('/:id', async (req, res) => {
  const item = await CharityItem.findById(req.params.id)
  if (!item || !item.isActive) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

export default router
