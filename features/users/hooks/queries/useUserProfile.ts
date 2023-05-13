import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { users } from '@/spotify-api'
import { UserProfile } from '@/models'
import { userKeys } from './queryKeys'

export function useUserProfile<Data = UserProfile>(
  options?: Omit<UseQueryOptions<UserProfile, unknown, Data>, 'queryKey' | 'queryFn'>
) {
  return useQuery<UserProfile, unknown, Data>(userKeys.profile(), users.getProfile, { ...options })
}
