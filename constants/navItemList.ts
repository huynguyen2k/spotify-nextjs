import { BuildingLibraryIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { NavItem } from '@/models'

export const navItemList: NavItem[] = [
  { label: 'Home', url: '/', icon: HomeIcon },
  {
    label: 'Search',
    url: '/search',
    icon: MagnifyingGlassIcon,
  },
  {
    label: 'Your Library',
    url: '/collection/playlists',
    icon: BuildingLibraryIcon,
  },
]
