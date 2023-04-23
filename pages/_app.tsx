import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import { appWithTranslation } from 'next-i18next'
import { ToastContainer } from 'react-toastify'
import { EmptyLayout } from '@/components/layout'
import { AppFavicon } from '@/components/common'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

export type LayoutProps = {
  children: ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppFavicon />
          <ToastContainer />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(App)
