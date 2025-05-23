import axios from 'axios'
import type { CharityItem } from '../type/CharityItem'

axios.defaults.baseURL = process.env.ADMIN_API_BASE || 'https://rescuedogs-1.onrender.com'

export default function useCharityApi() {
  const fetchAll = (): Promise<CharityItem[]> =>
    axios.get('/api/charityitems').then(r => r.data)

  const create = (item: Omit<CharityItem,'_id'>) =>
    axios.post<CharityItem>('/api/charityitems', item)

  const update = (id: string, item: Partial<CharityItem>) =>
    axios.put<CharityItem>(`/api/charityitems/${id}`, item)

  const remove = (id: string) =>
    axios.delete(`/api/charityitems/${id}`)

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
          const pct = Math.round((ev.loaded * 100) / (ev.total!))
          onUploadProgress(pct)
        }
      }
    )
    return { url: axios.defaults.baseURL + res.data.path }
  }

  return { fetchAll, create, update, remove, uploadImage }
}