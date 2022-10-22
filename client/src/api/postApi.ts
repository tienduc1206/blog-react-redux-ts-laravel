import { Post } from 'types/PostType'
import http from '../utils/http'
import {} from 'axios'

const postEndpoint = 'posts'

const postApi = {
  getAll: (signal: any) => http.get<Post[]>(postEndpoint, { signal }),
  create: (params: Omit<Post, 'id'>, signal: any) =>
    http.post<Post>(postEndpoint, params, { signal }),
  getOne: (id: number) => http.get(`${postEndpoint}/${id}`),
  update: (id: number, params: Omit<Post, 'id'>, signal: any) =>
    http.put(`${postEndpoint}/${id}`, params, { signal }),
  delete: (id: number, signal: any) => http.delete<Post>(`${postEndpoint}/${id}`, { signal })
}

export default postApi
