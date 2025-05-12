// routes/charityItem.routes.ts
import { Router } from 'express'
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/charityItem.controller'

const router = Router()
router.get(   '/',    getAllItems)
router.post(  '/',    createItem)
router.put(   '/:id', updateItem)
router.delete('/:id', deleteItem)

export default router
