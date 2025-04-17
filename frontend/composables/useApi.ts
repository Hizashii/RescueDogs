export const useApi = () => {
    const { apiBase } = useRuntimeConfig().public
    return <T>(url: string, opts?: any) =>
      $fetch<T>(url, { baseURL: apiBase, ...opts })
  }
  