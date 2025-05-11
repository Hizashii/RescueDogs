import { Router } from 'express'
import {
  upload,
  createDogWithImage,
  getDogs,
  getDogById,
  getDogFilterOptions,
  updateDog
} from '../controllers/dog.controller'

const router = Router()

router.post('/upload', upload.single('image'), createDogWithImage)
router.get('/filters', getDogFilterOptions)
router.get('/',        getDogs)
router.get('/:id',     getDogById)
router.put(
  '/:id',
  upload.single('image'),
  updateDog
);
export default router
