import { ref } from 'vue'
import { useRouter, useRuntimeConfig, useCookie } from '#imports'

export function useAuth() {
  const router = useRouter()
  const config = useRuntimeConfig()
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref('')
  const isAdmin = useCookie('isAdmin')
  const token = useCookie('admin_token', {
    secure: true,
    sameSite: 'none',
    path: '/'
  })

  async function login(email: string, password: string): Promise<boolean> {
    try {
      loading.value = true
      error.value = ''

      const apiUrl = `${config.public.apiBase}/api/auth/login`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          error.value = data.message || 'Login failed'
        } else {
          error.value = 'Server error occurred'
        }
        return false
      }

      const data = await response.json()
      user.value = data.user
      isAuthenticated.value = true
      isAdmin.value = '1'
      
      if (data.token) {
        token.value = data.token
      }
      
      return true
    } catch (err) {
      error.value = 'An error occurred during login'
      return false
    } finally {
      loading.value = false
    }
  }

  async function checkAuth() {
    try {
      const apiUrl = `${config.public.apiBase}/api/auth/profile`
      
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          'Authorization': token.value ? `Bearer ${token.value}` : '',
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        user.value = data
        isAuthenticated.value = true
        isAdmin.value = '1'
      } else {
        user.value = null
        isAuthenticated.value = false
        isAdmin.value = null
        token.value = null
      }
    } catch (err) {
      user.value = null
      isAuthenticated.value = false
      isAdmin.value = null
      token.value = null
    }
  }

  async function logout() {
    try {
      const apiUrl = `${config.public.apiBase}/api/auth/logout`
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': token.value ? `Bearer ${token.value}` : '',
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      // Ignore logout errors
    } finally {
      user.value = null
      isAuthenticated.value = false
      isAdmin.value = null
      token.value = null
      router.push('/login')
    }
  }

  if (import.meta.client) {
    checkAuth()
  }

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth
  }
}
