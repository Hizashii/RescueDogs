import { Request, Response } from 'express'
import CharityItem, { ICharityItem } from '../models/CharityItem'

// GET /api/admin/charity-items
export const listItems = async (_req: Request, res: Response) => {
  const items = await CharityItem.find().sort({ createdAt: -1 })
  res.json(items)
}

// POST /api/admin/charity-items
export const createItem = async (req: Request, res: Response) => {
  const { name, price, description, imageUrl } = req.body as Partial<ICharityItem>
  const newItem = await CharityItem.create({ name, price, description, imageUrl })
  res.status(201).json(newItem)
}

// PUT /api/admin/charity-items/:id
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params
  const updated = await CharityItem.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) return res.status(404).json({ message: 'Not found' })
  res.json(updated)
}

// DELETE /api/admin/charity-items/:id
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params
  await CharityItem.findByIdAndDelete(id)
  res.status(204).end()
}
