import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TokenPayload } from '@/models'
import spotifyIcon from '@/public/spotify-icon.png'
import { users } from '@/spotify-api'
import { auth } from '@/utils'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const { query } = router

      if (query.access_token) {
        try {
          const tokenPayload: TokenPayload = {
            access_token: query.access_token as string,
            expires_in: Number(query.expires_in),
            token_type: query.token_type as string,
            refresh_token: query.refresh_token as string,
            scope: query.scope as string,
          }
          auth.setToken(tokenPayload)

          const userProfile = await users.getProfile()
          console.log(userProfile)
        } catch (error) {
          console.log('error: ', error)
        }
      }
    })()
  }, [router])

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div>
        <div className="relative block h-[200px] w-[200px]">
          <Image fill src={spotifyIcon} alt="spotify icon" />
        </div>
        <div className="mt-8 text-center">
          <Link
            className="inline-block rounded-md bg-green-500 px-6 py-3 text-lg font-bold text-white transition-colors duration-200 hover:bg-green-600"
            href="/api/auth/login"
          >
            Login with spotify
          </Link>
        </div>
      </div>
    </div>
  )
}
