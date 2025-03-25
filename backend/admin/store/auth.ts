import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || ''
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem('jwt', newToken);
    },
    clearToken() {
      this.token = '';
      localStorage.removeItem('jwt');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
});
