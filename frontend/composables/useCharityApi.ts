import axios from 'axios'
import type { CharityItem } from '~/types/CharityItem'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const baseUrl = config.public.apiBase || 'https://rescuedogs-1.onrender.com'

export default function useCharityApi() {
  const fetchAll = async (): Promise<CharityItem[]> => {
    const response = await axios.get<CharityItem[]>('/api/CharityItems')
    return response.data.map(item => {
      let imageUrl = item.imageUrl || ''
      if (imageUrl) {
        try {
          // If it's a full URL, extract just the path
          const url = new URL(imageUrl)
          imageUrl = url.pathname
        } catch {
          // If it's already a path, use it as is
          if (!imageUrl.startsWith('/')) {
            imageUrl = '/' + imageUrl
          }
        }
        // Prepend the base URL
        imageUrl = `${baseUrl}${imageUrl}`
      }
      return { ...item, imageUrl }
    })
  }

  const create = (item: Omit<CharityItem,'_id'>) =>
    axios.post<CharityItem>('/api/CharityItems', item)

  return { fetchAll, create }
}
