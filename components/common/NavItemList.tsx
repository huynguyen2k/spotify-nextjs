import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { NavItem } from '@/constants'

export interface NavItemListProps {
  data: NavItem[]
}

export function NavItemList({ data }: NavItemListProps) {
  const { pathname } = useRouter()

  return (
    <div className="text-stone-400">
      {data.map(({ icon, label, url }, index) => (
        <Link
          key={index}
          href={url}
          className={`flex items-center justify-start px-6 py-2 font-bold transition-colors duration-200 ease-in hover:text-white ${classNames(
            { 'text-white': pathname === url }
          )}`}
        >
          <span className="mr-4 h-6 w-6">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}
