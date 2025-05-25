import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    title:       { type: String, required: true },
    content:     { type: String, required: true },
    excerpt:     { type: String, required: false },
    featuredImage:{ type: String, required: false },
    status:      { type: String, enum: ['published','draft'], default:'draft', index: true },
  },
  { timestamps: true }
);

// Explicitly ensure index on createdAt for sorting
BlogSchema.index({ createdAt: -1 });

export const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema);
