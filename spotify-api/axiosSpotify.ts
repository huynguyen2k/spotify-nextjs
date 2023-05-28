import axios from 'axios'
import moment from 'moment'
import { auth } from '@/utils'
import { NEXT_PUBLIC_SPOTIFY_API } from '@/constants'
import { TokenPayload } from '@/models'
import { authApi } from './authApi'

export const axiosSpotify = axios.create({
  baseURL: NEXT_PUBLIC_SPOTIFY_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshTokenRequest: ReturnType<typeof authApi['refreshToken']> | null = null

axiosSpotify.interceptors.request.use(
  async config => {
    const newConfig = { ...config }
    let tokenPayload = auth.getToken()

    if (!tokenPayload) return newConfig

    if (auth.isTokenExpired()) {
      try {
        refreshTokenRequest =
          refreshTokenRequest ?? authApi.refreshToken(tokenPayload.refresh_token)

        const data = await refreshTokenRequest
        const newTokenPayload: TokenPayload = {
          ...data,
          expires_in: moment().add(data.expires_in, 's').toISOString(),
          refresh_token: tokenPayload.refresh_token,
        }

        tokenPayload = newTokenPayload
        auth.setToken(newTokenPayload)
        refreshTokenRequest = null
      } catch (error) {
        auth.clearToken()
        refreshTokenRequest = null
        return newConfig
      }
    }

    if (newConfig.headers) {
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
