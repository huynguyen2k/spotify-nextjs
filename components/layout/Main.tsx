import Link from 'next/link'
import { LayoutProps } from '@/pages/_app'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <h1>Main layout</h1>

      <div>
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
      </div>

      {children}
    </>
  )
}
