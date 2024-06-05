import '../styles/global.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <header className="flex h-[80px] w-full items-center justify-between bg-secondary-foreground px-20">
        <h1 className="text-2xl font-bold text-secondary">FloodHelp</h1>

        <div className="flex h-[32px] items-center gap-3">
          <button
            type="button"
            className="flex h-full items-center justify-center rounded-md border px-2 text-secondary"
          >
            <img
              src="/metamask.svg"
              alt="Logotipo da Metamask em formato da cabeça de uma raposa"
              width={22}
              className="mr-2"
            />
            Entrar
          </button>

          <a
            href="/create"
            className="bg-warning flex h-full items-center rounded-md px-2 text-secondary-foreground"
          >
            Pedir Ajuda
          </a>
        </div>
      </header>

      <Component {...pageProps} />
    </div>
  )
}
