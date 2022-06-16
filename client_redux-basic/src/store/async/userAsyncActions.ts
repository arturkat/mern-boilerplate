import Cookies from 'js-cookie'
import {addManyUsers, setAuth, setUser} from '../userReducer'
import AuthService from '../../services/AuthService'

export function fetchManyUsers() {
  return function (dispatch, getState) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(addManyUsers(json)))
    // console.log('state:', getState())
  }
}

export function signupUser(email, password) {
  return async function(dispatch, getState) {
    try {
      const signupResponse = await AuthService.signup(email, password)
      console.log('-> signupUser:success:', signupResponse)
    } catch(error) {
      console.log('-> signupUser:error:', error.response?.data)
    }
  }
}

export function loginUser(email, password) {
  return async function (dispatch, getState) {
    try {
      const loginResponse = await AuthService.login(email, password)
      console.log('-> loginUser:', loginResponse)

      const accessToken = Cookies.get('accessToken')
      console.log('-> Cookie accessToken:', accessToken)
      localStorage.setItem('accessToken', accessToken)

      dispatch(setUser(loginResponse?.data?.data))
      dispatch(setAuth(true))
    } catch(error) {
      console.log('-> loginUser:error:', error.response?.data)
    }
  }
}

export function logoutUser() {
  return async function(dispatch, getState) {
    try {
      const logoutResponse = await AuthService.logout()
      console.log('-> logoutUser:', logoutResponse)
      // Cookies.remove('accessToken')
      dispatch(setUser({}))
      dispatch(setAuth(false))
    } catch(error) {
      console.log('-> logoutUser:error:', error.response?.data)
    }
  }
}

export function authedUser() {
  return async function(dispatch, getState) {
    try {
      const authedResponse = await AuthService.authed()
      console.log('-> authedUser:', authedResponse)
    } catch(error) {
      console.log('-> authedUser:error:', error.response?.data)
    }
  }
}

export function refreshUser() {
  return async function(dispatch, getState) {
    try {
      const refreshResponse = await AuthService.refresh()
      console.log('-> refreshUser:', refreshResponse)
    } catch(error) {
      console.log('-> refreshUser:error:', error.response?.data)
    }
  }
}