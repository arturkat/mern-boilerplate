import axios from 'axios'
import Cookies from 'js-cookie'

export const API_URL = `http://localhost:8000/api`

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config;
})

$api.interceptors.response.use((config) => {
  // console.log(`$api:success:status: ${config.status}`)
  return config;
},async (error) => {
  // console.log(`$api:error:`, error.config)
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.post(`${API_URL}/refresh`, {}, {withCredentials: true})
      const accessToken = Cookies.get('accessToken')
      localStorage.setItem('accessToken', accessToken)
      return $api.request(originalRequest);
    } catch (e) {
      console.log(`User isn't authorized`)
    }
  }
  // return Promise.reject(error)
  throw error;
})

export default $api

