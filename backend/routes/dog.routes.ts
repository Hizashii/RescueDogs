import { Router } from 'express'
import {
  // upload, // Removed as frontend uploads separately
  createDogWithImage,
  getDogs,
  getDogById,
  getDogFilterOptions,
  updateDog,
  getBreeds
} from '../controllers/dog.controller'

const router = Router()

// The image upload is now handled by the /api/upload endpoint in app.ts
// This route will now handle creating the dog record with the image URL
router.post('/upload', createDogWithImage)
router.get('/filters', getDogFilterOptions)
router.get('/',        getDogs)
router.get('/:id',     getDogById)
router.put(
  '/:id',
  // upload.single('image'), // Removed as frontend uploads separately
  updateDog
);
router.get('/breeds', getBreeds);
export default router
