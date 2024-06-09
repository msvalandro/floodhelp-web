import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Request } from '@/components/request'
import { DonationRequest, getOpenRequests } from '@/services/Web3Service'

export default function Home() {
  const [requests, setRequests] = useState<DonationRequest[]>([])

  async function loadRequests(lastId = 0) {
    try {
      const openRequests = await getOpenRequests(lastId)

      if (lastId === 0) {
        setRequests(openRequests)
      } else {
        setRequests((state) => [...state, ...openRequests])
      }
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  return (
    <>
      <Head>
        <title>Ajudar | FloodHelp</title>
      </Head>

      <>
        <p className="text-l text-foreground">
          Ajude as vítimas de enchentes e demais desastres naturais do Brasil
        </p>

        {requests.length > 0 ? (
          <ul className="mt-20">
            {requests.map((request) => (
              <Request key={request.id} data={request} />
            ))}
          </ul>
        ) : (
          <p>
            Connecte sua carteira MetaMask no botão Entrar para ajudar ou pedir
            ajuda.
          </p>
        )}
      </>
    </>
  )
}
