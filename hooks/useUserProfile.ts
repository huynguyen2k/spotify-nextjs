import { useQuery } from '@tanstack/react-query'
import { users } from '@/spotify-api'

export function useUserProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: users.getProfile,
  })
}
