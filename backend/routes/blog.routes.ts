import { Router } from 'express';
import { createBlog, getBlogs, getBlogById } from '../controllers/blog.controller';

const router = Router();

// Create a new blog (protected)
router.post(
  '/',
  createBlog
);

// List all blogs (public)
router.get(
  '/',
  getBlogs
);

// Get a single blog by ID (public)
router.get(
  '/:id',
  getBlogById
);

export default router;
