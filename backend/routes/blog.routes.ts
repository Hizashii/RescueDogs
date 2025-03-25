import { Router } from 'express';
import { createBlog, getBlogs } from '../controllers/blog.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createBlog);
router.get('/', getBlogs);

export default router;
