import { LayoutProps } from '@/pages/_app'
import { MainBody, MainSidebar } from '../common'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <MainSidebar />
      <MainBody>{children}</MainBody>
    </>
  )
}
