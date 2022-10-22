import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import postApi from '../../api/postApi'
import { Post } from 'types/PostType'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  postList: Post[]
  edittingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BlogState = {
  postList: [],
  edittingPost: null,
  loading: false,
  currentRequestId: undefined
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const res = await postApi.getAll(thunkAPI.signal)
  return res.data
})

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (body: Omit<Post, 'id'>, thunkAPI) => {
    try {
      const res = await postApi.create(body, thunkAPI.signal)
      return res.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postId, body }: { postId: number; body: Omit<Post, 'id'> }, thunkAPI) => {
    try {
      const res = await postApi.update(postId, body, thunkAPI.signal)
      return res.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const deletePost = createAsyncThunk('blog/deletePost', async (postId: number, thunkAPI) => {
  const res = await postApi.delete(postId, thunkAPI.signal)
  return res.data
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<number>) => {
      state.edittingPost = state.postList.find((post) => post.id === action.payload) || null
    },
    cancelEditingPost: (state) => {
      state.edittingPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.edittingPost = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postList = state.postList.filter((post) => post.id !== action.payload.id)
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export const { startEditingPost, cancelEditingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer
