import { UserProfile } from '@/models'
import { axiosSpotify } from './axiosSpotify'

export const usersApi = {
  getProfile(): Promise<UserProfile> {
    const url = '/me'
    return axiosSpotify.get(url)
  },
}
