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
          const text = await response.text()
          console.error('Non-JSON response:', text)
          error.value = 'Server error occurred'
        }
        return false
      }

      const data = await response.json()
      user.value = data.user
      isAuthenticated.value = true
      isAdmin.value = '1'
      
      // Store the token from the response
      const cookies = response.headers.get('set-cookie')
      console.log('Login response cookies:', cookies)
      if (cookies) {
        const tokenMatch = cookies.match(/admin_token=([^;]+)/)
        if (tokenMatch) {
          token.value = tokenMatch[1]
          console.log('Token stored:', token.value)
        }
      }
      
      return true
    } catch (err) {
      console.error('Login error:', err)
      error.value = 'An error occurred during login'
      return false
    } finally {
      loading.value = false
    }
  }

  async function checkAuth() {
    try {
      const apiUrl = `${config.public.apiBase}/api/auth/profile`
      console.log('Checking auth with token:', token.value)
      
      const response = await fetch(apiUrl, {
        credentials: 'include',
        headers: {
          'Authorization': token.value ? `Bearer ${token.value}` : '',
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Auth check response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        user.value = data
        isAuthenticated.value = true
        isAdmin.value = '1'
      } else {
        console.log('Auth check failed:', response.status)
        user.value = null
        isAuthenticated.value = false
        isAdmin.value = null
        token.value = null
      }
    } catch (err) {
      console.error('Auth check error:', err)
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
      
      if (!response.ok) {
        console.error('Logout failed:', response.status)
      }
    } catch (err) {
      console.error('Logout error:', err)
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
