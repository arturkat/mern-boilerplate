import $api from '../http'

class AuthService {
  static async login(email: string, password: string) {
    const response = await $api.post('/login', {email, password})
    return response
  }
}

export default AuthService
