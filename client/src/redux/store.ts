import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blogReducer from './slices/BlogSlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer
  }
})

//Get root state and AppDispatch from store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
