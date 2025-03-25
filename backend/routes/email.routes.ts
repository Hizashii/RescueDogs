import { Router } from 'express';
import { getEmails } from '../controllers/email.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getEmails);

export default router;
