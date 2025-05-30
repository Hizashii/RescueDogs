import axios from 'axios'
import type { BlogPost } from '../type/BlogPost'
axios.defaults.baseURL = process.env.NUXT_PUBLIC_API_BASE || 'https://rescuedogs-1.onrender.com'
export default function useBlogApi() {
  const fetchAll = (): Promise<BlogPost[]> =>
    axios.get('/api/blogs').then(r => r.data)
  const create = (post: Omit<BlogPost, '_id'>) =>
    axios.post<BlogPost>('/api/blogs', post)
  const update = (id: string, post: Partial<BlogPost>) =>
    axios.put<BlogPost>(`/api/blogs/${id}`, post)
  const remove = (id: string) =>
    axios.delete(`/api/blogs/${id}`)
  async function uploadImage(
    formData: FormData,
    onUploadProgress: (pct: number) => void
  ): Promise<{ url: string }> {
    const res = await axios.post<{ path: string }>(
      '/api/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress(ev) {
          onUploadProgress(Math.round((ev.loaded * 100) / (ev.total!)))
        }
      }
    )
    return { url: res.data.path }
  }
  return { fetchAll, create, update, remove, uploadImage }
}
