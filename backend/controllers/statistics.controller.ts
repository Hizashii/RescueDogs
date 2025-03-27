import { Request, Response } from 'express';
import Dog from '../models/Dog';

export const getStatistics = async (req: Request, res: Response) => {
  try {
    // Group dogs by year (based on createdAt)
    const stats = await Dog.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
          total: { $sum: 1 },
          adopted: { $sum: { $cond: [ "$adopted", 1, 0 ] } }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Prepare data arrays for the frontend
    const years = stats.map(item => item._id);
    const adopted = stats.map(item => item.adopted);
    const received = stats.map(item => item.total);

    res.status(200).json({ years, adopted, received });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics.' });
  }
};
