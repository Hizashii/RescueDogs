import axios from 'axios'
import type { CharityItem } from '~/types/CharityItem'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const baseUrl = config.public.apiBase || 'https://rescuedogs-1.onrender.com'

export default function useCharityApi() {
  const fetchAll = async (): Promise<CharityItem[]> => {
    const response = await axios.get<CharityItem[]>(`${baseUrl}/api/CharityItems`)
    return response.data
  }

  const create = (item: Omit<CharityItem,'_id'>) =>
    axios.post<CharityItem>(`${baseUrl}/api/CharityItems`, item)

  return { fetchAll, create }
}
