import { createReducer, createAction } from '@reduxjs/toolkit'
import { initalPostList } from '../../constants/blog'
import { Post } from 'types/PostType'

interface BlogState {
  postList: Post[]
  edittingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList,
  edittingPost: null
}

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<number>('blog/deletePost')
export const startEditingPost = createAction<number>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const updatePost = createAction<Post>('blog/updatePost')

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      state.postList.push(action.payload)
    })
    .addCase(deletePost, (state, action) => {
      state.postList = state.postList.filter((post) => post.id !== action.payload)
    })
    .addCase(startEditingPost, (state, action) => {
      state.edittingPost = state.postList.find((post) => post.id === action.payload) || null
    })
    .addCase(cancelEditingPost, (state) => {
      state.edittingPost = null
    })
    .addCase(updatePost, (state, action) => {
      console.log(action.payload)

      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        } else return false
      })
      state.edittingPost = null
    })
})

export default blogReducer
