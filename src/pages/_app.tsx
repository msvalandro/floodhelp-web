import '../styles/global.css'

import type { AppProps } from 'next/app'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex h-screen flex-col items-center">
      <Header />

      <main className="w-full max-w-[1180px] flex-1 p-10">
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  )
}
