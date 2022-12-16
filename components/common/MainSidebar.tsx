import Link from 'next/link'
import { navItemList } from '@/constants'
import { NavItemList } from './NavItemList'
import SpotifyIcon from '@/public/spotify-icon.svg'

export interface MainSidebarProps {}

export function MainSidebar() {
  return (
    <div className="no-scrollbar fixed top-0 left-0 z-20 h-screen w-sidebar-width overflow-y-auto bg-black">
      <Link href="/" className="block p-6 text-white">
        <span className="inline-block w-[130px] max-w-full">
          <SpotifyIcon />
        </span>
      </Link>

      <NavItemList data={navItemList} />
    </div>
  )
}
