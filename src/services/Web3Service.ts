import Web3 from 'web3'

import ABI from './ABI.json'

export interface DonationRequest {
  id: number
  title: string
  description: string
  contact: string
  goal: number
  balance: number
  author: string
}

interface CreateRequestParams
  extends Omit<DonationRequest, 'id' | 'balance' | 'author'> {}

function getContract() {
  if (!window.ethereum) {
    throw new Error('Sem MetaMask instalado.')
  }

  const from = localStorage.getItem('wallet')

  if (!from) {
    throw new Error('Carteira não é válida.')
  }

  const web3 = new Web3(window.ethereum)

  const contract = new web3.eth.Contract(
    ABI,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    {
      from,
    },
  )

  return contract
}

export async function login() {
  if (!window.ethereum) {
    throw new Error('Sem MetaMask instalado.')
  }

  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.requestAccounts()

  if (!accounts || !accounts.length) {
    throw new Error('Carteira não permitida.')
  }
  console.log(accounts)
  localStorage.setItem('wallet', accounts[0].toLowerCase())

  return accounts[0].toLowerCase()
}

export async function getOpenRequests(lastId = 0) {
  const contract = getContract()

  const requests: DonationRequest[] = await contract.methods
    .getOpenRequests(lastId + 1, 10)
    .call()

  return requests.filter((request) => request.title !== '')
}

export async function createRequest({
  title,
  description,
  contact,
  goal,
}: CreateRequestParams) {
  const contract = getContract()

  return contract.methods
    .openRequest(title, description, contact, Web3.utils.toWei(goal, 'ether'))
    .send()
}

export async function closeRequest(id: number) {
  const contract = getContract()

  return contract.methods.closeRequestByAuthor(id).send()
}

export async function donate(id: number, valueInBnb: number) {
  const contract = getContract()

  return contract.methods
    .donate(id)
    .send({ value: Web3.utils.toWei(valueInBnb, 'ether') })
}
