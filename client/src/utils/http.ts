import axios, { AxiosInstance } from 'axios'

class Http {
  inscance: AxiosInstance
  constructor() {
    this.inscance = axios.create({
      baseURL: 'http://localhost/api/',
      timeout: 10000
    })
    this.inscance.interceptors.request.use((config) => config)
    this.inscance.interceptors.response.use(
      (response) => {
        if (response && response.data) {
          return response.data
        }

        return response
      },
      (error) => {
        throw error
      }
    )
  }
}

const http = new Http().inscance

export default http
