import { ref, onMounted, type Ref } from 'vue'
import axios from 'axios'
import { useRouter, useRuntimeConfig } from '#imports'

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export function useAuth() {
  const config = useRuntimeConfig()
  axios.defaults.baseURL = config.public.apiBase || 'http://localhost:5000'

  const token: Ref<string | null> = ref(null)
  const user: Ref<User | null> = ref(null)
  const isAuthenticated: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(true)
  const router = useRouter()

  // Set up axios interceptors for authentication
  axios.interceptors.request.use(cfg => {
    if (token.value) {
      cfg.headers!['Authorization'] = `Bearer ${token.value}`
    }
    return cfg
  })

  // Handle authentication errors
  axios.interceptors.response.use(
    r => r,
    e => {
      if (e.response?.status === 401 || e.response?.status === 403) {
        logout()
        router.push('/login')
      }
      return Promise.reject(e)
    }
  )

  // Check for existing session on mount
  onMounted(() => {
    const savedToken = localStorage.getItem('adminToken')
    const savedUser = localStorage.getItem('adminUser')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
    
    loading.value = false
  })

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const ADMIN_EMAIL = 'mancsmentoadomany@gmail.com'
      const ADMIN_PASS = 'Kuty4M4ncsM3ntok'

      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        const mockToken = 'admin-token-' + Date.now()
        const mockUser: User = {
          id: '1',
          email: ADMIN_EMAIL,
          role: 'admin',
          name: 'Admin'
        }

        // Set auth state
        token.value = mockToken
        user.value = mockUser
        isAuthenticated.value = true

        // Store in localStorage
        localStorage.setItem('adminToken', mockToken)
        localStorage.setItem('adminUser', JSON.stringify(mockUser))
        localStorage.setItem('isAdmin', '1')

        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    localStorage.removeItem('isAdmin')
  }

  return {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }
}
