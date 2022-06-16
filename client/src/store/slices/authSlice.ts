import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {IUser} from '../../types/user'
import AuthService from '../../services/AuthService'

export interface AuthState {
  user: IUser | null
  isAuth: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
}

const accessToken = localStorage.getItem('accessToken')
if (accessToken) {
  initialState.isAuth = true;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
  }
})

export const {setUser, setAuth, setLoading} = authSlice.actions

/* Async Actions */

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    const loginResponse = await AuthService.login(email, password)
    console.log('-> loginUser:success:', loginResponse)

    const accessToken = Cookies.get('accessToken')
    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(loginResponse?.data?.data))
    dispatch(setAuth(true))

    return loginResponse
  } catch(error) {
    console.log('-> loginUser:error:', error.response?.data)
  }
}

export const signupUser = (email, password) => async function(dispatch, getState) {
  try {
    const signupResponse = await AuthService.signup(email, password)
    console.log('-> signupUser:success:', signupResponse)

    const accessToken = Cookies.get('accessToken')
    localStorage.setItem('accessToken', accessToken)

    return signupResponse
  } catch(error) {
    console.log('-> signupUser:error:', error.response?.data)
  }
}

export const logoutUser = () => async function(dispatch, getState) {
  try {
    const logoutResponse = await AuthService.logout()
    console.log('-> logoutUser:success:', logoutResponse)

    // Cookies.remove('accessToken') // done by server
    localStorage.removeItem('accessToken')

    dispatch(setUser(null))
    dispatch(setAuth(false))

    return logoutResponse
  } catch(error) {
    console.log('-> logoutUser:error:', error.response?.data)
  }
}

export const refreshUser = () => async function(dispatch, getState) {
  try {
    const refreshResponse = await AuthService.refresh()
    console.log('-> refreshUser:success:', refreshResponse)

    const accessToken = Cookies.get('accessToken')
    localStorage.setItem('accessToken', accessToken)
    // console.log('-> refreshUser:success accessToken ', accessToken)

    dispatch(setUser(refreshResponse?.data?.data))
    dispatch(setAuth(true))

    return refreshResponse
  } catch(error) {
    console.log('-> refreshUser:error:', error.response?.data)

    // Cookies.remove('accessToken')
    // Cookies.remove('refreshToken')
    // localStorage.removeItem('accessToken')

    dispatch(setUser(null))
    dispatch(setAuth(false))
  }
}

export const authedUser = () => async (dispatch, getState) => {
  try {
    const authedResponse = await AuthService.authed()
    console.log('-> authedUser:success:', authedResponse)

    dispatch(setAuth(authedResponse?.data?.data?.authed))

    return authedResponse
  } catch(error) {
    console.log('-> authedUser:error:', error.response?.data)
  }
}

export default authSlice.reducer
