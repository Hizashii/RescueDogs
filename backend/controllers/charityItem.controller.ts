import { Request, Response } from 'express'
import CharityItem from '../models/CharityItem'

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const query: any = {};
    const { page = 1, limit = 10, sortBy = 'name', sortDirection = 'asc', isActive, category, name } = req.query;

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    if (category) {
      query.category = category;
    }
    if (name) {
      query.name = new RegExp(String(name), 'i');
    }

    const sort: any = {};
    sort[sortBy as string] = sortDirection === 'asc' ? 1 : -1;

    const total = await CharityItem.countDocuments(query);

    const items = await CharityItem.find(query)
      .sort(sort)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string))
      .lean();

    res.status(200).json({
      items,
      total,
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Error fetching charity items:', error);
    res.status(500).json({ error: 'Failed to fetch charity items.' });
  }
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
