export const useApi = () => {
    return <T>(path: string, opts?: any) =>
      $fetch<T>(`https://rescuedogs-1.onrender.com${path}`, { ...opts })
  }