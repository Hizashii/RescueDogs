import axios from 'axios'
import type { Report } from '~/type/Report'

axios.defaults.baseURL = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000'

export default function useReportApi() {
  const fetchAll = (): Promise<Report[]> =>
    axios.get('/api/reports').then(r => r.data)

  const create = (report: Omit<Report, '_id'>) =>
    axios.post<Report>('/api/reports', report)

  const update = (id: string, report: Partial<Report>) =>
    axios.put<Report>(`/api/reports/${id}`, report)

  const remove = (id: string) =>
    axios.delete(`/api/reports/${id}`)

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
    return { url: axios.defaults.baseURL + res.data.path }
  }

  return { fetchAll, create, update, remove, uploadImage }
}
