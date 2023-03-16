import { BuildingLibraryIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { routesConfig } from './routesConfig'

export interface NavItem {
  icon: JSX.Element
  label: string
  url: string
}

export const navMenu: NavItem[] = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    url: routesConfig.getHomeUrl(),
  },
  {
    icon: <MagnifyingGlassIcon />,
    label: 'Search',
    url: routesConfig.getSearchUrl(),
  },
  {
    icon: <BuildingLibraryIcon />,
    label: 'Your Library',
    url: routesConfig.getLibraryUrl(),
  },
]
