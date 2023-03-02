import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import Head from 'next/head'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { EmptyLayout } from '@/components/layout'
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
          <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
      </QueryClientProvider>
    </>
  )
}
