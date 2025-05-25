export const useApi = () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBase = runtimeConfig.public.apiBase || 'https://rescuedogs-1.onrender.com'
    return <T>(url: string, opts?: any) =>
      $fetch<T>(url, { baseURL: apiBase, ...opts })
  }