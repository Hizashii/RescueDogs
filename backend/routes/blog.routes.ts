import { Router } from 'express';
import { createBlog, getBlogs, getBlogById } from '../controllers/blog.controller';
import { BlogModel, IBlog } from '../models/Blog';

const router = Router();

router.post(
  '/',
  createBlog
);

router.get(
  '/',
  getBlogs
);

router.get(
  '/:id',
  getBlogById
);

router.put('/:id', async (req, res) => {
  try {
    const updated = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.json(updated);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BlogModel.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    return res.json({ message: 'Deleted successfully' })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
})

export default router;
