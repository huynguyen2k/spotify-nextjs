import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import moment from 'moment'
import { TokenPayload, tokenPayloadSchema } from '@/models'
import spotifyIcon from '@/public/spotify-icon.png'
import { users } from '@/spotify-api'
import { auth } from '@/utils'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const { query } = router
      const { access_token, expires_in, token_type, refresh_token, scope } = query

      if (access_token) {
        const tokenPayload: TokenPayload = {
          access_token: access_token as string,
          expires_in: moment().add(Number(expires_in), 's').toISOString(),
          token_type: token_type as string,
          refresh_token: refresh_token as string,
          scope: scope as string,
        }

        const isValid = await tokenPayloadSchema.isValid(tokenPayload, { strict: true })
        if (!isValid) return

        auth.setToken(tokenPayload)
        const userProfile = await users.getProfile()

        console.log(userProfile)
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
