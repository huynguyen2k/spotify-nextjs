import Link from 'next/link'
import { navMenu, routesConfig } from '@/constants'
import SpotifyIcon from '@/public/spotify-icon.svg'
import { NavItemList } from './NavItemList'

export function MainSidebar() {
  return (
    <div className="no-scrollbar fixed top-0 left-0 z-20 h-screen w-sidebar-width overflow-y-auto bg-black">
      <Link href={routesConfig.getHomeUrl()} className="block p-6 text-white">
        <div className="block w-[130px] max-w-full">
          <SpotifyIcon />
        </div>
      </Link>

      <NavItemList data={navMenu} />
    </div>
  )
}
