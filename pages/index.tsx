import { MetaTags } from '@/components/common/MetaTags'
import { MainLayout } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <MetaTags
        title="Spotify - Web Player"
        description="Spotify is a digital music service that gives you access to millions of songs."
        url={`${process.env.NEXT_PUBLIC_HOST_NAME}`}
        image={`${process.env.NEXT_PUBLIC_HOST_NAME}/spotify-image.png`}
      />
    </>
  )
}

HomePage.Layout = MainLayout
