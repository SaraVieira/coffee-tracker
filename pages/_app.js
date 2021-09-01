import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'jdenticon'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <style>{`.incognito-avatar svg{width: 100% !important; height: 100% !important;
        }`}</style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserContextProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </UserContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
