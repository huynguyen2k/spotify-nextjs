import { MetaTags } from '@/components/common'
import { MainLayout } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <MetaTags
        title="Spotify - Web Player"
        description="Spotify is a digital music service that gives you access to millions of songs."
        url={`${process.env.NEXT_PUBLIC_VERCEL_HOST}`}
        image={`${process.env.NEXT_PUBLIC_VERCEL_HOST}/spotify-image.png`}
      />
      Home page
    </>
  )
}

HomePage.Layout = MainLayout
