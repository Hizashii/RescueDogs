import { Router } from 'express'
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/charityItem.controller'
import CharityItem from '../models/CharityItem'

const router = Router()
router.get(   '/',    getAllItems)
router.post(  '/',    createItem)
router.put(   '/:id', updateItem)
router.delete('/:id', deleteItem)

// Temporary endpoint to fix image URLs
router.post('/fix-urls', async (req, res) => {
  try {
    const items = await CharityItem.find({});
    for (const item of items) {
      if (item.imageUrl) {
        // Extract just the path part from the URL
        const url = new URL(item.imageUrl);
        item.imageUrl = url.pathname;
        await item.save();
      }
    }
    res.json({ message: 'Image URLs have been updated to use relative paths' });
  } catch (error) {
    console.error('Error updating image URLs:', error);
    res.status(500).json({ error: 'Failed to update image URLs' });
  }
});

export default router
