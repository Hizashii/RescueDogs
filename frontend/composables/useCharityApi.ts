import axios from 'axios'
import type { CharityItem } from '~/types/CharityItem'

axios.defaults.baseURL = 'http://localhost:5000'

export default function useCharityApi() {
  const fetchAll = async (): Promise<CharityItem[]> =>
    (await axios.get<CharityItem[]>('/api/CharityItems')).data

  const create = (item: Omit<CharityItem,'_id'>) =>
    axios.post<CharityItem>('/api/CharityItems', item)

  return { fetchAll, create }
}
