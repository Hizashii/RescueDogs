// backend/admin/composables/useAuth.ts
import { ref, onMounted, type Ref } from 'vue'
import axios from 'axios'
import { useRouter, useRuntimeConfig } from '#imports'

interface User {
  id: string; email: string; role: string; name?: string
}
interface LoginResponse { token: string; user: User }

export function useAuth() {
  const config = useRuntimeConfig()
  // 1️⃣ set axios baseURL to your real backend
  axios.defaults.baseURL = config.public.apiBase || 'http://localhost:5000'        // :contentReference[oaicite:3]{index=3}

  const token: Ref<string | null> = ref(null)
  const user:  Ref<User   | null> = ref(null)
  const isAuthenticated: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(true)
  const router = useRouter()

  // 2️⃣ intercept all requests to add Authorization header
  axios.interceptors.request.use(cfg => {
    if (token.value) cfg.headers!['Authorization'] = `Bearer ${token.value}`   // :contentReference[oaicite:4]{index=4}
    return cfg
  })

  // 3️⃣ intercept 401 to force logout
  axios.interceptors.response.use(
    r => r,
    e => {
      if (e.response?.status === 401) {
        logout()
        router.push('/login')
      }
      return Promise.reject(e)
    }
  )

  onMounted(() => {
    const saved = localStorage.getItem('adminToken')
    if (saved) {
      token.value = saved
      isAuthenticated.value = true
      fetchUserProfile()
    }
    loading.value = false
  })

  // 4️⃣ login against new endpoint
  async function login(email: string, password: string): Promise<boolean> {
    try {
      const { data } = await axios.post<LoginResponse>('/api/auth/login', { email, password })
      token.value = data.token
      localStorage.setItem('adminToken', data.token)
      user.value = data.user
      isAuthenticated.value = true
      return true
    } catch {
      return false
    }
  }

  // 5️⃣ fetch profile to rehydrate `user`
  async function fetchUserProfile() {
    try {
      const { data } = await axios.get<User>('/api/auth/profile')
      user.value = data
    } catch (e) {
      console.error('Profile fetch failed', e)
    }
  }

  function logout() {
    token.value = null
    user.value  = null
    isAuthenticated.value = false
    localStorage.removeItem('adminToken')
  }

  return {
    token, user, isAuthenticated, loading,
    login, logout
  }
}
