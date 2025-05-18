export interface BlogPost {
  _id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string | null
  status: 'published' | 'draft'
  createdAt: string
  category: string    
  updatedAt: string
}
