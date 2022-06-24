import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {IUser} from '@/types/user'
import AuthService from '@/services/AuthService'
import {setToast} from './toasterSlice'
import {useAppDispatch} from '@/store'
import { setPost } from './postsSlice'

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

export default authSlice.reducer

/* Async Actions */

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    const loginResponse = await AuthService.login(email, password)
    console.log('-> loginUser:success:', loginResponse)

    dispatch(setToast(loginResponse?.data?.message))
    // dispatch(setToast(`reprehenderit quos placeat velit minima officia dolores impedit repudiandae molestiae`))

    const accessToken = Cookies.get('accessToken')
    localStorage.setItem('accessToken', accessToken)

    dispatch(setUser(loginResponse?.data?.data))
    dispatch(setAuth(true))

    return loginResponse
  } catch(error) {
    // console.log('-> loginUser:error:', error)
    console.log('-> loginUser:error:', error.response?.data)
    dispatch(setToast(error.response?.data?.message))
  }
}

export const signupUser = (email, password) => async function(dispatch, getState) {
  try {
    const signupResponse = await AuthService.signup(email, password)
    console.log('-> signupUser:success:', signupResponse)

    const accessToken = Cookies.get('accessToken')
    localStorage.setItem('accessToken', accessToken)

    dispatch(setToast(signupResponse?.data?.message))

    return signupResponse
  } catch(error) {
    console.log('-> signupUser:error:', error.response?.data)
    dispatch(setToast(error.response?.data?.message))
  }
}

export const logoutUser = () => async function(dispatch, getState) {
  try {
    const logoutResponse = await AuthService.logout()
    console.log('-> logoutUser:success:', logoutResponse)

    Cookies.remove('accessToken') // also it gets removed by server headers
    localStorage.removeItem('accessToken')

    dispatch(setUser(null))
    dispatch(setAuth(false))
    dispatch(setToast(logoutResponse?.data?.message))

    return logoutResponse
  } catch(error) {
    console.log('-> logoutUser:error:', error.response?.data)
    dispatch(setToast(error.response?.data?.message))
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
    dispatch(setToast(refreshResponse?.data?.message))

    return refreshResponse
  } catch(error) {
    console.log('-> refreshUser:error:', error.response?.data)

    dispatch(setUser(null))
    dispatch(setAuth(false))
    dispatch(setToast(error.response?.data?.message))

    // Cookies.remove('accessToken')
    // Cookies.remove('refreshToken')
    // localStorage.removeItem('accessToken')
  }
}

export const authedUser = () => async (dispatch, getState) => {
  try {
    const authedResponse = await AuthService.authed()
    console.log('-> authedUser:success:', authedResponse)

    dispatch(setAuth(authedResponse?.data?.data?.authed))

    dispatch(setToast(authedResponse?.data?.message))

    return authedResponse
  } catch(error) {
    console.log('-> authedUser:error:', error.response?.data)
    dispatch(setToast(error.response?.data?.message))
  }
}

