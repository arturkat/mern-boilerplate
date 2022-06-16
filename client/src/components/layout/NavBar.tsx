import React from 'react'
import { Link, NavLink } from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../store'
import {authedUser, logoutUser} from '../../store/slices/authSlice'
import UButton from '../UI/UButton'

const NavBar = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth.user)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const count = useAppSelector(state => state.counter.value)

  const classNameResolver = ({isActive}) => {
    return isActive ? 'font-medium' : ''
  }

  return (
    <>
    <nav className="w-full max-w-screen-xl mx-auto my-4 px-4">
      <div className="flex items-center justify-between bg-gray-200 rounded px-6 py-2 gap-2 text-sm text-gray-900">
        <div>
          <span>isAuth: {String(isAuth)} </span>
          <span>isLoading: {String(isLoading)} </span>
          <span>Email: {user && user.email || 'empty'} </span>
          <span>Count: {count}</span>
        </div>
        <div>
          <UButton onClick={() => {dispatch(authedUser())}} className="text-xs">
            Authed
          </UButton>
          <UButton onClick={() => {dispatch(logoutUser())}} className="text-xs">
            Log Out
          </UButton>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center px-6 py-3 bg-white border-gray-200 rounded dark:bg-gray-800">
        <NavLink to="/" className={classNameResolver}>Root</NavLink>
        <div className="w-auto">
          <ul className="flex flex-wrap space-x-8">
            <li>
              <NavLink to="/private" className={classNameResolver}>Private</NavLink>
            </li>
            <li>
              <NavLink to="/private2" className={classNameResolver}>Private 2</NavLink>
            </li>
            <li>
              <NavLink to="/404" className={classNameResolver}>404</NavLink>
            </li>
            <li>
              <NavLink to="/styleguide" className={classNameResolver}>StyleGuide</NavLink>
            </li>
            <li>
              <NavLink to="/counter" className={classNameResolver}>Counter</NavLink>
            </li>
            <li>
              <NavLink to="/auth" className={classNameResolver}>Auth</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default NavBar