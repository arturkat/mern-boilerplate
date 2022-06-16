import React, {useEffect} from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/feature/AppRouter'
import {refreshUser} from './store/slices/authSlice'
import {useAppDispatch} from './store'

export default function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
