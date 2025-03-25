import { Router } from 'express';
import { getStatistics } from '../controllers/statistics.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getStatistics);

export default router;
