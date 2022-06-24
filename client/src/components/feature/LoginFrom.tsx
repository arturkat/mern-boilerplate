import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UButton from '@/components/UI/UButton'
import {useAppDispatch, useAppSelector} from '@/store'
import {loginUser, authedUser, signupUser, logoutUser, refreshUser, setAuth} from '@/store/slices/authSlice'
import UTextInput from '@/components/UI/UTextIntput'

const Form = () => {
  let navigate = useNavigate();
  let location = useLocation();

  // @ts-ignore
  let from: string = location.state?.from?.pathname || '';

  const dispatch = useAppDispatch()

  const authState = useAppSelector(state => state.auth)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const isLoading = useAppSelector(state => state.auth.isLoading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log('authState', authState)
  // console.log('isAuth', isAuth)
  // console.log('isLoading', isLoading)
  // console.log('-/-/-/-')

  return (
    <>
      <form onSubmit={e => e.preventDefault()} className="mt-6">
        <fieldset>
          <h3 className="mb-4 text-center">Auth Form</h3>

          <div className="flex bg-gray-200 rounded px-6 gap-2 mb-2">
            <span>isAuth: {JSON.stringify(isAuth)} </span>
            <span>isLoading: {JSON.stringify(isLoading)} </span>
          </div>

          <div className="grid grid-flow-col auto-cols-auto gap-2 mb-2">
            <UTextInput
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} />

            <UTextInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="grid grid-flow-col-dense gap-2">
            <UButton onClick={async () => {
              const loginRes = await dispatch(loginUser(email, password))
              // console.log('===>>> loginRes success:', loginRes)

              from && navigate(from, { replace: true })
            }}>
              Log In
            </UButton>
            <UButton onClick={ async() => {
              const signupRes = await dispatch(signupUser(email, password))
              // console.log('===>>> signupRes:', signupRes)
            }}>
              Sign Up
            </UButton>
            <UButton onClick={() => {dispatch(logoutUser())}}>
              Log Out
            </UButton>
            <UButton onClick={() => {dispatch(authedUser())}}>
              Authed
            </UButton>
            <UButton onClick={() => {dispatch(refreshUser())}}>
              Refresh
            </UButton>
          </div>
          <div className="grid grid-flow-col-dense gap-2 my-2">
            <UButton onClick={() => {dispatch(setAuth(true))}}>
              dispatch(setAuth(true)
            </UButton>
            <UButton onClick={() => {dispatch(setAuth(false))}}>
              dispatch(setAuth(false)
            </UButton>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default Form
