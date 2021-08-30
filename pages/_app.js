import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'tailwindcss/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'jdenticon'

export default function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <main className={'dark'}>
      <style>{`.incognito-avatar svg{width: 100% !important; height: 100% !important;
        }`}</style>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserContextProvider>
      </QueryClientProvider>
    </main>
  )
}
