import { Request, Response } from 'express';
import { BlogModel } from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const filter = req.query.published === 'true'
      ? { status: 'published' }
      : {};
    const blogs = await BlogModel.find(filter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to list blogs.' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { _id, ...body } = req.body;

    const data = {
      ...body,
    };

    const blog = new BlogModel(data);
    await blog.save();
    return res.status(201).json(blog);
  } catch (err: any) {
    console.error('createBlog error:', err);
    return res.status(500).json({
      message: 'Failed to create blog.',
      error: err.message,
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await BlogModel.findById(req.params.id).lean().exec();
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get blog' });
  }
};
