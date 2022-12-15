import Link from 'next/link'
import { navItemList } from '@/constants'
import { NavItemList } from './NavItemList'
import SpotifyIcon from '@/public/spotify-icon.svg'

export interface MainSidebarProps {}

export function MainSidebar() {
  return (
    <div className="fixed top-0 left-0 z-20 w-sidebar-width h-screen no-scrollbar bg-black overflow-y-auto">
      <Link href="/" className="block p-6 text-white">
        <span className="inline-block w-[130px] max-w-full">
          <SpotifyIcon />
        </span>
      </Link>

      <NavItemList data={navItemList} />
    </div>
  )
}
