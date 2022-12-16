import { BuildingLibraryIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { NavItem } from '@/models'

export const PATHNAMES = {
  HOME: '/',
  SEARCH: '/search',
  LIBRARY: '/collection/playlists',
}

export const SIDEBAR_ITEMS: NavItem[] = [
  {
    label: 'Home',
    icon: HomeIcon,
    link: {
      pathname: PATHNAMES.HOME,
      query: {},
    },
  },
  {
    label: 'Search',
    icon: MagnifyingGlassIcon,
    link: {
      pathname: PATHNAMES.SEARCH,
      query: {},
    },
  },
  {
    label: 'Your Library',
    icon: BuildingLibraryIcon,
    link: {
      pathname: PATHNAMES.LIBRARY,
      query: {},
    },
  },
]
