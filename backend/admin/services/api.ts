import axios from 'axios';

// Adjust baseURL to match your backend's actual URL and port
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Optional: attach an interceptor to automatically include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
