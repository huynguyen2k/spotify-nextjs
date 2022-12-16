import { MetaTags } from '@/components/common/MetaTags'
import { MainLayout } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <MetaTags
        title="Spotify - Web Player"
        description="Spotify is a digital music service that gives you access to millions of songs."
        url="https://open.spotify.com/"
        image="https://open.spotifycdn.com/cdn/images/og-image.548bc4b7.png"
      />
    </>
  )
}

HomePage.Layout = MainLayout
