import Link from 'next/link'
import { NavItemList } from './NavItemList'
import SpotifyIcon from '@/public/spotify-icon.svg'
import { PATHNAMES, SIDEBAR_ITEMS } from '@/constants'

export interface MainSidebarProps {}

export function MainSidebar() {
  return (
    <div className="no-scrollbar fixed top-0 left-0 z-20 h-screen w-sidebar-width overflow-y-auto bg-black">
      <Link href={PATHNAMES.HOME} className="block p-6 text-white">
        <div className="block w-[130px] max-w-full">
          <SpotifyIcon />
        </div>
      </Link>

      <NavItemList data={SIDEBAR_ITEMS} />
    </div>
  )
}
