import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import Web3 from 'web3'

import { closeRequest, donate, DonationRequest } from '@/services/Web3Service'

interface RequestProps {
  data: DonationRequest
}

export function Request({ data }: RequestProps) {
  const isRequestAuthor =
    localStorage.getItem('wallet') === data.author.toLowerCase()

  function formatWei(wei: number) {
    return Web3.utils.fromWei(wei, 'ether')
  }

  async function handleCloseRequest() {
    if (!confirm('Tem certeza que deseja fechar este pedido?')) {
      return
    }

    try {
      await closeRequest(data.id)

      alert(
        'Pedido fechado com sucesso. Em alguns minutos deixará de ser visto no site.',
      )

      window.location.reload()
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  async function handleDonate() {
    const donation = prompt('Quanto deseja doar? (BNB)')

    if (!donation) {
      return
    }

    try {
      await donate(data.id, Number(donation))

      alert('Doação realizada com sucesso. Obrigado por ajudar!')

      window.location.reload()
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  return (
    <li className="mb-2 flex h-24 items-center rounded-md border border-border p-4">
      <img
        src={generateAvatarURL(data.author)}
        alt="Um círculo com cores aleatórias que representa um avatar de usuário"
        className="mr-5 h-[32px] w-[32px] self-center rounded-full"
      />

      <div>
        <h3 className="mb-2 h-full font-bold text-accent-foreground">
          {data.title} &rsaquo;&rsaquo; Contato: {data.contact}
        </h3>

        <p className="mb-1 text-muted-foreground">{data.description}</p>

        <div>
          <span className="text-muted-foreground">Meta: </span>
          <span className="font-light text-muted-foreground">
            {data.balance
              ? `BNB ${formatWei(data.balance)} obtidos de ${formatWei(data.goal)}`
              : `BNB ${formatWei(data.goal)}`}
          </span>
        </div>
      </div>

      {isRequestAuthor ? (
        <button
          type="button"
          onClick={handleCloseRequest}
          className="ml-auto flex h-[32px] items-center rounded-md border-border bg-destructive px-3 text-background"
        >
          Fechar
        </button>
      ) : (
        <button
          type="button"
          onClick={handleDonate}
          className="ml-auto flex h-[32px] items-center rounded-md border-border bg-primary px-3 text-background"
        >
          &#36; Ajudar
        </button>
      )}
    </li>
  )
}
