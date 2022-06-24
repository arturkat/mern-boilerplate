import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import PostsService from '@/services/PostsService'
import {IPostRequest, IPostResponse } from '@/types/post'

export interface IPostsState {
  posts: IPostResponse[]
  isLoading: boolean
}

const initialState: IPostsState = {
  posts: [],
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<IPostResponse>) {
      state.posts.unshift(action.payload)
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post: IPostResponse) => {
        return post._id !== action.payload
      })
    },
    setPosts(state, action: PayloadAction<IPostResponse[]>) {
      state.posts = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  }
})

export const {setPost, setPosts, deletePost, setLoading} = authSlice.actions

export default authSlice.reducer

/* Async Actions */

export const loadPosts = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true))
    const postsResponse = await PostsService.getPosts()
    console.log('-> loadPosts:success:', postsResponse)

    dispatch(setPosts(postsResponse?.data?.data))
    dispatch(setLoading(false))

    return postsResponse
  } catch(error) {
    console.log('-> loadPosts:error:', error.response?.data)
  }
}

export const createPostAsync = (post: IPostRequest) => async (dispatch, getState) => {
  try {
    // dispatch(setLoading(true))
    const createPostResponse = await PostsService.createPost(post)
    console.log('-> createPostResponse:success:', createPostResponse)

    dispatch(setPost(createPostResponse?.data?.data))
    // dispatch(setLoading(false))

    return createPostResponse
  } catch(error) {
    // dispatch(setLoading(false))
    console.log('-> createPostResponse:error:', error.response?.data)
  }
}

export const deletePostAsync = (id: string) => async (dispatch, getState) => {
  try {
    // debugger
    const deletePostResponse = await PostsService.deletePost(id)
    console.log('-> deletePostResponse:success:', deletePostResponse)

    dispatch(deletePost(id))

    return deletePostResponse
  } catch(error) {
    console.log('-> createPostResponse:error:', error.response?.data)
  }
}
