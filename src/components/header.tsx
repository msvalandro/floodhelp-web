import { useEffect, useState } from 'react'

import { login } from '@/services/Web3Service'

export function Header() {
  const [wallet, setWallet] = useState('')

  async function handleLogin() {
    try {
      const account = await login()
      setWallet(account)
    } catch (error) {
      console.error(error)
      alert((error as Error).message)
    }
  }

  useEffect(() => {
    const account = localStorage.getItem('wallet') || ''

    setWallet(account)
  }, [])

  return (
    <header className="flex h-[80px] min-h-[80px] w-full items-center justify-between bg-secondary-foreground px-20">
      <h1 className="text-2xl font-bold text-secondary">FloodHelp</h1>

      <div className="flex h-[32px] items-center gap-3">
        {wallet ? (
          <a
            href="/create"
            className="flex h-full items-center rounded-md bg-warning px-2 text-secondary-foreground"
          >
            Pedir Ajuda
          </a>
        ) : (
          <button
            type="button"
            className="flex h-full items-center justify-center rounded-md border px-2 text-secondary"
            onClick={handleLogin}
          >
            <img
              src="/metamask.svg"
              alt="Logotipo da Metamask em formato da cabeça de uma raposa"
              width={22}
              className="mr-2"
            />
            Entrar
          </button>
        )}
      </div>
    </header>
  )
}
