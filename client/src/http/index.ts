import axios from 'axios'

export const API_URL = `http://localhost:8000/api`

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export default $api
