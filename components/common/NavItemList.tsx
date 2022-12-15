import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { NavItem } from '@/models'

export interface NavItemListProps {
  data: NavItem[]
}

export function NavItemList({ data }: NavItemListProps) {
  const { pathname } = useRouter()

  return (
    <div className="text-stone-400">
      {data.map(({ icon: Icon, url, label }, index) => (
        <Link
          key={index}
          href={url}
          className={`flex justify-start items-center px-6 py-2 font-bold transition-colors duration-200 ease-in hover:text-white ${classNames(
            { 'text-white': pathname === url }
          )}`}
        >
          <Icon className="w-6 h-6 mr-4" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}
