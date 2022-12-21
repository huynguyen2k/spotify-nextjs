import Link from 'next/link'
import Image from 'next/image'
import spotifyIcon from '@/public/spotify-icon.png'

export default function LoginPage() {
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
