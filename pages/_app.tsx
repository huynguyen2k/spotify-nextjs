import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import { EmptyLayout } from '@/components/layout'
import { AppFavicon } from '@/components/common'
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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppFavicon />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
      </QueryClientProvider>
    </>
  )
}
