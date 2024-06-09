import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createRequest } from '@/services/Web3Service'

const createRequestFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  contact: z.string(),
  goal: z.number(),
})

type CreateRequestFormInputs = z.infer<typeof createRequestFormSchema>

export default function Create() {
  const { register, handleSubmit } = useForm<CreateRequestFormInputs>({
    resolver: zodResolver(createRequestFormSchema),
  })

  async function handleCreateRequest(data: CreateRequestFormInputs) {
    try {
      await createRequest(data)

      alert(
        'Pedido enviado com sucesso. Em alguns minutos estará disponível na página inicial.',
      )

      window.location.href = '/'
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Pedir Ajuda | FloodHelp</title>
      </Head>

      <p className="text-l text-foreground">
        Preencha todos os campos abaixo para nos dizer o que precisa.
      </p>

      <form
        className="mt-10 w-2/3"
        onSubmit={handleSubmit(handleCreateRequest)}
      >
        <div>
          <label htmlFor="title" className="block text-s text-foreground">
            Título do pedido de ajuda:
          </label>
          <input
            placeholder="Resumo do que precisa"
            type="text"
            id="title"
            className="mt-1 h-[48px] w-full rounded border border-border p-2"
            maxLength={150}
            {...register('title')}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-s text-foreground">
            Descrição:
          </label>
          <textarea
            placeholder="Descreva em detalhes o que precisa e onde você está (para entregar
              presenciais)"
            id="description"
            className="mt-2 h-[100px] w-full rounded border border-border p-2"
            {...register('description')}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="contact" className="block text-s text-foreground">
            Contato:
          </label>
          <input
            placeholder="Contato (telefone ou e-mail)"
            type="text"
            id="contact"
            className="mt-2 h-[48px] w-full rounded border border-border p-2"
            {...register('contact')}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="goal" className="block text-s text-foreground">
            Meta:
          </label>
          <input
            placeholder="Meta em BNB (deixe em branco caso não deseje receber doação em
            cripto)"
            type="number"
            step={0.01}
            id="goal"
            className="mt-2 h-[48px] w-full rounded border border-border p-2"
            {...register('goal', { valueAsNumber: true })}
          />
        </div>

        <div className="mt-8 flex h-[60px] gap-4">
          <a
            href="/"
            className="flex w-[180px] items-center justify-center rounded-md border bg-accent p-4 text-accent-foreground"
          >
            Voltar
          </a>
          <button
            type="submit"
            className="flex flex-1 items-center justify-center rounded-md border bg-accent-foreground p-4 text-accent"
          >
            Enviar Pedido
          </button>
        </div>
      </form>
    </>
  )
}
