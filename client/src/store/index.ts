import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import authReducer from './slices/authSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
})

// Inferred type: {counter: PostsState, comments: CommentsState, users: UsersState}
export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// HOOKs
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
