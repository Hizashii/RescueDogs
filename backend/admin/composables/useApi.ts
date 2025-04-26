export const useApi = () => {
    return <T>(path: string, opts?: any) =>
      $fetch<T>(`http://localhost:5000${path}`, { ...opts })
  }