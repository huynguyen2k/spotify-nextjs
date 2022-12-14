import Link from 'next/link'
import { LayoutProps } from '@/pages/_app'

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <>
      <h1>Empty layout</h1>

      <div>
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
      </div>

      {children}
    </>
  )
}
