import { Request, Response } from 'express'
import CharityItem from '../models/CharityItem'

export const getAllItems = async (req: Request, res: Response) => {
  const items = await CharityItem.find().lean()
  res.json(items)
}

export const createItem = async (req: Request, res: Response) => {
  const newItem = await CharityItem.create(req.body)
  res.json(newItem)
}

export const updateItem = async (req: Request, res: Response) => {
  const updated = await CharityItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
}

export const deleteItem = async (req: Request, res: Response) => {
  await CharityItem.findByIdAndDelete(req.params.id)
  res.sendStatus(204)
}
