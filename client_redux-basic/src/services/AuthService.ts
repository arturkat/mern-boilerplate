import $api from '../http'

class AuthService {
  static async login(email: string, password: string) {
    return await $api.post('/login', {email, password})
  }

  static async logout() {
    localStorage.removeItem('accessToken')
    return await $api.post('/logout')
  }

  static async signup(email: string, password: string) {
    return await $api.post('/signup', {email, password})
  }

  static async refresh() {
    return await $api.post('/refresh')
  }

  static async authed() {
    return await $api.post('/authed')
  }
}

export default AuthService
