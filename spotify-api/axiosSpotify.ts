import axios from 'axios'
import { auth } from '@/utils'

export const axiosSpotify = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosSpotify.interceptors.request.use(
  config => {
    const newConfig = { ...config }
    const tokenPayload = auth.getToken()

    if (newConfig.headers && tokenPayload) {
      newConfig.headers.Authorization = `${tokenPayload.token_type} ${tokenPayload.access_token}`
    }

    return newConfig
  },
  error => Promise.reject(error)
)

axiosSpotify.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)
