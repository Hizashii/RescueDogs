// services/api.ts
import axios from 'axios';

// FIXED: Changed baseURL to point to your actual backend server
const api = axios.create({
  baseURL: 'http://localhost:3000'  // Changed from 'http://localhost:3000/api'
});
// Interceptor to automatically include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - backend server might be down at http://localhost:5000');
    }
    return Promise.reject(error);
  }
);

export default api;