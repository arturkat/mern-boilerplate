import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import PostsService from '@/services/PostsService'
import {setLoading, setPosts} from '@/store/slices/postsSlice'

class Toast {
  public msg: string
  public type?: string
  public createdAt?: number

  constructor(msg, type?) {
    this.msg = msg
    if (type) {
      this.type = type
    }
    this.createdAt = Date.now()
  }
}

interface IToast {
  msg: string
  type?: string
  createdAt?: number
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
    setToast(state, action: PayloadAction<IToast | string>) {
      let toast: IToast;
      if (typeof action.payload === 'string') {
        toast = new Toast(action.payload)
      } else {
        const type = action.payload.type ?? ''
        toast = new Toast(action.payload.msg, type)
      }
      state.toasts.push({
        msg: toast.msg,
        type: toast.type ?? '',
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

