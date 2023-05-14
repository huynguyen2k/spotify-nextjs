import { Auth } from '@/features/auth/components'
import { LayoutProps } from '@/pages/_app'
import { MainBody, MainSidebar } from '../common'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <MainSidebar />
      <MainBody>{children}</MainBody>
    </Auth>
  )
}
