import { Router } from 'express'
import { createDogWithImage, getDogs, getDogById, upload } from '../controllers/dog.controller'

const router = Router()

router.post('/upload', upload.single('image'), createDogWithImage)
router.get('/',        getDogs)
router.get('/:id',     getDogById)

export default router
