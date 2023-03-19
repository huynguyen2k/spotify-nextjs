import { useTranslation } from 'next-i18next'
import { LayoutProps } from '@/pages/_app'
import { MainBody, MainSidebar } from '../common'

export function MainLayout({ children }: LayoutProps) {
  const { t } = useTranslation('common')

  console.log(t('navMenu.home'))

  return (
    <>
      <MainSidebar />
      <MainBody>{children}</MainBody>
    </>
  )
}
