import { Request, Response } from 'express';
import { FilterDefinition } from '../models/FilterDefinition';

export const getFilters = async (req: Request, res: Response) => {
  const page = String(req.query.page || '');
  const defs = await FilterDefinition
    .find({ pages: page })
    .sort({ order: 1 })
    .lean();
  res.json(defs);
};

export const upsertFilter = async (req: Request, res: Response) => {
  const { key, label, type, options, pages, order } = req.body;
  const def = await FilterDefinition.findOneAndUpdate(
    { key },
    { label, type, options, pages, order },
    { upsert: true, new: true }
  );
  res.json(def);
};
