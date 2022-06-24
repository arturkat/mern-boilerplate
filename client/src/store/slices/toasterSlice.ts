import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import PostsService from '@/services/PostsService'
import {setLoading, setPosts} from '@/store/slices/postsSlice'

class Toast {
  public msg: string
  public createdAt: number

  constructor(msg) {
    this.msg = msg
    this.createdAt = Date.now()
  }
}

interface IToast {
  msg: string
  createdAt: number
}

export interface ToasterState {
  toasts: IToast[]
}

const initialState: ToasterState = {
  toasts: [],
}

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<string>) {
      const toast: IToast = new Toast(action.payload)
      state.toasts.push({
        msg: toast.msg,
        createdAt: toast.createdAt
      })
    },
    deleteToast(state, action: PayloadAction<number>) {
      state.toasts = state.toasts.filter((toast: IToast) => {
        return toast.createdAt !== action.payload // filters all false
      })
    },
  }
})

export const {setToast, deleteToast} = toasterSlice.actions

export default toasterSlice.reducer

