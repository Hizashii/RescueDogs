import { Router } from 'express';
import { getReports } from '../controllers/report.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getReports);

export default router;
