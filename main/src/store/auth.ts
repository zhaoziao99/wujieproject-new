import { defineStore } from 'pinia'

interface AuthState {
  token: string | null
  user: any | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: sessionStorage.getItem('token'),
    user: null
  }),

  getters: {
    isAuthenticated: state => !!state.token
  },

  actions: {
    setToken(token: string) {
      this.token = token
      sessionStorage.setItem('token', token)
    },

    setUser(user: any) {
      this.user = user
    },

    logout() {
      this.token = null
      this.user = null
      sessionStorage.removeItem('token')
      // 触发登出事件，通知子应用
      window.dispatchEvent(new CustomEvent('logout'))
    }
  }
})
