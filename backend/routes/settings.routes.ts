import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getSettings);
router.put('/', authenticateJWT, updateSettings);

export default router;
