import { TokenPayload } from '@/models'
import { axiosAuth } from './axiosAuth'

export const authApi = {
  refreshToken(refreshToken: string): Promise<Omit<TokenPayload, 'refresh_token'>> {
    return axiosAuth.get('/api/auth/refresh-token', {
      params: { refresh_token: refreshToken },
    })
  },
}
