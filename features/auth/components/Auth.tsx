import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserProfile } from '@/features/users/hooks'
import { routesConfig } from '@/constants'
import { Loading } from '@/components/common'
import { auth } from '@/utils'

interface AuthProps {
  children?: ReactNode
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()

  const { isLoading, isError } = useUserProfile()

  useEffect(() => {
    if (isError) {
      auth.clearToken()
      router.push(routesConfig.getLoginUrl())
    }
  }, [isError, router])

  if (isLoading || isError) return <Loading />

  return <>{children}</>
}
