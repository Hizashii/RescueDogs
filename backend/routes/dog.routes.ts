import { Router } from 'express';
import { createDogWithImage, getDogs } from '../controllers/dog.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { upload } from '../controllers/dog.controller';

const router = Router();

// This route handles the image upload and creation of a new dog record
router.post('/upload', authenticateJWT, upload.single('image'), createDogWithImage);

// Public route to fetch dogs
router.get('/', getDogs);

export default router;
