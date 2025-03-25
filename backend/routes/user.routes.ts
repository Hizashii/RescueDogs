import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, getUsers);

export default router;
