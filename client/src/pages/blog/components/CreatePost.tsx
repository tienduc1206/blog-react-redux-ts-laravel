import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Post } from 'types/PostType'
import { RootState, useAppDispatch } from '../../../redux/store'
import { cancelEditingPost, createPost, updatePost } from '../../../redux/slices/BlogSlice'
import { unwrapResult } from '@reduxjs/toolkit'

interface Errors {
  description: String[]
  featuredImage: String[]
  publishDate: String[]
  published: String[]
  title: String[]
}

const initialState: Omit<Post, 'id'> = {
  description: '',
  featuredImage: '',
  publishDate: '',
  published: false,
  title: ''
}

const CreatePost = () => {
  const [formData, setFormData] = useState<Omit<Post, 'id'>>(initialState)
  const [errors, setErrors] = useState<Errors | null>(null)
  const edittingPost = useSelector((state: RootState) => state.blog.edittingPost)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setFormData(edittingPost || initialState)
  }, [edittingPost])

  const handleOnchangeInputForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target
    setFormData((prev) => ({ ...prev, [target.id]: target.value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (edittingPost) {
      try {
        await dispatch(updatePost({ postId: edittingPost.id, body: formData })).unwrap()
        setErrors(null)
      } catch (err: any) {
        setErrors(err.errors)
      }
    } else {
      dispatch(createPost(formData))
        .unwrap()
        .then(() => {
          setFormData(initialState)
          setErrors(null)
        })
        .catch((err) => {
          setErrors(err.errors)
        })
    }
  }

  const handleCancelEditPost = () => {
    setErrors(null)
    dispatch(cancelEditingPost())
  }

  const handleUpdatePost = (postId: number) => {}
  return (
    <form onSubmit={handleSubmit} onReset={handleCancelEditPost}>
      <div className='mb-6'>
        <label
          htmlFor='title'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          value={formData.title}
          onChange={(e) => handleOnchangeInputForm(e)}
        />
        <p className='text-sm text-red-500'>{errors?.title ? errors?.title[0] : ''}</p>
      </div>
      <div className='mb-6'>
        <label
          htmlFor='featuredImage'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Featured Image
        </label>
        <input
          type='text'
          id='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          value={formData.featuredImage}
          onChange={(e) => handleOnchangeInputForm(e)}
        />
        <p className='text-sm text-red-500'>
          {errors?.featuredImage ? errors?.featuredImage[0] : ''}
        </p>
      </div>
      <div className='mb-6'>
        <div>
          <label
            htmlFor='description'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Description
          </label>
          <textarea
            id='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            value={formData.description}
            onChange={(e) => handleOnchangeInputForm(e)}
          />
          <p className='text-sm text-red-500'>
            {errors?.description ? errors?.description[0] : ''}
          </p>
        </div>
      </div>
      <div className='mb-6'>
        <label
          htmlFor='publishDate'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Publish Date
        </label>
        <input
          type='datetime-local'
          id='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          value={formData.publishDate}
          onChange={(e) => handleOnchangeInputForm(e)}
        />
        <p className='text-sm text-red-500'>{errors?.publishDate ? errors?.publishDate[0] : ''}</p>
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='publish'
          type='checkbox'
          checked={formData.published}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, published: event.target.checked }))
          }
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
        />
        <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
        <p className='text-sm text-red-500'>{errors?.published ? errors?.published[0] : ''}</p>
      </div>
      <div>
        {edittingPost ? (
          <>
            <button
              type='submit'
              onClick={() => handleUpdatePost(edittingPost.id)}
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Update Post
              </span>
            </button>
            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cancel
              </span>
            </button>
          </>
        ) : (
          <button
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            type='submit'
          >
            <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              Publish Post
            </span>
          </button>
        )}
      </div>
    </form>
  )
}

export default CreatePost
